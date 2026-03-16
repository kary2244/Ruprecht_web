# 📁 Carpeta de Imágenes

Esta carpeta contiene todas las imágenes utilizadas en el sitio web de Ruprecht.

## 📂 Estructura

```
images/
├── hero/           # Imagen principal del banner de inicio
├── banners/        # Banners promocionales y de secciones
├── products/       # Imágenes de productos (velas, jabones, wax)
└── README.md       # Este archivo
```

## 🖼️ Uso de las Imágenes

### En los componentes React:
```jsx
// Para imágenes en public/images
<img src="/images/hero/main-banner.jpg" alt="Banner principal" />

// Para productos
<img src="/images/products/vela-lavanda.jpg" alt="Vela de lavanda" />
```

## 📏 Especificaciones Recomendadas

### Hero Banner
- **Tamaño:** 1920x800px mínimo
- **Formato:** JPG o WebP
- **Peso:** Máximo 500KB

### Productos
- **Tamaño:** 800x800px (cuadrado)
- **Formato:** JPG o PNG
- **Peso:** Máximo 200KB

### Banners Secundarios
- **Tamaño:** 1200x600px
- **Formato:** JPG
- **Peso:** Máximo 300KB

## 💡 Tips

1. **Optimiza las imágenes** antes de subirlas usando herramientas como TinyPNG
2. **Usa nombres descriptivos** en inglés o español sin espacios ni caracteres especiales
3. **Mantén una convención** de nombres: `categoria-nombre-color.jpg`

Ejemplos:
- `vela-lavanda-morado.jpg`
- `jabon-avena-miel-natural.jpg`
- `wax-canela-naranja.jpg`
