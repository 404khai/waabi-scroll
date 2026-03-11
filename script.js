import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const heroCopySplitText = SplitText.create(".heroCopy h3", {
        type: "words", 
        wordsClass: "word",
    });

    let isHeroCopyHidden = false;

    ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `*${window.innerHeight * 3.5}px`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;

            const heroHeaderProgress = Math.min(progress / 0.29, 1);
            gsap.set(".heroHeader", {
                yPercent: -heroHeaderProgress * 100
            });

            const heroWordsProgress = Math.max(
                0,
                Math.min((progress - 0.29) / 0.21, 1),
            );

            const totalWords = heroCopySplitText.words.length;
            heroCopySplitText.words.forEach((word, i) => {
                const wordStart = i / totalWords;
                const wordEnd = (i + 1) / totalWords;
                const wordOpacity = Math.max(
                    0, 
                    Math.min((heroWordsProgress - wordStart) / (wordEnd - wordStart),
                    1),
                );
                gsap.set(word, {opacity: wordOpacity});
            });
            
        }
    })

});