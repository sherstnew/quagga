import styles from './Login.module.scss';
import Header from '../../blocks/Header/Header';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import handImg from '../../assets/images/hand.webp';
import eyeOpenIcon from '../../assets/icons/eye-open.svg';
import eyeClosedIcon from '../../assets/icons/eye-closed.svg';

export default function Login() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [, setCookie] = useCookies(['QUAGGA_TOKEN']);

  const [passwordHidden, setPasswordHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          setCookie('QUAGGA_TOKEN', data.data.token);
          navigate(`/panel${searchParams.get('panelId') ? "?panelId=" + searchParams.get('panelId') : ""}`);
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <img src={handImg} alt="Рука" className={styles.hand} />
        <form className={styles.login} onSubmit={login}>
          <h2 className={styles.login_header}>Вход / Регистрация</h2>
          <div className={styles.login_block}>
            <label htmlFor="email">E-Mail:</label>
            <input id="email" type="email" placeholder='Введите свой E-Mail' required onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className={styles.login_block}>
            <label htmlFor="password">Пароль:</label>
            <input id="password" type={passwordHidden ? 'password' : 'text'} placeholder='Введите пароль' required onChange={(event) => setPassword(event.target.value)} />
            <img src={passwordHidden ? eyeOpenIcon : eyeClosedIcon} alt="Показать/скрыть пароль" className={styles.eye} onClick={() => setPasswordHidden(!passwordHidden)} />
          </div>
          <button type="submit" className={styles.btn}>Войти</button>
        </form>
      </main>
    </>
  )
}