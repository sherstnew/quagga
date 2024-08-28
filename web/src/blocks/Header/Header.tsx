import styles from './Header.module.scss';
import quaggaLogo from '../../assets/images/quagga.png';
import loginIcon from '../../assets/icons/login.svg';
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';

export default function Header() {

  const [cookies] = useCookies(['QUAGGA_TOKEN']);

  return (
    <header className={styles.header}>
      <Link to='/'>
        <img src={quaggaLogo} alt="Логотип" className={styles.logo} />
      </Link>
      {
        cookies.QUAGGA_TOKEN
        ?
        <Link to="/panel">
          <button className={styles.btn}>
            <span className={styles.btn_text}>Личный кабинет</span>
          </button>
        </Link>
        :
        <Link to="/login">
          <button className={styles.btn}>
            <img src={loginIcon} alt="" className={styles.btn_icon} />
            <span className={styles.btn_text}>Вход</span>
          </button>
        </Link>
      }
    </header>
  )
}