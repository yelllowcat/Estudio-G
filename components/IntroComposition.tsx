"use client";

import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Sequence,
    AbsoluteFill,
    Img,
    staticFile,
} from "remotion";

export const IntroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // === BACKGROUND ===
    const bgOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
    });

    // === FADE OUT (last 1.5 seconds) ===
    const fadeOutStart = 3.5 * fps; // frame 105
    const totalFadeOut = interpolate(
        frame,
        [fadeOutStart, 5 * fps],
        [1, 0],
        {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
        }
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#2a1f17",
                opacity: bgOpacity * totalFadeOut,
                overflow: "hidden",
            }}
        >
            {/* Warm gradient overlay */}
            <AbsoluteFill
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 40%, rgba(180, 120, 70, 0.15) 0%, transparent 70%)",
                }}
            />

            {/* Architectural Lines */}
            <Sequence from={Math.round(0.5 * fps)} durationInFrames={Math.round(4.5 * fps)} premountFor={Math.round(0.3 * fps)}>
                <ArchitecturalLines />
            </Sequence>

            {/* Studio Name */}
            <Sequence from={Math.round(1 * fps)} durationInFrames={Math.round(4 * fps)} premountFor={Math.round(0.5 * fps)}>
                <StudioName />
            </Sequence>

            {/* Logo */}
            <Sequence from={Math.round(1.5 * fps)} durationInFrames={Math.round(3.5 * fps)} premountFor={Math.round(0.5 * fps)}>
                <LogoReveal />
            </Sequence>

            {/* Tagline */}
            <Sequence from={Math.round(2 * fps)} durationInFrames={Math.round(3 * fps)} premountFor={Math.round(0.5 * fps)}>
                <Tagline />
            </Sequence>

            {/* Subtle particle/dust effect */}
            <AbsoluteFill style={{ pointerEvents: "none" }}>
                <DustParticles />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// ─── ARCHITECTURAL LINES ───────────────────────────────────────

