import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const Jabones = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener jabones de la API de soaps
        const response = await axios.get(`${API_BASE_URL}/soaps`, {
          params: { limit: 100 }
        })
        const soapsData = response.data.data || response.data
        const transformedProducts = soapsData.map((soap) => ({
          id: soap.id,
          name: soap.nombre,
          description: `Jabón artesanal natural`,
          price: soap.costo,
          category: 'Jabones',
          imageUrl: 'https://images.unsplash.com/photo-1608181078976-e7cb6d3a940a?w=400',
          isFeatured: Boolean(soap.isFeatured ?? soap.is_featured),
          ...soap
        }))
        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error al cargar jabones:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    if (filter === 'featured') return product.isFeatured
    return true
  })

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">JABONES ARTESANALES</h1>
        <p className="products-subtitle">
          Jabones naturales elaborados con ingredientes orgánicos para el cuidado de tu piel
        </p>
      </div>

      <div className="products-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button 
          className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
          onClick={() => setFilter('featured')}
        >
          Destacados
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando jabones...</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="no-products">No se encontraron jabones</div>
      )}

      {/* Modal de detalles */}
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
                {selectedProduct.description && <p className="modal-description">{selectedProduct.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Beneficios */}
      <section className="product-info-section">
        <div className="info-grid">
          <div className="info-card">
            <i className="pi pi-sparkles"></i>
            <h3>Ingredientes Naturales</h3>
            <p>Aceites esenciales y mantecas orgánicas</p>
          </div>
          <div className="info-card">
            <i className="pi pi-shield"></i>
            <h3>Pieles Sensibles</h3>
            <p>Fórmulas suaves aptas para todo tipo de piel</p>
          </div>
          <div className="info-card">
            <i className="pi pi-sun"></i>
            <h3>Sin Químicos</h3>
            <p>Libre de parabenos y sulfatos</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Jabones
