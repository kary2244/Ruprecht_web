import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/productCard'
import { formatProductPrice } from '../utils/currency'
import { API_BASE_URL } from '../utils/api'
import '../styles/products.css'

const Esencias = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchEssences = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/essences`, {
          params: { limit: 100 },
        })

        const essencesData = response.data.data || response.data

        const transformedProducts = essencesData.map((essence) => ({
          id: essence.id,
          name: `Esencia ${essence.sizeMl || essence.size_ml}ml`,
          description: essence.note || 'Esencia aromática artesanal',
          price: essence.price,
          category: 'Esencias',
          size: `${essence.sizeMl || essence.size_ml} ml`,
          weight: `${essence.weightG || essence.weight_g} g / ${essence.weightOz || essence.weight_oz} oz`,
          scents: (essence.aromas || '')
            .split(/[,\n]+/)
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
            .filter((item, index, self) => self.findIndex((entry) => entry.toLowerCase() === item.toLowerCase()) === index),
          imageUrl: 'https://images.unsplash.com/photo-1615634262417-f5dd37a3f5f7?w=400',
            isFeatured: Boolean(essence.isFeatured ?? essence.is_featured),
          ...essence,
        }))

        setProducts(transformedProducts)
      } catch (error) {
        console.error('Error al cargar esencias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEssences()
  }, [])

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">ESENCIAS</h1>
        <p className="products-subtitle">
          Descubre nuestras esencias aromáticas para crear ambientes únicos.
        </p>
      </div>

      {loading ? (
        <div className="loading">Cargando esencias...</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{ ...product, scents: [], size: undefined }}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="no-products">No se encontraron esencias</div>
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
                {selectedProduct.weight && <p><strong>Peso:</strong> {selectedProduct.weight}</p>}
                {selectedProduct.scents?.length > 0 && (
                  <div>
                    <h4 className="essence-fragrance-title">Fragancias</h4>
                    <div className="essence-fragrance-grid">
                      {selectedProduct.scents.map((aroma) => (
                        <div key={`${selectedProduct.id}-${aroma}`} className="essence-fragrance-item">
                          {aroma}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

export default Esencias