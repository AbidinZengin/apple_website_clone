import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./container-scroll-animation.module.css";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale     = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inner} style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => (
  <motion.div
    style={{
      translateY: translate,
      textAlign: "center",
      width: "100%",
      maxWidth: "64rem",
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    {titleComponent}
  </motion.div>
);

export const Card = ({ rotate, scale, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      background: "linear-gradient(145deg, #4a4a4c 0%, #323234 15%, #222224 30%, #1a1a1c 50%, #202022 65%, #303032 80%, #484849 100%)",
      boxShadow: `
        inset 0 2px 1px rgba(255,255,255,0.15),
        inset 0 -2px 1px rgba(0,0,0,0.70),
        inset 2px 0 1px rgba(255,255,255,0.08),
        inset -2px 0 1px rgba(0,0,0,0.50),
        0 0 0 1px rgba(0,0,0,0.60),
        0 2px 4px rgba(0,0,0,0.50),
        0 8px 16px rgba(0,0,0,0.55),
        0 24px 48px rgba(0,0,0,0.45),
        0 60px 80px rgba(0,0,0,0.30)
      `,
      border: "1px solid rgba(255,255,255,0.08)",
      padding: "22px",
      borderRadius: "38px",
      maxWidth: "64rem",
      marginTop: "-48px",
      marginLeft: "auto",
      marginRight: "auto",
      height: "640px",
      width: "100%",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 32%, #555, #080808)",
        boxShadow: "0 0 0 1.5px rgba(0,0,0,0.55), 0 0 0 3px rgba(160,160,160,0.28), inset 0 1px 3px rgba(255,255,255,0.18)",
        zIndex: 10,
      }}
    />
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: "20px",
        background: "#000",
      }}
    >
      {children}
    </div>
  </motion.div>
);
