import styles from './Panel.module.scss';
import Header from '../../blocks/Header/Header';
import Personal from '../../blocks/Personal/Personal';
import Files from './../../blocks/Files/Files';

export default function Panel() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.header}>Панель управления</h1>
        <Personal />
        <Files />
      </main>
    </>
  )
}