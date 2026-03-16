import '../styles/info-pages.css'

const qualityItems = [
  {
    title: 'Cera',
    description:
      'Utilizamos únicamente cera de soya de la mejor calidad, asegurando una combustión limpia y duradera en cada vela.'
  },
  {
    title: 'Productos y envases',
    description:
      'Nuestros envases y materiales de presentación son 100% reutilizables y amigables con el medio ambiente, reforzando nuestro compromiso con la sostenibilidad.'
  },
  {
    title: 'Glicerina',
    description:
      'Empleamos glicerina de alta resistencia para la elaboración de jabones más firmes, duraderos y con fragancias intensas que permanecen por más tiempo en la piel.'
  }
]

const NuestroProceso = () => (
  <div className="info-page">
    <header className="info-hero">
      <p className="info-eyebrow">Ruprecht</p>
      <h1 className="info-title">Nuestro Proceso</h1>
      <p className="info-subtitle">
        Del ingrediente natural a la experiencia sensorial hecha a mano.
      </p>
    </header>

    <div className="info-container">
      <div className="info-grid">
        <section className="info-card">
          <h3>Artesanía natural</h3>
          <p>
            RUPRECHT pertenece al giro artesanal, enfocado en la creación de velas y
            jabones hechos a mano con ingredientes naturales.
          </p>
        </section>

        <section className="info-card">
          <h3>Experiencia sensorial</h3>
          <p>
            La finalidad ha sido brindar experiencias sensoriales únicas, combinando
            aromas agradables con productos que transmitan calma, relajación y bienestar
            en cada uso.
          </p>
        </section>
      </div>

      <section className="info-section">
        <h2>Política de Calidad</h2>
        <p className="info-highlight">
          Nuestra política de calidad busca garantizar que cada producto cumpla con altos
          estándares y supere las expectativas de nuestros clientes.
        </p>
        <ul className="info-list">
          {qualityItems.map((item) => (
            <li key={item.title}>
              <div>
                <strong>{item.title}:</strong> {item.description}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
)

export default NuestroProceso
