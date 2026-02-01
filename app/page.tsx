"use client"

import { Menu, X, ArrowRight, Maximize2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import ImageCarousel from "@/components/ImageCarousel"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeroImageFullScreen, setIsHeroImageFullScreen] = useState(false)

  // Scroll animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4")
            element.style.animationDuration = "0.6s"
            element.style.animationFillMode = "both"
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isHeroImageFullScreen) {
        setIsHeroImageFullScreen(false)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isHeroImageFullScreen])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 text-white backdrop-blur border-b border-white/10 bg-[oklch(0.25_0.08_50_/_0.9)] supports-[backdrop-filter]:bg-[oklch(0.25_0.08_50_/_0.6)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-serif font-semibold tracking-tight">ESTUDIO</div>
            <img src="/logo2.png" alt="Estudio G Logo" className="w-12 object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="text-sm hover:text-gray-300 transition-colors duration-200">
              PROYECTOS
            </a>
            <a href="#about" className="text-sm hover:text-gray-300 transition-colors duration-200">
              ESTUDIO
            </a>
            <a href="#services" className="text-sm hover:text-gray-300 transition-colors duration-200">
              SERVICIOS
            </a>
            <a href="#contact" className="text-sm hover:text-gray-300 transition-colors duration-200">
              CONTACTO
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded transition-colors duration-200"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-accent animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4 px-6 py-4">
              <a
                href="#projects"
                className="text-sm py-2 hover:text-gray-300 transition-colors duration-200 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                PROYECTOS
              </a>
              <a
                href="#about"
                className="text-sm py-2 hover:text-gray-300 transition-colors duration-200 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ESTUDIO
              </a>
              <a
                href="#services"
                className="text-sm py-2 hover:text-gray-300 transition-colors duration-200 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICIOS
              </a>
              <a
                href="#contact"
                className="text-sm py-2 hover:text-gray-300 transition-colors duration-200 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
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
            <div className="animate-on-scroll">
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Arquitectura contemporánea</p>
              <h1 className="font-serif font-light leading-tight mb-6 text-pretty">
                Espacios que transforman vidas
              </h1>
              <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
                En Estudio G creamos arquitectura e interiorismo con intención.
                Diseñamos espacios funcionales, estéticos y hechos a tu medida, desde el concepto hasta los acabados.
              </p>
              <a href="#projects">
                <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  Ver proyectos
                  <ArrowRight size={18} />
                </button>
              </a>
            </div>
            <div className="h-96 md:h-full min-h-96 rounded-lg overflow-hidden bg-muted relative group cursor-pointer">
              <img
                src="/charly-exterior.jpg"
                alt="Estudio G - Proyecto arquitectónico"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onClick={() => setIsHeroImageFullScreen(true)}
              />
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Maximize2 size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid flex gap-16 items-center">
          <div className="animate-on-scroll">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Nuestro trabajo</p>
            <h2 className="font-serif font-light text-pretty">Proyectos destacados</h2>
          </div>
          <ImageCarousel
            images={[
              {
                title: "Charly's Grilled Burger",
                image: "/charly-exterior.jpg",
              },
              {
                title: "Charly's Grilled Burger",
                image: "/charly-exterior-2.jpg",
              },

            ]}
            autoPlayInterval={5000}
          />

          <ImageCarousel
            images={[
              {
                title: "Interior Infantil",
                image: "/interior-rosa-1.jpg",
              },
              {
                title: "Interior Infantil",
                image: "/interior-rosa-2.jpg",
              },
              {
                title: "Interior Infantil",
                image: "/interior-infantil-1.jpg",
              },

            ]}
            autoPlayInterval={5000}
          />
          <ImageCarousel
            images={[
              {
                title: "Interior Moderno",
                image: "/interior-moderno-1.jpg",
              },
              {
                title: "Interior Moderno",
                image: "/interior-moderno-2.jpg",
              },
              {
                title: "Interior Moderno",
                image: "/comedor.jpg",
              },
              {
                title: "Interior Moderno",
                image: "/fregadero.jpg",
              },

            ]}
            autoPlayInterval={5000}
          />
          <ImageCarousel
            images={[
              {
                title: "Happy Baggles",
                image: "/happy-baggles-1.jpg",
              },
              {
                title: "Happy Baggles",
                image: "/happy-baggles-2.jpg",
              },

            ]}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Lo que ofrecemos</p>
            <h2 className="font-serif font-light mb-16 text-pretty">Nuestros servicios</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Diseño arquitectónico",
                description: "Desarrollo integral del concepto y la forma del edificio, equilibrando estética, funcionalidad y entorno desde la idea inicial hasta el anteproyecto."
              },
              {
                title: "Proyecto ejecutivo",
                description: "Elaboración del conjunto completo de planos técnicos, detalles constructivos y especificaciones necesarias para la correcta construcción de la obra."
              },
              {
                title: "Diseño interior",
                description: "Planificación y acondicionamiento de espacios internos, seleccionando materiales, iluminación y mobiliario para crear ambientes funcionales y estéticos."
              },
              {
                title: "Visualización 3D",
                description: "Modelado digital tridimensional del proyecto que permite comprender la volumetría y el espacio antes de su ejecución física."
              },
              {
                title: "Renders",
                description: "Generación de imágenes fotorrealistas de alta calidad para visualizar el resultado final del proyecto con texturas, luces y sombras reales."
              },
              {
                title: "Presupuestos",
                description: "Estimación detallada de costos, materiales y tiempos de ejecución para asegurar la viabilidad financiera y el control económico de la obra."
              }
            ].map((service, index) => (
              <div
                key={index}
                className="animate-on-scroll p-8 rounded-lg bg-secondary border border-border hover:border-muted-foreground hover:shadow-lg transition-all duration-300 cursor-default"
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
            <div className="h-96 md:h-full min-h-96 rounded-lg overflow-hidden bg-muted order-2 md:order-1 animate-on-scroll">
              <img
                src="/about.jpg"
                alt="Equipo del Estudio G"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2 animate-on-scroll">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Sobre nosotros</p>
              <h2 className="font-serif font-light mb-6 text-pretty">
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
          <div className="animate-on-scroll">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4 text-center">Hablemos</p>
            <h2 className="font-serif font-light mb-12 text-center text-pretty">
              ¿Listo para tu próximo proyecto?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h3 className="font-serif text-lg mb-6">Contacto directo</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href="mailto:estudiog.arquitectas@gmail.com"
                    className="text-lg hover:text-muted-foreground transition-colors duration-200"
                  >
                    estudiog.arquitectas@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teléfono 1</p>
                  <a
                    href="tel:+526122195895"
                    className="text-lg hover:text-muted-foreground transition-colors duration-200"
                  >
                    +52 612 219 58 95
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teléfono 2</p>
                  <a
                    href="tel:+526128687865"
                    className="text-lg hover:text-muted-foreground transition-colors duration-200"
                  >
                    +52 612 868 78 65
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
                  <p className="text-lg">La Paz, Baja California Sur, México</p>
                </div>
              </div>
            </div>

            <form className="space-y-4 animate-on-scroll">
              <div>
                <label htmlFor="contact-name" className="sr-only">Tu nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Tu email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Tu mensaje</label>
                <textarea
                  id="contact-message"
                  placeholder="Tu mensaje"
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-shadow duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:bg-accent/90 hover:shadow-lg transition-all duration-200 font-medium cursor-pointer"
              >
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
                <a href="#projects" className="hover:opacity-100 transition-opacity duration-200">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:opacity-100 transition-opacity duration-200">
                  Estudio
                </a>
              </li>
              <li>
                <a href="#services" className="hover:opacity-100 transition-opacity duration-200">
                  Servicios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-4 uppercase tracking-wider">Redes</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>
                <a
                  href="https://www.instagram.com/arqestudio.g/"
                  className="hover:opacity-100 transition-opacity duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/102249694476940"
                  className="hover:opacity-100 transition-opacity duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

      {/* Hero Image Fullscreen Modal */}
      {isHeroImageFullScreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsHeroImageFullScreen(false)}
        >
          <button
            onClick={() => setIsHeroImageFullScreen(false)}
            className="absolute top-4 right-4 bg-white/10 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition z-10"
            aria-label="Close fullscreen"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/charly-exterior.jpg"
              alt="Estudio G - Proyecto arquitectónico"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
