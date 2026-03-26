"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function GsapInitializer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Reveal Engine
    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.fromTo(
        el,
        {
          y: 30,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    });

    // 2. Ventures Horizontal Scroll
    const venturesSection = document.querySelector("#ventures") as HTMLElement;
    const venturesTrack = document.querySelector("#ventures-track") as HTMLElement;
    
    if (venturesSection && venturesTrack) {
      setTimeout(() => {
        const scrollWidth = venturesTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        gsap.to(venturesTrack, {
          x: () => -(scrollWidth - viewportWidth),
          ease: "none",
          scrollTrigger: {
            trigger: venturesSection,
            start: "top top",
            end: () => `+=${scrollWidth}`, // Fixed scroll distance based on track width
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Optional: Track progress logic could go here
            }
          },
        });
        
        // Final refresh to ensure all triggers align correctly
        ScrollTrigger.refresh();
      }, 200);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
