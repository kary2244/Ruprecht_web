import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const VelasVaso = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener solo velas con type_candle = 3 para velas de vaso
        const response = await axios.get(`${API_BASE_URL}/candles`, {
          params: { type_candle: 3, limit: 100 }
        })
        const candlesData = response.data.data || response.data
        const transformedProducts = candlesData.map((candle) => ({
          id: candle.id,
          name: candle.nombre,
          description: `Vela de vaso ${candle.medidas}`,
          price: candle.costo,
          category: 'Velas de Vaso',
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
        <h1 className="products-title">VELAS DE VASO</h1>
        <p className="products-subtitle">
          Velas de vaso artesanales con diseños elegantes y aromas únicos
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
    </div>
  )
}

export default VelasVaso
