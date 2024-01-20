import styles from './QrBlock.module.scss';
import QRCode from 'react-qr-code';
import { Logo } from '../../components/Logo/Logo';
import { useEffect } from 'react';

export function QrBlock () {

  useEffect(() => {
    fetch('http://91.204.253.192:45219/api/panel/checkConnected', {
        headers: {
          'Authorization': 'f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030'
        }
      })
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data) {
          if (data.connected) {
            window.location.href = '/menu'
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    setInterval(() => {
      fetch('http://91.204.253.192:45219/api/panel/checkConnected', {
        headers: {
          'Authorization': 'f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030'
        }
      })
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data) {
          if (data.connected) {
            window.location.href = '/menu'
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    }, 3000);
  }, []);

  return (
    <div className={styles.block}>
      <header className={styles.header}>Отсканируйте код</header>
      <span className={styles.subheader}>войдите с помощью бота</span>
      <QRCode value={"https://t.me/quagabot?start=f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030"} className={styles.qr} />
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
