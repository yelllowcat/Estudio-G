import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://estudio-g.vercel.app"),
  title: {
    default: "Estudio G - Arquitectura Contemporánea | La Paz, BCS",
    template: "%s | Estudio G",
  },
  description:
    "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores. Servicios de diseño arquitectónico, proyecto ejecutivo, diseño interior, visualización 3D y renders en La Paz, Baja California Sur.",
  keywords: [
    "arquitectura",
    "arquitectura contemporánea",
    "diseño arquitectónico",
    "diseño interior",
    "interiorismo",
    "proyecto ejecutivo",
    "renders arquitectónicos",
    "visualización 3D",
    "arquitectos La Paz",
    "arquitectura BCS",
    "Baja California Sur",
    "diseño sostenible",
    "arquitectura moderna",
    "espacios funcionales",
    "estudio de arquitectura",
  ],
  authors: [{ name: "Estudio G" }],
  creator: "Estudio G",
  publisher: "Estudio G",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://estudio-g.vercel.app",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://estudio-g.vercel.app",
    siteName: "Estudio G",
    title: "Estudio G - Arquitectura Contemporánea | La Paz, BCS",
    description:
      "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores. Servicios de diseño arquitectónico, proyecto ejecutivo, diseño interior, visualización 3D y renders en La Paz, Baja California Sur.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Estudio G - Arquitectura Contemporánea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio G - Arquitectura Contemporánea | La Paz, BCS",
    description:
      "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores en La Paz, Baja California Sur.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://estudio-g.vercel.app",
    name: "Estudio G",
    description:
      "Estudio de arquitectura contemporánea especializado en diseño arquitectónico, proyecto ejecutivo, diseño interior y visualización 3D",
    url: "https://estudio-g.vercel.app",
    telephone: ["+526122195895", "+526128687865"],
    email: "estudiog.arquitectas@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Paz",
      addressRegion: "Baja California Sur",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.1426,
      longitude: -110.3128,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    image: "https://estudio-g.vercel.app/og-image.jpg",
    priceRange: "$$",
    sameAs: [
      "https://www.instagram.com/arqestudio.g/",
      "https://www.facebook.com/102249694476940",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Arquitectura",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño arquitectónico",
            description:
              "Desarrollo integral del concepto y la forma del edificio, equilibrando estética, funcionalidad y entorno",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Proyecto ejecutivo",
            description:
              "Elaboración del conjunto completo de planos técnicos, detalles constructivos y especificaciones",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño Interior",
            description:
              "Planificación y acondicionamiento de espacios internos, seleccionando materiales, iluminación y mobiliario",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visualización 3D",
            description:
              "Modelado digital tridimensional del proyecto para comprender la volumetría y el espacio",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Renders",
            description:
              "Generación de imágenes fotorrealistas de alta calidad para visualizar el resultado final",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Presupuestos",
            description:
              "Estimación detallada de costos, materiales y tiempos de ejecución",
          },
        },
      ],
    },
  }

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
