"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface CarouselImage {
    title: string
    image: string
}

interface ImageCarouselProps {
    images: CarouselImage[]
    autoPlayInterval?: number
}

export default function ImageCarousel({ images, autoPlayInterval = 5000 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    useEffect(() => {
        if (!isAutoPlaying) return

        const intervalId = setInterval(goToNext, autoPlayInterval)

        return () => clearInterval(intervalId)
    }, [currentIndex, isAutoPlaying, autoPlayInterval])

    const handleMouseEnter = () => setIsAutoPlaying(false)
    const handleMouseLeave = () => setIsAutoPlaying(true)

    return (
        <div
            className="relative w-full group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-muted">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                            }`}
                    >
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-3xl md:text-4xl font-serif font-light">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex
                            ? "w-8 h-2 bg-white"
                            : "w-2 h-2 bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-light">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    )
}
