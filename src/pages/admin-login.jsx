import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ADMIN_PANEL_PATH, isAdminSessionActive, saveAdminSession } from '../utils/adminAuth'
import { API_BASE_URL } from '../utils/api'
import '../styles/admin.css'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    contrasena: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const shouldReset = sessionStorage.getItem('ruprecht_admin_login_reset')
    if (shouldReset) {
      setFormData({ email: '', contrasena: '' })
      setError('')
      setLoading(false)
      sessionStorage.removeItem('ruprecht_admin_login_reset')
    }

    if (isAdminSessionActive()) {
      navigate(ADMIN_PANEL_PATH, { replace: true })
    }
  }, [navigate])

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData)
      const { token, user } = response.data

      const allowedRoles = ['admin', 'editor', 'reader']

      if (!token || !user || !allowedRoles.includes(user.rol)) {
        setError('No tienes permisos para acceder al panel.')
        return
      }

      saveAdminSession(token, user)
      navigate(ADMIN_PANEL_PATH, { replace: true })
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'No se pudo iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <h1>Acceso Administrativo</h1>
        <p>Ingresa con tu cuenta admin para gestionar productos.</p>

        <form onSubmit={handleSubmit} className="admin-auth-form" autoComplete="off">
          <div className="admin-field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
