import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const Accesorios = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/accessories`, {
          params: { limit: 100 },
        })

        const accessoriesData = response.data.data || response.data

        const transformedProducts = accessoriesData.map((accessory) => ({
          id: accessory.id,
          name: accessory.nombre,
          description: 'Accesorio artesanal',
          price: accessory.costo,
          category: 'Accesorios',
          size: accessory.medidas,
          imageUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400',
          ...accessory,
          isFeatured: Boolean(accessory.isFeatured ?? accessory.is_featured),
        }))

        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error al cargar accesorios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAccessories()
  }, [])

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">ACCESORIOS</h1>
        <p className="products-subtitle">
          Encuentra accesorios pensados para complementar tus momentos y espacios.
        </p>
      </div>

      {loading ? (
        <div className="loading">Cargando accesorios...</div>
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
        <div className="no-products">No se encontraron accesorios</div>
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
                {selectedProduct.size && <p><strong>Medidas:</strong> {selectedProduct.size}</p>}
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

export default Accesorios