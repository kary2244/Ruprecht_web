import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../utils/api'
import '../styles/navbar.css'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [candlesResponse, soapsResponse, essencesResponse, accessoriesResponse, extrasResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/candles`, { params: { limit: 100 } }),
            axios.get(`${API_BASE_URL}/soaps`, { params: { limit: 100 } }),
            axios.get(`${API_BASE_URL}/essences`, { params: { limit: 100 } }),
            axios.get(`${API_BASE_URL}/accessories`, { params: { limit: 100 } }),
            axios.get(`${API_BASE_URL}/extras`, { params: { limit: 100 } }),
          ])

        const candlesData = candlesResponse.data.data || candlesResponse.data
        const soapsData = soapsResponse.data.data || soapsResponse.data
        const essencesData = essencesResponse.data.data || essencesResponse.data
        const accessoriesData = accessoriesResponse.data.data || accessoriesResponse.data
        const extrasData = extrasResponse.data.data || extrasResponse.data

        // Función para obtener categoría según type_candle
        const getCategoryByType = (typeCandle) => {
          switch (parseInt(typeCandle)) {
            case 1:
              return 'Eventos'
            case 3:
              return 'Velas'
            case 4:
              return 'Wax Cream'
            case 5:
              return 'Flores'
            default:
              return 'Velas'
          }
        }

        const allData = [
          ...candlesData.map((c) => ({
            ...c,
            type: 'candle',
            category: getCategoryByType(c.typeCandle || c.type_candle),
            searchText: `${c.nombre || ''} ${c.medidas || ''}`,
          })),
          ...soapsData.map((s) => ({
            ...s,
            type: 'soap',
            category: 'Jabones',
            searchText: `${s.nombre || ''}`,
          })),
          ...essencesData.map((e) => {
            const sizeMl = e.sizeMl || e.size_ml
            const name = `Esencia ${sizeMl}ml`
            return {
              ...e,
              nombre: name,
              type: 'essence',
              category: 'Esencias',
              searchText: `${name} ${e.aromas || ''} ${e.note || ''}`,
            }
          }),
          ...accessoriesData.map((a) => ({
            ...a,
            type: 'accessory',
            category: 'Accesorios',
            searchText: `${a.nombre || ''} ${a.medidas || ''}`,
          })),
          ...extrasData.map((e) => ({
            ...e,
            type: 'extra',
            category: 'Extras',
            searchText: `${e.nombre || ''}`,
          })),
        ]

        setAllProducts(allData)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }

    fetchProducts()
  }, [])

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setShowSuggestions(false)
  }, [location.pathname])

  // Función para normalizar texto
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
  }

  // Función para calcular similitud
  const calculateSimilarity = (str1, str2) => {
    const s1 = normalizeText(str1)
    const s2 = normalizeText(str2)

    // Coincidencia exacta
    if (s1 === s2) return 1.0

    if (s1.includes(s2) || s2.includes(s1)) return 0.95

    let matchCount = 0
    const shorter = s1.length < s2.length ? s1 : s2
    const longer = s1.length < s2.length ? s2 : s1

    for (let i = 0; i < shorter.length; i++) {
      if (longer.includes(shorter[i])) matchCount++
    }

    return matchCount / longer.length
  }

  // Buscar sugerencias cuando cambia el término
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const normalizedSearch = normalizeText(searchTerm)

      // Detectar si hay múltiples términos separados por " y "
      const searchTerms = normalizedSearch
        .split(' y ')
        .map((term) => term.trim())
        .filter((term) => term.length > 0)

      // Filtrar productos que contengan cualquiera de los términos buscados
      const matches = allProducts
        .map((product) => {
          const normalizedName = normalizeText(product.nombre || product.name || '')
          const normalizedCategory = normalizeText(product.category)
          const normalizedExtra = normalizeText(product.searchText || '')
          let priority = -1

          // Si hay múltiples términos, buscar coincidencia con CUALQUIERA
          if (searchTerms.length > 1) {
            for (let i = 0; i < searchTerms.length; i++) {
              const term = searchTerms[i]

              // Buscar en nombre
              if (normalizedName.includes(term) || normalizedExtra.includes(term)) {
                priority = i
                break
              }

              // Buscar en categoría (incluyendo Eventos cuando buscan "velas")
              if (term === 'velas' && (normalizedCategory === 'velas' || normalizedCategory === 'eventos')) {
                priority = i
                break
              }
              if (normalizedCategory.includes(term)) {
                priority = i
                break
              }
            }
          } else {
            // Si es un solo término, buscar en nombre y categoría
            const matches =
              normalizedName.includes(normalizedSearch) ||
              normalizedExtra.includes(normalizedSearch) ||
              (normalizedSearch === 'velas' &&
                (normalizedCategory === 'velas' || normalizedCategory === 'eventos')) ||
              normalizedCategory.includes(normalizedSearch)

            priority = matches ? 0 : -1
          }

          return { ...product, priority }
        })
        .filter((product) => product.priority !== -1)
        .sort((a, b) => a.priority - b.priority)

      // Eliminar duplicados por nombre
      const uniqueMatches = matches.filter(
        (product, index, self) =>
          index ===
          self.findIndex(
            (p) =>
              normalizeText(p.nombre || p.name || '') === normalizeText(product.nombre || product.name || '')
          )
      )

      // Limitar a 5 sugerencias
      const finalMatches = uniqueMatches.slice(0, 5)

      setSuggestions(finalMatches)
      setShowSuggestions(finalMatches.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm, allProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchTerm.trim())}`)
      setShowSuggestions(false)
      setSearchTerm('')
      setIsSearchOpen(false)
    }
  }

  const handleSuggestionClick = (productName) => {
    navigate(`/productos?search=${encodeURIComponent(productName)}`)
    setShowSuggestions(false)
    setSearchTerm('')
    setIsSearchOpen(false)
  }

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => {
      const nextValue = !prev
      if (nextValue) {
        setIsSearchOpen(false)
        setShowSuggestions(false)
      }
      return nextValue
    })
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const nextValue = !prev
      if (!nextValue) {
        setShowSuggestions(false)
      } else {
        setIsMenuOpen(false)
      }
      return nextValue
    })
  }

  const handleCloseOverlays = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
    setShowSuggestions(false)
  }

  return (
    <nav
      className={`navbar ${isMenuOpen ? 'is-menu-open' : ''} ${isSearchOpen ? 'is-search-open' : ''}`}
    >
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-menu-toggle"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
        >
          <i className={isMenuOpen ? 'pi pi-times' : 'pi pi-bars'} aria-hidden="true"></i>
        </button>
        <div className="navbar-left" id="navbar-menu">
          {location.pathname !== '/' && (
            <Link to="/" className="nav-link" onClick={handleCloseOverlays}>
              INICIO
            </Link>
          )}
          {location.pathname !== '/esencias' && (
            <Link to="/esencias" className="nav-link" onClick={handleCloseOverlays}>
              ESENCIAS
            </Link>
          )}
          {location.pathname !== '/accesorios' && (
            <Link to="/accesorios" className="nav-link" onClick={handleCloseOverlays}>
              ACCESORIOS
            </Link>
          )}
          {location.pathname !== '/extras' && (
            <Link to="/extras" className="nav-link" onClick={handleCloseOverlays}>
              EXTRAS
            </Link>
          )}
        </div>

        <Link to="/" className="navbar-logo" onClick={handleCloseOverlays}>
          <h1>RUPRECHT</h1>
        </Link>
        <button
          type="button"
          className="navbar-search-toggle"
          onClick={handleToggleSearch}
          aria-label={isSearchOpen ? 'Cerrar busqueda' : 'Abrir busqueda'}
          aria-expanded={isSearchOpen}
          aria-controls="navbar-search"
        >
          <i className={isSearchOpen ? 'pi pi-times' : 'pi pi-search'} aria-hidden="true"></i>
        </button>

        <div className="navbar-right" id="navbar-search">
          <div className="search-container" ref={searchRef}>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Busca tus productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() =>
                  searchTerm.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)
                }
                className="search-input"
              />
              <button type="submit" className="search-button">
                <i className="pi pi-search"></i>
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                <div className="suggestions-header">¿Buscas alguno de estos?</div>
                {suggestions.map((product, index) => (
                  <div
                    key={`${product.type}-${product.id}-${index}`}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product.nombre)}
                  >
                    <i className="pi pi-search suggestion-icon"></i>
                    <div className="suggestion-content">
                      <span className="suggestion-name">{product.nombre}</span>
                      <span className="suggestion-category">{product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navbar-menu-backdrop" role="presentation" onClick={handleCloseMenu} />
    </nav>
  )
}

export default Navbar
