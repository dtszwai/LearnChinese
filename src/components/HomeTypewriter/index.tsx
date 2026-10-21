import React, { useEffect, useRef } from 'react';
import type TypeIt from 'typeit';

const HomeTypewriter = () => {
  const element = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = element.current;
    if (!target) return;
    let cancelled = false;
    let instance: TypeIt | undefined;
    // Load the DOM animation engine only after hydration.
    void import('typeit').then(({ default: TypeIt }) => {
      if (cancelled) return;
      instance = new TypeIt(target, { speed: 100, waitUntilVisible: true });
      instance
        .pause(700)
        .type('鳥宿池邊樹，', { speed: 300, delay: 900 })
        .type('僧推月下門。', { speed: 300, delay: 1200 })
        .move(-4, { speed: 150, delay: 800 })
        .delete(1, { delay: 700 })
        .type('<strong style="color:#8783D1">敲</strong>', { delay: 300 })
        .move(4, { delay: 1000 })
        .break({ delay: 700 })
        .type('水田飛白鷺，夏木囀黃鸝。', { speed: 300, delay: 1200 })
        .move(-12, { speed: 150, delay: 600 })
        .type('<strong style="color:#E27396">漠漠</strong>', {
          speed: 500,
          delay: 1200,
        })
        .move(6, { speed: 200, delay: 500 })
        .type('<strong style="color:#E27396">陰陰</strong>', {
          speed: 500,
          delay: 700,
        })
        .move(6, { speed: 200 })
        .go();
    });
    return () => {
      cancelled = true;
      instance?.destroy();
      target.replaceChildren();
    };
  }, []);
  return <span ref={element} data-home-typewriter />;
};

export default HomeTypewriter;