const ArchitecturalLines: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    const lineProgress = spring({
        frame,
        fps,
        config: { damping: 200 },
        durationInFrames: Math.round(1.5 * fps),
    });

    const lineColor = "rgba(200, 160, 120, 0.25)";

    return (
        <AbsoluteFill>
            {/* Top horizontal line */}
            <div
                style={{
                    position: "absolute",
                    top: "28%",
                    left: "10%",
                    width: `${lineProgress * 80}%`,
                    height: 1,
                    backgroundColor: lineColor,
                    transformOrigin: "left center",
                }}
            />
            {/* Bottom horizontal line */}
            <div
                style={{
                    position: "absolute",
                    top: "72%",
                    right: "10%",
                    width: `${lineProgress * 80}%`,
                    height: 1,
                    backgroundColor: lineColor,
                    transformOrigin: "right center",
                }}
            />
            {/* Left vertical line */}
            <div
                style={{
                    position: "absolute",
                    left: "20%",
                    top: "15%",
                    width: 1,
                    height: `${lineProgress * 70}%`,
                    backgroundColor: lineColor,
                    transformOrigin: "center top",
                }}
            />
            {/* Right vertical line */}
            <div
                style={{
                    position: "absolute",
                    right: "20%",
                    bottom: "15%",
                    width: 1,
                    height: `${lineProgress * 70}%`,
                    backgroundColor: lineColor,
                    transformOrigin: "center bottom",
                }}
            />
            {/* Diagonal accent — relative to viewport width */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${lineProgress * width * 0.2}px`,
                    height: 1,
                    backgroundColor: "rgba(200, 160, 120, 0.12)",
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    transformOrigin: "center",
                }}
            />
        </AbsoluteFill>
    );
};

// ─── STUDIO NAME ───────────────────────────────────────────────

const StudioName: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 80, mass: 1.2 },
    });

    const translateY = interpolate(entrance, [0, 1], [height * 0.04, 0]);
    const opacity = interpolate(entrance, [0, 1], [0, 1]);

    // Letter spacing — scales with viewport
    const maxLetterSpacing = Math.min(width * 0.012, 14);
    const letterSpacing = interpolate(entrance, [0, 1], [maxLetterSpacing * 2.2, maxLetterSpacing]);

    // Font size — responsive, capped at 72
    const fontSize = Math.min(width * 0.06, 72);

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: height * 0.06,
            }}
        >
            <div
                style={{
                    transform: `translateY(${translateY}px)`,
                    opacity,
                    fontFamily:
                        "'Georgia', 'Times New Roman', 'Playfair Display', serif",
                    fontSize,
                    fontWeight: 300,
                    color: "#f5ebe0",
                    letterSpacing: `${letterSpacing}px`,
                    textTransform: "uppercase",
                }}
            >
                ESTUDIO
            </div>
        </AbsoluteFill>
    );
};

// ─── LOGO REVEAL ───────────────────────────────────────────────

const LogoReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const scaleSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const scale = interpolate(scaleSpring, [0, 1], [0.7, 1]);
    const opacity = interpolate(scaleSpring, [0, 1], [0, 1]);

    // Logo size — responsive, capped at 120
    const logoSize = Math.min(width * 0.15, 120);

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Img
                src={staticFile("logo2.png")}
                style={{
                    width: logoSize,
                    height: logoSize,
                    objectFit: "contain",
                    transform: `scale(${scale})`,
                    opacity,
                    filter: "brightness(1.3) contrast(0.9)",
                    marginTop: height * 0.03,
                }}
            />
        </AbsoluteFill>
    );
};

// ─── TAGLINE ───────────────────────────────────────────────────

const Tagline: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const words = ["Arquitectura", "·", "Interiorismo", "·", "Diseño"];

    // Responsive sizes
    const baseFontSize = Math.min(width * 0.025, 16);
    const dotFontSize = Math.min(width * 0.03, 20);
    const gap = Math.min(width * 0.015, 12);
    const ls = Math.min(width * 0.005, 4);

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: height * 0.15,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap,
                    alignItems: "center",
                    padding: "0 5%",
                }}
            >
                {words.map((word, i) => {
                    const delay = i * 4; // stagger each word by 4 frames
                    const wordSpring = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 200 },
                    });
                    const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
                    const translateY = interpolate(wordSpring, [0, 1], [15, 0]);

                    return (
                        <span
                            key={i}
                            style={{
                                fontFamily:
                                    "'Georgia', 'Times New Roman', 'Playfair Display', serif",
                                fontSize: word === "·" ? dotFontSize : baseFontSize,
                                fontWeight: 300,
                                color: "rgba(200, 180, 160, 0.9)",
                                letterSpacing: ls,
                                textTransform: "uppercase",
                                opacity,
                                transform: `translateY(${translateY}px)`,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// ─── DUST PARTICLES ────────────────────────────────────────────

const DustParticles: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Simple floating particles for organic feel
    const particles = Array.from({ length: 8 }, (_, i) => {
        const seed = i * 137.5;
        const x = ((seed * 7) % 100);
        const startY = 30 + ((seed * 3) % 60);
        const duration = 4 + (i % 3);
        const progress = (frame / (duration * fps)) % 1;
        const y = startY - progress * 20;
        const particleOpacity = interpolate(
            frame,
            [0, 1 * fps, 3.5 * fps, 5 * fps],
            [0, 0.3 + (i % 3) * 0.1, 0.3 + (i % 3) * 0.1, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        return (
            <div
                key={i}
                style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    width: 2 + (i % 2),
                    height: 2 + (i % 2),
                    borderRadius: "50%",
                    backgroundColor: "rgba(200, 170, 130, 0.4)",
                    opacity: particleOpacity,
                }}
            />
        );
    });

    return <AbsoluteFill>{particles}</AbsoluteFill>;
};
