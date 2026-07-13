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
  // Boyut/görünüm stilleri CSS module'de (.card responsive); yalnızca scroll'a
  // bağlı motion değerleri (rotateX, scale) inline kalır.
  <motion.div className={styles.card} style={{ rotateX: rotate, scale }}>
    <div className={styles.cameraDot} />
    <div className={styles.screen}>{children}</div>
  </motion.div>
);
