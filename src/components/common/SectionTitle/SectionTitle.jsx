import styles from './SectionTitle.module.css';

export default function SectionTitle({ bold, regular }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <span className={styles.bold}>{bold}</span>
        {regular && <span className={styles.regular}> {regular}</span>}
      </h2>
    </div>
  );
}
