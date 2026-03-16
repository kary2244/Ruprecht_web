import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const Velas = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Conectar con la API de candles - obtener todas las velas
        const response = await axios.get(`${API_BASE_URL}/candles`, {
          params: { limit: 100 }
        })
        
        // Transformar los datos de candles al formato que ProductCard espera
        const candlesData = response.data.data || response.data
        const transformedProducts = candlesData.map((candle) => ({
          id: candle.id,
          name: candle.nombre,
          description: `Vela artesanal ${candle.medidas}`,
          price: candle.costo,
          category: 'Velas',
          size: candle.medidas,
          weight: candle.peso,
          imageUrl: 'https://images.unsplash.com/photo-1602874801007-c9aa89ed2b09?w=400',
          isFeatured: Boolean(candle.isFeatured ?? candle.is_featured),
          ...candle
        }))
        
        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error al cargar velas:', error)
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
        <h1 className="products-title">VELAS ARTESANALES</h1>
        <p className="products-subtitle">
          Velas hechas a mano con cera natural y aromas cuidadosamente seleccionados
        </p>
      </div>

      <div className="products-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
          onClick={() => setFilter('featured')}
        >
          Destacadas
        </button>
      </div>

      {loading ? (
        <div className="loading">Cargando velas...</div>
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
        <div className="no-products">No se encontraron velas</div>
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

      {/* Información adicional */}
      <section className="product-info-section">
        <div className="info-grid">
          <div className="info-card">
            <i className="pi pi-leaf"></i>
            <h3>100% Natural</h3>
            <p>Cera de soja y abeja, sin aditivos químicos</p>
          </div>
          <div className="info-card">
            <i className="pi pi-heart"></i>
            <h3>Hechas a Mano</h3>
            <p>Cada vela es única y elaborada con dedicación</p>
          </div>
          <div className="info-card">
            <i className="pi pi-clock"></i>
            <h3>Larga Duración</h3>
            <p>Tiempo de quemado de hasta 60 horas</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Velas
