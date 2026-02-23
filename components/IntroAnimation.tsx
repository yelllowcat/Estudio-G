"use client";

import { useState, useCallback, useEffect } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { IntroComposition } from "./IntroComposition";

const FPS = 30;
const DURATION_IN_FRAMES = 5 * FPS; // 5 seconds

export default function IntroAnimation() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [playerRef, setPlayerRef] = useState<PlayerRef | null>(null);
    const [dimensions, setDimensions] = useState<{
        width: number;
        height: number;
    } | null>(null);

    // Capture viewport dimensions on mount
    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    const handlePlayerRef = useCallback((ref: PlayerRef | null) => {
        if (ref) {
            setPlayerRef(ref);
        }
    }, []);

    useEffect(() => {
        if (!playerRef) return;

        // Auto-play on mount
        playerRef.play();

        const handleEnded = () => {
            setIsFadingOut(true);
            // Remove from DOM after CSS transition
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        };

        playerRef.addEventListener("ended", handleEnded);
        return () => {
            playerRef.removeEventListener("ended", handleEnded);
        };
    }, [playerRef]);

    if (!isVisible || !dimensions) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                opacity: isFadingOut ? 0 : 1,
                transition: "opacity 0.4s ease-out",
                pointerEvents: isFadingOut ? "none" : "auto",
                backgroundColor: "#2a1f17",
                overflow: "hidden",
            }}
        >
            <Player
                ref={handlePlayerRef}
                component={IntroComposition}
                inputProps={{}}
                durationInFrames={DURATION_IN_FRAMES}
                compositionWidth={dimensions.width}
                compositionHeight={dimensions.height}
                fps={FPS}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                autoPlay
                controls={false}
                loop={false}
                clickToPlay={false}
                renderLoading={() => <div style={{ width: "100%", height: "100%", backgroundColor: "#2a1f17" }} />}
            />
        </div>
    );
}
