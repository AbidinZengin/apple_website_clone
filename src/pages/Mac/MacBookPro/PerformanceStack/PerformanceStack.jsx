import { memo, useRef } from 'react';
import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import ChipCircuitBoard from './ChipCircuitBoard';
import { CHIP_LAYERS, PERFORMANCE_STACK } from './performanceStack.data';
import styles from './PerformanceStack.module.css';

const { eyebrow, titleLines, bodyPrefix, bodyBold, bodySuffix } = PERFORMANCE_STACK;

const spring = { stiffness: 170, damping: 24, mass: 0.9 };

// Çipler üst üste yığılmıyor ama bir öncekinin "yok olup yerine yenisinin gelmesi"
// hissi de verilmemeli — geniş, örtüşen crossfade pencereleri sayesinde bir sonraki
// (daha yoğun) devre, bir öncekinin üzerinde büyürken öncekini yavaşça söndürür.
// Bu yüzden geçiş bölgeleri (ZONE1/ZONE2) uzun tutulur: yeni katmanın reveal maskesi
// tam da bu pencerede merkezden dışa büyür — "kollar uzuyor" hissi buradan gelir.
const ZONE1 = [0.24, 0.46];
const ZONE2 = [0.56, 0.78];


const FADE_RANGES = [
  { input: [0, ZONE1[0], ZONE1[1]], output: [1, 1, 0] },
  { input: [ZONE1[0], ZONE1[1], ZONE2[0], ZONE2[1]], output: [0, 1, 1, 0] },
  { input: [ZONE2[0], ZONE2[1], 1], output: [0, 1, 1] },
];

const REVEAL_RANGES = [
  { input: [0, 0.12], output: [0, 1] },
  { input: ZONE1, output: [0, 1] },
  { input: ZONE2, output: [0, 1] },
];

const INTENSITY_RANGES = [
  { input: [0, 0.12], output: [0.25, 1] },
  { input: [ZONE1[0], ZONE1[0] + 0.12], output: [0.25, 1] },
  { input: [ZONE2[0], ZONE2[0] + 0.12], output: [0.25, 1] },
];

// Renk değişimi katman değişiminden bağımsız, tek ve sürekli bir hue-rotate
// eğrisiyle sürülüyor. Böylece hangi devre üstte olursa olsun ton her zaman
// aynı anda, aynı değerde ve pürüzsüzce kayıyor — ani renk sıçraması olmuyor.
const HUE_INPUT = [0, ZONE1[0], ZONE1[1], ZONE2[0], ZONE2[1], 1];
const HUE_OUTPUT = [180, 180, 235, 235, 300, 300];

// prefers-reduced-motion açık olan kullanıcılar için spring'i pratikte anlık hale
// getiren, çok sert/az sönümlü bir konfigürasyon — animasyon kalkmıyor ama
// yumuşak/salınımlı geçiş yerine değerler neredeyse anında yerine oturuyor.
const REDUCED_SPRING = { stiffness: 1000, damping: 100, mass: 0.5 };

function useLayerMotion(scrollYProgress, index, springConfig) {
  const { input: fadeInput, output: fadeOutput } = FADE_RANGES[index];
  const { input: revealInput, output: revealOutput } = REVEAL_RANGES[index];
  const { input: intensityInput, output: intensityOutput } = INTENSITY_RANGES[index];

  const rawFade = useTransform(scrollYProgress, fadeInput, fadeOutput);
  const rawReveal = useTransform(scrollYProgress, revealInput, revealOutput);
  const rawIntensity = useTransform(scrollYProgress, intensityInput, intensityOutput);

  return {
    fade: useSpring(rawFade, springConfig),
    reveal: useSpring(rawReveal, springConfig),
    intensity: useSpring(rawIntensity, springConfig),
  };
}

function PerformanceStack() {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const prefersReducedMotion = useReducedMotion();
  const springConfig = prefersReducedMotion ? REDUCED_SPRING : spring;

  // Hook sırası sabit kalsın diye 3 katman için ayrı ayrı (sabit sayıda) çağrılır.
  const layer0 = useLayerMotion(scrollYProgress, 0, springConfig);
  const layer1 = useLayerMotion(scrollYProgress, 1, springConfig);
  const layer2 = useLayerMotion(scrollYProgress, 2, springConfig);
  const layerMotions = [layer0, layer1, layer2];

  const hueRotate = useSpring(useTransform(scrollYProgress, HUE_INPUT, HUE_OUTPUT), springConfig);

  return (
    <section ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h2>
        </header>

        <div className={styles.stage}>
          {CHIP_LAYERS.map((chip, index) => {
            const { fade, reveal, intensity } = layerMotions[index];
            return (
              <ChipCircuitBoard
                key={chip.id}
                variant={chip.variant}
                reveal={reveal}
                intensity={intensity}
                hueRotate={hueRotate}
                style={{ opacity: fade, zIndex: index + 1 }}
              />
            );
          })}
        </div>

        <p className={styles.bodyCopy}>
          {bodyPrefix}
          <strong className={styles.bodyStrong}>{bodyBold}</strong>
          {bodySuffix}
        </p>
      </div>
    </section>
  );
}

export default memo(PerformanceStack);
