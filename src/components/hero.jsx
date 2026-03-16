import '../styles/hero.css'
import heroImage from '../img/WhatsApp Image 2026-02-09 at 10.29.37 PM.jpeg'

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <p className="hero-subtitle">TEMPORADA ARTESANAL</p>
        <h1 className="hero-title">
          <span className="hero-highlight">Aromas que inspiran</span>
        </h1>
      </div>
    </section>
  )
}

export default Hero
