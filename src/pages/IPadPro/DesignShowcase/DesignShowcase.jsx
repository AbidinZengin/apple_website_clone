import { ContainerScroll } from '../../../components/ui/container-scroll-animation';
import { DESIGN_SHOWCASE } from './designShowcase.data';
import styles from './DesignShowcase.module.css';

const { titlePlain, titleAccent, subheadline, screenImage, screenAlt } = DESIGN_SHOWCASE;

export default function DesignShowcase() {
  return (
    <section className={styles.section}>
      <ContainerScroll
        titleComponent={
          <div className={styles.heading}>
            <h2 className={styles.title}>
              {titlePlain}
              <span className={styles.accent}>{titleAccent}</span>
            </h2>
            <p className={styles.subheadline}>{subheadline}</p>
          </div>
        }
      >
        <img
          src={screenImage}
          alt={screenAlt}
          width={1447}
          height={999}
          className={styles.screenImage}
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
