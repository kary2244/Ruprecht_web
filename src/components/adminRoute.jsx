import { Navigate } from 'react-router-dom'
import { ADMIN_LOGIN_PATH, isAdminSessionActive } from '../utils/adminAuth'

const AdminRoute = ({ children }) => {
  if (!isAdminSessionActive()) {
    return <Navigate to={ADMIN_LOGIN_PATH} replace />
  }

  return children
}

export default AdminRoute
