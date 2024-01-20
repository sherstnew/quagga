import styles from './QrBlock.module.scss';
import QRCode from 'react-qr-code';
import { Logo } from '../../components/Logo/Logo';

export function QrBlock () {
  return (
    <div className={styles.block}>
      <header className={styles.header}>Отсканируйте код</header>
      <span className={styles.subheader}>войдите с помощью бота</span>
      <QRCode value={"https://t.me/quagabot?token=f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030"} className={styles.qr} />
      <div className={styles.divider}>
        <hr className={styles.line} />
        <span className={styles.or}>или</span>
        <hr className={styles.line} />
      </div>
      <span className={styles.schoolcard}>
        Приложить карту
      </span>
     <Logo />
    </div>
  );
}
