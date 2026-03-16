export const ADMIN_LOGIN_PATH = '/sabinashidalgo'
export const ADMIN_PANEL_PATH = '/sabinashidalgo'

const ADMIN_TOKEN_KEY = 'ruprecht_admin_token'
const ADMIN_USER_KEY = 'ruprecht_admin_user'

export const saveAdminSession = (token, user) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user))
}

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY)

export const getAdminUser = () => {
  const rawUser = localStorage.getItem(ADMIN_USER_KEY)
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
}

export const isAdminSessionActive = () => {
  const token = getAdminToken()
  const user = getAdminUser()
  const allowedRoles = ['admin', 'editor', 'reader']
  return Boolean(token) && allowedRoles.includes(user?.rol)
}

export const canManageCatalog = (user) => ['admin', 'editor'].includes(user?.rol)
export const canDeleteCatalog = (user) => user?.rol === 'admin'
export const canManageUsers = (user) => user?.rol === 'admin'
