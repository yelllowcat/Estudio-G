import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estudio G - Arquitectura Contemporánea",
  description:
    "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores.",
  generator: "v0.app",
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
    url: "https://estudiog.com",
    siteName: "Estudio G",
    title: "Estudio G - Arquitectura Contemporánea",
    description:
      "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores.",
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
    title: "Estudio G - Arquitectura Contemporánea",
    description:
      "Creamos espacios que transforman vidas. Arquitectura contemporánea, diseño sostenible y proyectos innovadores.",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
