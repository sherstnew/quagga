import styles from './Personal.module.scss';

export default function Personal() {
  return (
    <section className={styles.personal}>
      <div className={styles.personal_block}>
        <label htmlFor="name" className={styles.label}>Как вас называть?</label>
        <input type="text" className={styles.input} id="name" />
      </div>
      <div className={styles.personal_block}>
        Карта не привязана
      </div>
    </section>
  )
}