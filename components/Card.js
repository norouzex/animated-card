"use client";

import { useRef, useEffect } from "react";
import { Power2, TweenMax } from "gsap";
import style from "./Card.module.css";
import Button from "./UI/Button";

const CardImage = (props) => {
  return <div className={style["card-image"]}></div>;
};

const CardContent = (props) => {
  return (
    <div className={style["card-detail"]}>
      <h2>{props.title}</h2>
      <p>
        Some quick example text to build on the card title and make up the bulk
        of the card's content in the flipped state.
      </p>
      <Button text="Go somewhere else" className={style.button} />
    </div>
  );
};

const FlipCardContent = (props) => {
  return (
    <>
      <div className={style.titles}>
        <h2>{props.title}</h2>
        <p>Support card subtitle</p>
      </div>
      <div
        // style={{ backgroundImage: `url(${props.src})` }}
        className={style.test}
      ></div>
      <div className={style["card-detail"]}>
        <p>
          Some quick example text to build on the card title and make up the
          bulk of the card's content in the flipped state.
        </p>
        <div className={style.links}>
          <p>
            <a href="#">Card link</a>
          </p>
          <p>
            <a href="#">Another link</a>
          </p>
        </div>
      </div>
    </>
  );
};
const Card = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const first = container.querySelector(".first");
    const second = container.querySelector(".second");
    const isTouch = "ontouchstart" in window;

    TweenMax.set(container, {
      css: {
        transformStyle: "preserve-3d",
        z: 0,
      },
    });

    TweenMax.set(second, {
      css: {
        rotationY: -180,
      },
    });

    TweenMax.set([first, second], {
      css: {
        backfaceVisibility: "hidden",
        position: "absolute",
        width: 348,
        height: 400,
        borderRadius: "10px",
      },
    });
    first.classList.add(style["card-size"]);
    function mouseenter() {
      TweenMax.to(container, 0.5, {
        css: { rotationY: "+=180" },
        onComplete: activeUi,
        ease: Power2.easeInOut,
      });
      TweenMax.to(container, 1, {
        css: { z: "-=100" },
        yoyo: true,
        repeat: 1,
        ease: Power2.easeIn,
      });
      container.removeEventListener("mouseenter", mouseenter);
    }
    function mouseleave() {
      TweenMax.to(container, 0.5, {
        css: { rotationY: "+=180" },
        onComplete: activeUi,
        ease: Power2.easeInOut,
      });
      TweenMax.to(container, 1, {
        css: { z: "-=100" },
        yoyo: true,
        repeat: 1,
        ease: Power2.easeIn,
      });
      container.removeEventListener("mouseleave", mouseleave);
    }

    function activeUi() {
      container.addEventListener("mouseenter", mouseenter, { once: true });
      container.addEventListener("mouseleave", mouseleave, { once: true });
    }

    activeUi();

    return () => {
      container.removeEventListener("mouseenter", mouseenter);
      container.removeEventListener("mouseleave", mouseleave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={style["card-size"]}
      style={{
        transformStyle: "preserve-3d",
        perspective: 800,
        perspectiveOrigin: "50% 50% 0px",
        backgroundColor: "#000000",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className={`${style.card} first`}>
        <CardImage src={"./iphone.jpg"} />
        <CardContent title="Main title" />
      </div>

      <div className={`${style.card} second`}>
        <FlipCardContent title="flip title" />
      </div>
    </div>
  );
};

export default Card;
