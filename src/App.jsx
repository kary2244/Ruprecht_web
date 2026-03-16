import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import ScrollToTop from './components/scrollToTop'
import Home from './pages/home'
import Velas from './pages/velas'
import Jabones from './pages/jabones'
import Wax from './pages/wax'
import Products from './pages/products'
import Contact from './pages/contact'
import SobreNosotros from './pages/sobre-nosotros'
import NuestroProceso from './pages/nuestro-proceso'
import CuidadosProducto from './pages/cuidados-producto'
import PreguntasFrecuentes from './pages/preguntas-frecuentes'
import Eventos from './pages/eventos'
import VelasVaso from './pages/velas-vaso'
import FloresArreglos from './pages/flores-arreglos'
import Esencias from './pages/esencias'
import Accesorios from './pages/accesorios'
import Extras from './pages/extras'
import AdminLogin from './pages/admin-login'
import AdminPanel from './pages/admin-panel'
import { ADMIN_LOGIN_PATH, ADMIN_PANEL_PATH, isAdminSessionActive } from './utils/adminAuth'
import './App.css'

function AppContent() {
  const location = useLocation()
  const [showWhatsapp, setShowWhatsapp] = useState(true)
  const whatsappPhone = '528246208464'
  const whatsappText = 'Hola, quiero más información sobre sus productos.'
  const isAdminRoute =
    location.pathname === ADMIN_LOGIN_PATH ||
    location.pathname === ADMIN_PANEL_PATH

  const handleWhatsappClick = (event) => {
    event.preventDefault()

    const encodedText = encodeURIComponent(whatsappText)
    const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const desktopLink = `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodedText}`
    const mobileLink = `https://wa.me/${whatsappPhone}?text=${encodedText}`
    const targetLink = isMobile ? mobileLink : desktopLink

    window.open(targetLink, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    if (isAdminRoute) {
      setShowWhatsapp(false)
      return
    }

    setShowWhatsapp(false)

    const timer = setTimeout(() => {
      setShowWhatsapp(true)
    }, 550)

    return () => clearTimeout(timer)
  }, [location.pathname, isAdminRoute])


  return (
    <>
      <ScrollToTop />
      <div className="app">
        {!isAdminRoute && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/velas" element={<Velas />} />
            <Route path="/esencias" element={<Esencias />} />
            <Route path="/jabones" element={<Jabones />} />
            <Route path="/wax" element={<Wax />} />
            <Route path="/accesorios" element={<Accesorios />} />
            <Route path="/extras" element={<Extras />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/nuestro-proceso" element={<NuestroProceso />} />
            <Route path="/cuidados-del-producto" element={<CuidadosProducto />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/velas-vaso" element={<VelasVaso />} />
            <Route path="/flores-arreglos" element={<FloresArreglos />} />
            <Route
              path={ADMIN_PANEL_PATH}
              element={isAdminSessionActive() ? <AdminPanel /> : <AdminLogin />}
            />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && (
          <a
            href={`https://wa.me/${whatsappPhone}`}
            onClick={handleWhatsappClick}
            className={`whatsapp-float ${showWhatsapp ? 'is-visible' : 'is-hidden'}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar mensaje por WhatsApp"
          >
            <i className="pi pi-whatsapp"></i>
          </a>
        )}
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
