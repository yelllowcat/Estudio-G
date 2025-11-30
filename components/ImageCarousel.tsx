"use client"

import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
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
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const minSwipeDistance = 50

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

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
        setIsAutoPlaying(false)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            goToNext()
        } else if (isRightSwipe) {
            goToPrevious()
        }

        setTimeout(() => setIsAutoPlaying(true), 3000)
    }

    const openFullScreen = () => {
        setIsFullScreen(true)
        setIsAutoPlaying(false)
    }

    const closeFullScreen = () => {
        setIsFullScreen(false)
        setIsAutoPlaying(true)
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isFullScreen) {
                closeFullScreen()
            }
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isFullScreen])

    return (
        <div
            className="relative w-full group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={openFullScreen}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <Maximize2 size={20} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
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

            {/* Fullscreen Modal */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={closeFullScreen}
                >
                    <button
                        onClick={closeFullScreen}
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
                            src={images[currentIndex].image}
                            alt={images[currentIndex].title}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />

                        {/* Navigation in fullscreen */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        goToPrevious()
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur text-white p-4 rounded-full hover:bg-white/20 transition"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        goToNext()
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur text-white p-4 rounded-full hover:bg-white/20 transition"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </>
                        )}

                        {/* Title and counter in fullscreen */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <div className="flex items-center justify-between max-w-7xl mx-auto">
                                <h3 className="text-2xl md:text-3xl font-serif font-light">
                                    {images[currentIndex].title}
                                </h3>
                                <span className="text-sm bg-white/10 backdrop-blur px-3 py-1 rounded-full">
                                    {currentIndex + 1} / {images.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
