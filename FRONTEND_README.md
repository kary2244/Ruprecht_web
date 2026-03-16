# 🕯️ Ruprecht - Sitio Web Frontend

Sitio web informativo para Ruprecht, un negocio de velas, jabones y productos artesanales de cera. Desarrollado con React y Vite.

## 🎨 Características

- **Página de Inicio** con hero banner, estilos destacados y productos destacados
- **Catálogo de Velas** con filtros y detalles completos
- **Catálogo de Jabones** con información de ingredientes
- **Wax Melts y Más** - accesorios y productos complementarios
- **Formulario de Contacto** para consultas
- **Diseño Responsivo** adaptado a todos los dispositivos
- **Estilos Elegantes** inspirados en diseño artesanal

## 🚀 Instalación

### Prerequisitos
- Node.js 18+ instalado
- Backend de Ruprecht corriendo en `http://localhost:3333`

### Pasos

1. **Instalar dependencias**
```bash
cd "Front-Ruprecht"
npm install
```

2. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── navbar.jsx     # Navegación principal
│   ├── hero.jsx       # Banner hero con promoción
│   ├── productCard.jsx # Tarjeta de producto
│   └── footer.jsx     # Pie de página
├── pages/             # Páginas de la aplicación
│   ├── home.jsx       # Página de inicio
│   ├── velas.jsx      # Catálogo de velas
│   ├── jabones.jsx    # Catálogo de jabones
│   ├── wax.jsx        # Wax melts y más
│   ├── products.jsx   # Todos los productos
│   └── contact.jsx    # Formulario de contacto
├── styles/            # Estilos CSS
│   ├── navbar.css
│   ├── hero.css
│   ├── productCard.css
│   ├── footer.css
│   ├── home.css
│   ├── products.css
│   └── contact.css
├── App.jsx            # Componente principal con rutas
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 📦 Tecnologías Utilizadas

- **React 19.2.0** - Librería de UI
- **React Router DOM 7.13.0** - Enrutamiento
- **Axios 1.13.4** - Cliente HTTP
- **Vite 7.2.4** - Build tool y dev server
- **PrimeIcons 7.0.0** - Iconos

## 🎯 Rutas del Sitio

- `/` - Página de inicio
- `/velas` - Catálogo de velas
- `/jabones` - Catálogo de jabones
- `/wax` - Wax melts y accesorios
- `/productos` - Todos los productos
- `/contacto` - Formulario de contacto

## 🔌 Configuración del Backend

Por defecto, el frontend se conecta al backend en `http://localhost:3333`. Si tu backend está en otro puerto, actualiza las URLs en:
- `src/pages/home.jsx`
- `src/pages/velas.jsx`
- `src/pages/jabones.jsx`
- `src/pages/wax.jsx`
- `src/pages/products.jsx`
- `src/pages/contact.jsx`

## 🎨 Paleta de Colores

```css
--primary-color: #d4a574  /* Dorado/Beige */
--primary-dark: #c7956b   /* Dorado oscuro */
--secondary-color: #6b5b4f /* Café */
--dark-color: #2c1810     /* Café oscuro */
--light-bg: #f5f0eb       /* Beige claro */
--lighter-bg: #faf8f6     /* Casi blanco */
```

## 📱 Características de los Productos Mostrados

- Nombre y descripción
- Precio
- Tamaño (oz, g, ml)
- Colores disponibles
- Esencias/aromas
- Forma
- Tiempo de quemado (para velas)
- Categoría
- Estado (activo/destacado)

## 🛠️ Scripts Disponibles

```bash
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Construir para producción
npm run preview   # Previsualizar build de producción
npm run lint      # Ejecutar ESLint
```

## 📄 Notas Importantes

- Este es un sitio **informativo**, no incluye funcionalidad de e-commerce
- Los productos se muestran con precios y detalles pero no hay carrito de compras
- El formulario de contacto envía mensajes al backend para consultas
- Todas las imágenes de productos deben tener URLs válidas en la base de datos

## 🎯 Próximas Mejoras Sugeridas

- [ ] Modal de detalle de producto
- [ ] Galería de imágenes para productos
- [ ] Búsqueda funcional en el navbar
- [ ] Filtros avanzados por precio, aroma, etc.
- [ ] Testimonios de clientes
- [ ] Blog de cuidados y tips
- [ ] Integración con redes sociales

## 📞 Soporte

Para cualquier consulta sobre el desarrollo, revisa la documentación del backend en `backend Ruprect/API_ROUTES.md`
