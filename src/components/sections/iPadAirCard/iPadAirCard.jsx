import React from "react";
import { ContainerScroll } from "../../ui/container-scroll-animation";
import ipadScreen from "../../../assets/ipad-screen.jpg";
import styles from "./iPadAirCard.module.css";

export function IPadAirCard() {
  return (
    <div className={styles.wrapper}>
      <ContainerScroll
        titleComponent={
          <div style={{ textAlign: "center", width: "100%" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 600,
                color: "#f5f5f7",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginTop: -200,
              }}
            >
              İnce ve hafif bir tasarım,
              <br />
              <span
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 700,
                  display: "block",
                  letterSpacing: "-0.04em",
                }}
              >
                ciddi bir performans.
              </span>
            </h1>
            <p
              style={{
                marginTop: "12px",
                marginBottom: "48px",
                fontSize: "1.1rem",
                color: "#a1a1a6",
                fontWeight: 400,
              }}
            >
              iPad Air · M4 çip · 47.999 TL&apos;den başlayan fiyatlarla
            </p>
          </div>
        }
      >
        <img
          src={ipadScreen}
          alt="iPadOS 26 arayüzü"
          height={999}
          width={1447}
          className={styles.screenImage}
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export default IPadAirCard;
