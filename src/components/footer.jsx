import { Link } from 'react-router-dom'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">RUPRECHT</h3>
          <p className="footer-description">
            Negocio dedicado a velas de cera 100% de soya,
            jabones artesanales y más productos hechos a mano.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Navegación</h4>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/esencias">Esencias</Link></li>
            <li><Link to="/accesorios">Accesorios</Link></li>
            <li><Link to="/extras">Extras</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Información</h4>
          <ul className="footer-links">
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/nuestro-proceso">Nuestro Proceso</Link></li>
            <li><Link to="/cuidados-del-producto">Cuidados del Producto</Link></li>
            <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contacto</h4>
          <ul className="footer-contact">
            <li>
              <i className="pi pi-envelope"></i>
              <span>ruprecht2023@hotmail.com</span>
            </li>
            <li>
              <i className="pi pi-phone"></i>
              <span>+528246208464</span>
            </li>
          </ul>
          <div className="footer-social">
            <a href="https://www.instagram.com/ruprecht2023?igsh=MTdwc3owcTRtZnllOA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="pi pi-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Ruprecht. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
