import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const Extras = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/extras`, {
          params: { limit: 100 },
        })

        const extrasData = response.data.data || response.data

        const transformedProducts = extrasData.map((extra) => ({
          id: extra.id,
          name: extra.nombre,
          description: 'Complemento para personalizar tu pedido',
          price: extra.costo,
          category: 'Extras',
          imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
          isFeatured: Boolean(extra.isFeatured ?? extra.is_featured),
          ...extra,
        }))

        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error al cargar extras:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExtras()
  }, [])

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">EXTRAS</h1>
        <p className="products-subtitle">
          Explora nuestros extras para personalizar tu experiencia aromática.
        </p>
      </div>

      {loading ? (
        <div className="loading">Cargando extras...</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="no-products">No se encontraron extras</div>
      )}

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
                {selectedProduct.description && (
                  <p className="modal-description">{selectedProduct.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Extras