import styles from './Login.module.scss';
import Header from './../../components/Header/Header';
import { useState } from 'react';

import handImg from '../../assets/images/hand.png';
import eyeOpenIcon from '../../assets/icons/eye-open.svg';
import eyeClosedIcon from '../../assets/icons/eye-closed.svg';

export default function Login() {

  const [passwordHidden, setPasswordHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <img src={handImg} alt="Рука" className={styles.hand} />
        <form className={styles.login} onSubmit={login}>
          <h2 className={styles.login_header}>Вход</h2>
          <div className={styles.login_block}>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" placeholder='Введите свой E-Mail' required onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className={styles.login_block}>
            <label htmlFor="password">Пароль:</label>
            <input type={passwordHidden ? 'password' : 'text'} placeholder='Введите пароль' required onChange={(event) => setPassword(event.target.value)} />
            <img src={passwordHidden ? eyeOpenIcon : eyeClosedIcon} alt="Показать/скрыть пароль" className={styles.eye} onClick={() => setPasswordHidden(!passwordHidden)} />
          </div>
          <button type="submit" className={styles.btn}>Войти</button>
        </form>
      </main>
    </>
  )
}