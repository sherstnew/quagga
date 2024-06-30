import styles from './DownloadApp.module.scss';
import windowsIcon from '../../assets/icons/windows.svg';
import linuxIcon from '../../assets/icons/linux.svg';

export default function DownloadApp() {
  return (
    <section className={styles.download}>
      <h2 className={styles.header}>Скачать приложение</h2>
      <div className={styles.variants}>
        <div className={styles.variant}>
          <img src={windowsIcon} alt="" className={styles.variant_logo} />
          <header className={styles.variant_header}>Windows</header>
        </div>
        <div className={styles.variant}>
          <img src={linuxIcon} alt="" className={styles.variant_logo} />
          <header className={styles.variant_header}>Linux (MOS)</header>
        </div>
      </div>
    </section>
  )
}