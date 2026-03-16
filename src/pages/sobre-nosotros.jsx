import '../styles/info-pages.css'

const SobreNosotros = () => (
  <div className="info-page">
    <header className="info-hero">
      <p className="info-eyebrow">Ruprecht</p>
      <h1 className="info-title">Sobre Nosotros</h1>
      <p className="info-subtitle">
        Artesanía natural para experiencias sensoriales únicas.
      </p>
    </header>

    <div className="info-container">
      <section className="info-section">
        <h2>Historia</h2>
        <p>
          RUPRECHT tuvo inicio el 6 de julio del 2023 como un proyecto inspirado en la
          necesidad de ofrecer alternativas naturales y personalizadas en el mercado de
          productos de relajación. Desde sus inicios, se ha dedicado a la creación de
          velas hechas 100% a mano con cera de soya y jabones artesanales elaborados
          cuidadosamente. La finalidad ha sido, desde el comienzo, brindar a nuestros
          clientes experiencias sensoriales únicas, combinando aromas agradables con
          productos que transmitan calma, relajación y bienestar en cada uso.
        </p>
      </section>

      <div className="info-grid">
        <section className="info-card">
          <h2>Misión</h2>
          <p>
            Somos una empresa dedicada a la producción de velas y jabones artesanales, y
            nuestra misión es llevar el excelente aroma de nuestros productos a todos los
            lugares posibles. Nos enfocamos en crear piezas únicas, respetuosas con el medio
            ambiente y con acabados de gran calidad, para que cada cliente disfrute de un
            producto exclusivo que contribuya a su relajación, equilibrio y armonía.
          </p>
        </section>

        <section className="info-card">
          <h2>Visión</h2>
          <p>
            Nuestra visión es convertirnos en una empresa reconocida por su innovación y
            compromiso ambiental, con una mayor variedad de productos y aromas que se
            adapten a los gustos y necesidades de todos nuestros clientes. Queremos expandir
            nuestra presencia en el mercado, ofrecer nuevas experiencias sensoriales y
            posicionarnos como un referente en el sector de velas y jabones artesanales,
            siempre manteniendo la esencia natural y artesanal que nos caracteriza.
          </p>
        </section>
      </div>

    </div>
  </div>
)

export default SobreNosotros
