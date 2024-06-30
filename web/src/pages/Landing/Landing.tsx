import styles from './Landing.module.scss';
import Header from '../../components/Header/Header';
import DownloadApp from './../../blocks/DownloadApp/DownloadApp';

export default function Landing() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.landing_header}>Quagga</h1>
        <h4 className={styles.landing_subheader}>сервис для <span className={styles.selected}>школьников, учителей, родителей</span> и не только</h4>
      </main>
      <DownloadApp />
    </>
  )
}