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

// Helper to calculate unified scale logic using the original 1920x1080 baseline
const useResponsiveScale = () => {
    const { width, height } = useVideoConfig();
    // Using 0.08 of width or 0.1 of height, capped at the original font size of 72.
    // This perfectly preserves the original 1920x1080 layout ratio while scaling down uniformly
    // on both narrow and short screens, preventing overlapping elements.
    const baseSize = Math.min(width * 0.08, height * 0.1, 72);

    return {
        baseSize,
        // Proportions derived directly from original fixed layout (e.g. fontSize was 72)
        // Increased padding/margin to prevent the text and logo from overlapping
        paddingBottom: baseSize * 1.5,
        marginTop: baseSize * 1.2,
        logoSize: baseSize * 1.666,
        taglinePaddingTop: baseSize * 2.5,
        diagonalLineMax: baseSize * 4.16, // originally 300 (300/72 = 4.16)
        letterSpacingMax: baseSize * 0.194, // originally 14 (14/72 = 0.194)
        translateYOffset: baseSize * 0.833, // originally 60 (60/72 = 0.833)
        taglineWidths: {
            base: baseSize * 0.222, // originally 16
            dot: baseSize * 0.277, // originally 20
            gap: baseSize * 0.166, // originally 12
            ls: baseSize * 0.055, // originally 4
        }
    };
};

export const IntroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

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
    const { fps } = useVideoConfig();
    const { diagonalLineMax } = useResponsiveScale();

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
            {/* Diagonal accent */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${lineProgress * diagonalLineMax}px`,
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
    const { fps } = useVideoConfig();
    const { baseSize, paddingBottom, translateYOffset, letterSpacingMax } = useResponsiveScale();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 80, mass: 1.2 },
    });

    const translateY = interpolate(entrance, [0, 1], [translateYOffset, 0]);
    const opacity = interpolate(entrance, [0, 1], [0, 1]);

    const letterSpacing = interpolate(entrance, [0, 1], [letterSpacingMax * 2.2, letterSpacingMax]);

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom,
            }}
        >
            <div
                style={{
                    transform: `translateY(${translateY}px)`,
                    opacity,
                    fontFamily:
                        "'Georgia', 'Times New Roman', 'Playfair Display', serif",
                    fontSize: baseSize,
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
    const { fps } = useVideoConfig();
    const { logoSize, marginTop } = useResponsiveScale();

    const scaleSpring = spring({
        frame,
        fps,
        config: { damping: 12, stiffness: 100 },
    });

    const scale = interpolate(scaleSpring, [0, 1], [0.7, 1]);
    const opacity = interpolate(scaleSpring, [0, 1], [0, 1]);

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
                    marginTop,
                }}
            />
        </AbsoluteFill>
    );
};

// ─── TAGLINE ───────────────────────────────────────────────────

const Tagline: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const { taglinePaddingTop, taglineWidths } = useResponsiveScale();

    const words = ["Arquitectura", "·", "Interiorismo", "·", "Diseño"];

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: taglinePaddingTop,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: taglineWidths.gap,
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
                    const maxTranslateY = taglineWidths.base * 0.9;
                    const translateY = interpolate(wordSpring, [0, 1], [maxTranslateY, 0]);

                    return (
                        <span
                            key={i}
                            style={{
                                fontFamily:
                                    "'Georgia', 'Times New Roman', 'Playfair Display', serif",
                                fontSize: word === "·" ? taglineWidths.dot : taglineWidths.base,
                                fontWeight: 300,
                                color: "rgba(200, 180, 160, 0.9)",
                                letterSpacing: taglineWidths.ls,
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
