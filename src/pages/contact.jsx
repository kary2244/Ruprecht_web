import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../utils/api'
import '../styles/contact.css'

const Contact = () => {
  const [formStartedAt] = useState(Date.now())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
    startedAt: Date.now(),
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData)
      setStatus({ 
        type: 'success', 
        message: 'Mensaje enviado exitosamente. Te responderemos pronto.' 
      })
      setFormData({ name: '', email: '', subject: '', message: '', website: '', startedAt: Date.now() })
    } catch (error) {
      const backendMessage =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.message ||
        'Error al enviar el mensaje. Por favor intenta de nuevo.'

      setStatus({ 
        type: 'error', 
        message: backendMessage
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">CONTÁCTANOS</h1>
        <p className="contact-subtitle">
          Estamos aquí para responder tus preguntas y ayudarte
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Información de Contacto</h2>
          
          <div className="contact-item">
            <i className="pi pi-phone"></i>
            <div>
              <h3>Teléfono</h3>
              <p>+528246208464</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="pi pi-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>ruprecht2023@hotmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="pi pi-clock"></i>
            <div>
              <h3>Horario</h3>
              <p>Lunes - Viernes: 9:00 AM - 6:00 PM<br/>
              Sábados: 10:00 AM - 4:00 PM<br/>
              Domingos: Cerrado</p>
            </div>
          </div>

          <div className="social-links">
            <h3>Síguenos</h3>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><i className="pi pi-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="pi pi-facebook"></i></a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="honeypot-field" aria-hidden="true">
              <label htmlFor="website">Sitio web</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <input
              type="hidden"
              name="startedAt"
              value={formData.startedAt || formStartedAt}
            />

            <div className="form-group">
              <label htmlFor="name">Nombre Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto del mensaje"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                rows="6"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            {status.message && (
              <div className={`alert alert-${status.type}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
