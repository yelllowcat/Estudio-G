"use client"

import { Menu, X, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-serif font-semibold tracking-tight">ESTUDIO G</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm hover:text-muted-foreground transition">
              PROYECTOS
            </a>
            <a href="#about" className="text-sm hover:text-muted-foreground transition">
              ESTUDIO
            </a>
            <a href="#services" className="text-sm hover:text-muted-foreground transition">
              SERVICIOS
            </a>
            <a href="#contact" className="text-sm hover:text-muted-foreground transition">
              CONTACTO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="flex flex-col gap-4 px-6 py-4">
              <a href="#projects" className="text-sm">
                PROYECTOS
              </a>
              <a href="#about" className="text-sm">
                ESTUDIO
              </a>
              <a href="#services" className="text-sm">
                SERVICIOS
              </a>
              <a href="#contact" className="text-sm">
                CONTACTO
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Arquitectura contemporánea</p>
              <h1 className="text-5xl md:text-6xl font-serif font-light leading-tight mb-6 text-pretty">
                Espacios que transforman vidas
              </h1>
              <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
                En Estudio G, creamos arquitectura que respeta el entorno y mejora la experiencia humana. Cada proyecto
                es una conversación entre diseño, función y belleza.
              </p>
              <a href="#projects">
                <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 transition">
                  Ver proyectos
                  <ArrowRight size={18} />
                </button>
              </a>
            </div>
            <div className="h-96 md:h-full min-h-96 rounded-lg overflow-hidden bg-muted">
              <img
                src="/disenoExterior.jpg"
                alt="Estudio G - Proyecto arquitectónico"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Nuestro trabajo</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-16 text-pretty">Proyectos destacados</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Residencia Contemporánea",
                category: "Vivienda",
                image: "/diseno-exterior-2.jpg",
              },
              {
                title: "Centro Cultural",
                category: "Institucional",
                image: "/diseno-exterior-3.jpg",
              },
              {
                title: "Espacio Comercial",
                category: "Comercio",
                image: "/diseno-exterior-4.jpg",
              },
              {
                title: "Oficinas Sostenibles",
                category: "Corporativo",
                image: "/diseno-exterior-5.jpg",
              },
            ].map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="h-64 md:h-72 rounded-lg overflow-hidden bg-muted mb-4">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.category}</p>
                <h3 className="text-xl font-serif font-light">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Lo que ofrecemos</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-16 text-pretty">Nuestros servicios</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Diseño Arquitectónico",
                description:
                  "Concepto y desarrollo de proyectos desde la idea inicial hasta la ejecución, considerando sostenibilidad y funcionalidad.",
              },
              {
                title: "Planificación Urbana",
                description:
                  "Soluciones integrales para espacios públicos y privados que generan comunidades vibrantes y sostenibles.",
              },
              {
                title: "Restauración",
                description:
                  "Intervención sensitiva en edificios patrimoniales, respetando su historia mientras se adaptan a necesidades contemporáneas.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-secondary border border-border hover:border-muted-foreground transition"
              >
                <h3 className="text-xl font-serif font-light mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-96 md:h-full min-h-96 rounded-lg overflow-hidden bg-muted order-2 md:order-1">
              <img src="/about.jpg" alt="Equipo del Estudio G" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Sobre nosotros</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-pretty">
                Una visión clara del futuro
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Estudio G fue fundado con la convicción de que la arquitectura debe ser una herramienta de
                transformación social. Nos especializamos en crear espacios que conectan a las personas con su entorno.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro equipo multidisciplinario trabaja en colaboración con clientes, comunidades y especialistas para
                desarrollar proyectos que trascienden la estética y generan un impacto real en la calidad de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4 text-center">Hablemos</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-12 text-center text-pretty">
            ¿Listo para tu próximo proyecto?
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-lg mb-6">Contacto directo</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href="mailto:estudiog.arquitectas@gmail.com" className="text-lg hover:text-muted-foreground transition">
                    estudiog.arquitectas@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teléfono 1</p>
                  <a href="tel:+526122195895" className="text-lg hover:text-muted-foreground transition">
                    +52 612 219 58 95
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teléfono 2</p>
                  <a href="tel:+526128687865" className="text-lg hover:text-muted-foreground transition">
                    +52 612 868 78 65
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                  <p className="text-lg">La Paz, México</p>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <textarea
                placeholder="Tu mensaje"
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              />
              <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 transition font-medium">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-8 border-b border-primary-foreground/20 pb-8">
          <div>
            <h3 className="font-serif text-lg mb-4">ESTUDIO G</h3>
            <p className="text-sm opacity-70">Arquitectura que transforma espacios y vidas.</p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-4 uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a href="#projects" className="hover:opacity-100 transition">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:opacity-100 transition">
                  Estudio
                </a>
              </li>
              <li>
                <a href="#services" className="hover:opacity-100 transition">
                  Servicios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-4 uppercase tracking-wider">Redes</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a href="https://www.instagram.com/arqestudio.g/" className="hover:opacity-100 transition" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/102249694476940" className="hover:opacity-100 transition" target="_blank">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm opacity-70">
          <p>&copy; 2025 Estudio G. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
