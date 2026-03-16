import '../styles/info-pages.css'

const faqs = [
  {
    question: '¿Qué tipo de productos ofrece RUPRECHT?',
    answer:
      'Velas y jabones artesanales hechos a mano con ingredientes naturales, pensados para brindar experiencias sensoriales únicas.'
  },
  {
    question: '¿Desde cuándo existe RUPRECHT?',
    answer:
      'RUPRECHT tuvo inicio el 6 de julio del 2023 como un proyecto artesanal enfocado en alternativas naturales y personalizadas.'
  },
  {
    question: '¿Qué buscan transmitir sus productos?',
    answer:
      'Aromas agradables y productos que transmitan calma, relajación y bienestar en cada uso.'
  },
  {
    question: '¿Qué materiales destacan en su política de calidad?',
    answer:
      'Cera de soya de alta calidad, glicerina de alta resistencia y envases reutilizables y amigables con el medio ambiente.'
  },
  {
    question: '¿Cómo debo cuidar mis velas artesanales?',
    answer:
      'Recomendamos encenderlas en una superficie resistente al calor, evitar corrientes de aire y recortar la mecha antes de cada uso.'
  },
  {
    question: '¿Cómo conservo mejor los jabones artesanales?',
    answer:
      'Cuélgalos para que se sequen entre usos, evita el agua estancada y guárdalos en un lugar fresco cuando no se usen.'
  },
  {
    question: '¿Para quiénes están pensados los productos?',
    answer:
      'Para personas que buscan productos artesanales, naturales y con aromas únicos para disfrutar en el hogar o regalar.'
  }
]

const PreguntasFrecuentes = () => (
  <div className="info-page">
    <header className="info-hero">
      <p className="info-eyebrow">Ruprecht</p>
      <h1 className="info-title">Preguntas Frecuentes</h1>
      <p className="info-subtitle">
        Resolvemos las dudas más comunes sobre nuestra esencia artesanal.
      </p>
    </header>

    <div className="info-container">
      <section className="info-section">
        <h2>Lo que más nos preguntan</h2>
        <p>
          Estas respuestas están basadas en nuestra historia, misión y política de calidad
          para que conozcas mejor cómo trabajamos.
        </p>
      </section>

      <div className="info-grid">
        {faqs.map((faq) => (
          <article key={faq.question} className="info-faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
)

export default PreguntasFrecuentes
