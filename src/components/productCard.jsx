import '../styles/productCard.css'
import { formatProductPrice } from '../utils/currency'

const ProductCard = ({ product, featured = false, onClick }) => {
  return (
    <div className={`product-card ${featured ? 'featured' : ''}`}>
      <div className="product-image-container">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="product-image"
        />
        {product.isFeatured && <span className="badge-featured">DESTACADO</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        
        {product.scents && product.scents.length > 0 && (
          <div className="product-detail">
            <i className="pi pi-sparkles"></i>
            <span>Esencias: {product.scents.join(', ')}</span>
          </div>
        )}
        
        {product.size && (
          <div className="product-detail">
            <i className="pi pi-box"></i>
            <span>Tamaño: {product.size}</span>
          </div>
        )}

        {product.weight && (
          <div className="product-detail">
            <i className="pi pi-database"></i>
            <span>Peso: {product.weight}</span>
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <span className="colors-label">Colores:</span>
            <div className="colors-list">
              {product.colors.map((color, index) => (
                <span key={index} className="color-badge">{color}</span>
              ))}
            </div>
          </div>
        )}

        {product.shape && (
          <div className="product-detail">
            <i className="pi pi-circle"></i>
            <span>Forma: {product.shape}</span>
          </div>
        )}

        {product.burnTime && (
          <div className="product-detail">
            <i className="pi pi-clock"></i>
            <span>Duración: {product.burnTime}h</span>
          </div>
        )}
        
        <div className="product-footer">
          <span className="product-price">{formatProductPrice(product.price, product.name)}</span>
          <button className="btn-view-more" onClick={onClick}>Ver Más</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
