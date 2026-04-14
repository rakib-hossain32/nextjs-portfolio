"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.8,
    fullWidth = false,
    className = ""
}) {
    const ref = useRef(null);

    useGSAP(() => {
        const el = ref.current;
        let x = 0;
        let y = 0;

        switch (direction) {
            case "up":
                y = 50;
                break;
            case "down":
                y = -50;
                break;
            case "left":
                x = 50;
                break;
            case "right":
                x = -50;
                break;
            default:
                break;
        }

        gsap.fromTo(
            el,
            {
                autoAlpha: 0,
                x: x,
                y: y
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: duration,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Animation starts when top of element hits 85% of viewport height
                    toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
                },
            }
        );
    }, { scope: ref });

    return (
        <div ref={ref} className={`${fullWidth ? "w-full" : ""} ${className} opacity-0`}>
            {/* opacity-0 to prevent flash of unstyled content before GSAP takes over */}
            {children}
        </div>
    );
}
