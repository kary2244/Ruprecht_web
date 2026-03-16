import '../styles/info-pages.css'

const careItems = [
  {
    title: 'Cera de soya',
    description:
      'Utilizamos únicamente cera de soya de la mejor calidad, asegurando una combustión limpia y duradera en cada vela.'
  },
  {
    title: 'Envases reutilizables',
    description:
      'Nuestros envases y materiales de presentación son 100% reutilizables y amigables con el medio ambiente, reforzando nuestro compromiso con la sostenibilidad.'
  },
  {
    title: 'Glicerina de alta resistencia',
    description:
      'Empleamos glicerina de alta resistencia para la elaboración de jabones más firmes, duraderos y con fragancias intensas que permanecen por más tiempo en la piel.'
  }
]

const candleCareTips = [
  {
    title: 'Primer encendido',
    description:
      'Permite que la cera se derrita de forma uniforme para conservar el acabado y el aroma.'
  },
  {
    title: 'Mecha',
    description:
      'Recorta la mecha antes de cada uso para mantener una llama limpia y estable.'
  },
  {
    title: 'Ubicación',
    description:
      'Coloca la vela en una superficie resistente al calor y evita corrientes de aire.'
  }
]

const soapCareTips = [
  {
    title: 'Secado',
    description:
      'Cuelga el jabón para que se seque bien entre usos.'
  },
  {
    title: 'Conservación',
    description:
      'Guarda los jabones en un lugar fresco y seco cuando no se usen.'
  },
  {
    title: 'Uso diario',
    description:
      'Evita dejar el jabón en agua estancada para prolongar su duración.'
  }
]

const CuidadosProducto = () => (
  <div className="info-page">
    <header className="info-hero">
      <p className="info-eyebrow">Ruprecht</p>
      <h1 className="info-title">Cuidados del Producto</h1>
      <p className="info-subtitle">
        Cuidamos cada pieza con materiales naturales y acabados de gran calidad.
      </p>
    </header>

    <div className="info-container">
      <section className="info-section">
        <h2>Cómo cuidamos cada pieza</h2>
        <p>
          Nos enfocamos en crear piezas únicas, respetuosas con el medio ambiente y con
          acabados de gran calidad, para que cada cliente disfrute de un producto exclusivo
          que contribuya a su relajación, equilibrio y armonía.
        </p>
      </section>

      <div className="info-grid">
        {careItems.map((item) => (
          <article key={item.title} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <section className="info-section">
        <h2>Cuidados para velas</h2>
        <ul className="info-list">
          {candleCareTips.map((tip) => (
            <li key={tip.title}>
              <div>
                <strong>{tip.title}:</strong> {tip.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="info-section">
        <h2>Cuidados para jabones</h2>
        <ul className="info-list">
          {soapCareTips.map((tip) => (
            <li key={tip.title}>
              <div>
                <strong>{tip.title}:</strong> {tip.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="info-section">
        <h2>Experiencia artesanal</h2>
        <p>
          RUPRECHT pertenece al giro artesanal, enfocado en la creación de velas y jabones
          hechos a mano con ingredientes naturales.
        </p>
      </section>
    </div>
  </div>
)

export default CuidadosProducto
