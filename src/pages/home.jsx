import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Hero from '../components/hero'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/home.css'
import eventosImage from '../img/eventos.jpg'
import velasVasoImage from '../img/velasvaso.jpg'
import jabonImage from '../img/jabon.jpg'
import waxImage from '../img/wax.jpg'
import floresImage from '../img/flores.jpeg'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const fetchAllItems = async (url) => {
          const limit = 100
          let page = 1
          let hasNextPage = true
          const allItems = []

          while (hasNextPage) {
            const response = await axios.get(url, { params: { page, limit } })
            const payload = response.data

            if (Array.isArray(payload)) {
              allItems.push(...payload)
              break
            }

            const data = payload.data || payload
            if (Array.isArray(data)) {
              allItems.push(...data)
            }

            const meta = payload.meta
            if (!meta) {
              break
            }

            const currentPage = meta.currentPage || meta.current_page || page
            const lastPage = meta.lastPage || meta.last_page || currentPage

            hasNextPage = currentPage < lastPage
            page += 1
          }

          return allItems
        }

        const [candlesData, soapsData, essencesData, accessoriesData, extrasData] = await Promise.all([
          fetchAllItems(`${API_BASE_URL}/candles`),
          fetchAllItems(`${API_BASE_URL}/soaps`),
          fetchAllItems(`${API_BASE_URL}/essences`),
          fetchAllItems(`${API_BASE_URL}/accessories`),
          fetchAllItems(`${API_BASE_URL}/extras`),
        ])

        const getCandleCategory = (typeCandle) => {
          switch (Number(typeCandle)) {
            case 1:
              return 'Eventos'
            case 4:
              return 'Wax Cream y Melts'
            case 5:
              return 'Flores y Arreglos'
            case 3:
            default:
              return 'Velas'
          }
        }

        const transformedCandles = candlesData.map((candle) => ({
          id: `candle-${candle.id}`,
          name: candle.nombre,
          description: `Vela artesanal ${candle.medidas || ''}`,
          price: candle.costo,
          category: getCandleCategory(candle.typeCandle || candle.type_candle),
          size: candle.medidas,
          weight: candle.peso,
          imageUrl: 'https://images.unsplash.com/photo-1602874801007-c9aa89ed2b09?w=400',
          isFeatured: Boolean(candle.isFeatured ?? candle.is_featured),
          ...candle,
        }))

        const transformedSoaps = soapsData.map((soap) => ({
          id: `soap-${soap.id}`,
          name: soap.nombre,
          description: 'Jabón artesanal natural',
          price: soap.costo,
          category: 'Jabones',
          imageUrl: 'https://images.unsplash.com/photo-1608181078976-e7cb6d3a940a?w=400',
          isFeatured: Boolean(soap.isFeatured ?? soap.is_featured),
          ...soap,
        }))

        const transformedEssences = essencesData.map((essence) => ({
          id: `essence-${essence.id}`,
          name: `Esencia ${essence.sizeMl || essence.size_ml}ml`,
          description: essence.note || 'Esencia aromática artesanal',
          price: essence.price,
          category: 'Esencias',
          weight: `${essence.weightG || essence.weight_g} g / ${essence.weightOz || essence.weight_oz} oz`,
          scents: (essence.aromas || '')
            .split(/[\n,]+/)
            .map((item) => item.trim())
            .filter(Boolean),
          imageUrl: 'https://images.unsplash.com/photo-1615634262417-f5dd37a3f5f7?w=400',
          isFeatured: Boolean(essence.isFeatured ?? essence.is_featured),
          ...essence,
        }))

        const transformedAccessories = accessoriesData.map((accessory) => ({
          id: `accessory-${accessory.id}`,
          name: accessory.nombre,
          description: 'Accesorio artesanal',
          price: accessory.costo,
          category: 'Accesorios',
          size: accessory.medidas,
          imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400',
          isFeatured: Boolean(accessory.isFeatured ?? accessory.is_featured),
          ...accessory,
        }))

        const transformedExtras = extrasData.map((extra) => ({
          id: `extra-${extra.id}`,
          name: extra.nombre,
          description: 'Complemento para personalizar tu pedido',
          price: extra.costo,
          category: 'Extras',
          imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
          isFeatured: Boolean(extra.isFeatured ?? extra.is_featured),
          ...extra,
        }))

        const featuredSelection = [
          ...transformedCandles,
          ...transformedSoaps,
          ...transformedEssences,
          ...transformedAccessories,
          ...transformedExtras,
        ]
          .filter((product) => product.isFeatured)
          .slice(0, 3)

        setFeaturedProducts(featuredSelection)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="home">
      <Hero />

      {/* Sección Elige tu Estilo */}
      <section className="style-section">
        <h2 className="section-title">VER CATALOGOS</h2>
        <div className="style-grid">
          <div className="style-card">
            <img 
              src={eventosImage}
              alt="Eventos"
              className="style-image"
            />
            <div className="style-content">
              <h3 className="style-name">EVENTOS</h3>
              <Link to="/eventos" className="btn-style">Ver Productos</Link>
            </div>
          </div>
          
          <div className="style-card">
            <img 
              src={velasVasoImage}
              alt="Velas de vaso"
              className="style-image"
            />
            <div className="style-content">
              <h3 className="style-name">VELAS DE VASO</h3>
              <Link to="/velas-vaso" className="btn-style">Ver Productos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Artesanal */}
      <section className="artisan-section">
        <div className="artisan-container">
          <div className="artisan-card">
            <img 
              src={jabonImage}
              alt="Jabones"
              className="artisan-image"
            />
            <div className="artisan-overlay">
              <h2 className="artisan-title">JABONES</h2>
              <Link to="/jabones" className="btn-artisan">Ver Productos</Link>
            </div>
          </div>
          <div className="artisan-card">
            <img 
              src={waxImage}
              alt="Wax Cream y Melts"
              className="artisan-image"
            />
            <div className="artisan-overlay">
              <h2 className="artisan-title">WAX CREAM Y MELTS</h2>
              <Link to="/wax" className="btn-artisan">Ver Productos</Link>
            </div>
          </div>
          <div className="artisan-card">
            <img 
              src={floresImage}
              alt="Flores y arreglos"
              className="artisan-image"
            />
            <div className="artisan-overlay">
              <h2 className="artisan-title">FLORES Y ARREGLOS</h2>
              <Link to="/flores-arreglos" className="btn-artisan">Ver Productos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-section">
        <h2 className="section-title">PRODUCTOS DESTACADOS</h2>
        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : featuredProducts.length === 0 ? (
          <div className="loading">No hay productos destacados seleccionados.</div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                featured
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
        <div className="featured-actions">
          <Link to="/productos" className="btn-view-all">Ver Todos los Productos</Link>
        </div>
      </section>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-body">
              <img
                src={selectedProduct.imageUrl || 'https://via.placeholder.com/400'}
                alt={selectedProduct.name}
                className="modal-image"
              />
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">{selectedProduct.category}</p>
                <p className="modal-price">{formatProductPrice(selectedProduct.price, selectedProduct.name)}</p>
                {selectedProduct.size && <p><strong>Tamaño:</strong> {selectedProduct.size}</p>}
                {selectedProduct.weight && <p><strong>Peso:</strong> {selectedProduct.weight}</p>}
                {selectedProduct.scents?.length > 0 && (
                  <p><strong>Aromas:</strong> {selectedProduct.scents.join(', ')}</p>
                )}
                {selectedProduct.description && <p className="modal-description">{selectedProduct.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sección Sobre Nosotros */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">Sobre Ruprecht</h2>
            <p className="about-text">
              Somos un negocio dedicado a la creación de velas de cera 100% de soya,
              jabones artesanales, entre otras cosas. Cada pieza es hecha a mano con
              materiales naturales y de la más alta calidad.
            </p>
            <p className="about-text">
              Nuestra pasión es crear productos que transformen espacios en experiencias 
              sensoriales únicas, combinando aromas cuidadosamente seleccionados con 
              diseños elegantes y minimalistas.
            </p>
            <Link to="/contacto" className="btn-contact">Contáctanos</Link>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700" 
              alt="Taller artesanal"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
