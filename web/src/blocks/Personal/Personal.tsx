import styles from './Personal.module.scss';
interface IPersonalProps {
  username: string
}

export default function Personal(props: IPersonalProps) {

  // сделать patch на изменение имени юзера

  return (
    <section className={styles.personal}>
      <div className={styles.personal_block}>
        <label htmlFor="name" className={styles.label}>Как вас называть?</label>
        <input type="text" className={styles.input} id="name" defaultValue={props.username} />
      </div>
      <div className={styles.personal_block}>
        Карта не привязана
      </div>
    </section>
  )
}