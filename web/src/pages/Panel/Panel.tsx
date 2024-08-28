import styles from './Panel.module.scss';
import Header from '../../blocks/Header/Header';
import Personal from '../../blocks/Personal/Personal';
import Files from './../../blocks/Files/Files';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IUser } from '../../assets/types/IUser';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Panel() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [user, setUser] = useState<IUser>({_id: "", name: "", sessions: [], files: [], email: "", password: "", isConfirmed: false, cardId: ""});

  const [cookies,, removeCookie] = useCookies(['QUAGGA_TOKEN']);

  useEffect(() => {
    if (cookies.QUAGGA_TOKEN) {
      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/sessions/user/${cookies.QUAGGA_TOKEN}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          setUser(data.data);
          if (searchParams.get('panelId')) {
            const ws = new WebSocket(
              `${import.meta.env.VITE_PUBLIC_BACKEND_WS_URL}/connections/connect`
            );
            ws.onopen = function() {
              ws.send(JSON.stringify({
                userId: data.data._id,
                panelId: searchParams.get('panelId')
              }))
            }
          }
        } else {
          logout();
        }
      })
      .catch(err => {
        console.log(err);
        logout();
      })
    } else {
      logout();
    }
  }, [cookies.QUAGGA_TOKEN]);

  function logout() {
    removeCookie('QUAGGA_TOKEN');
    navigate('/login');
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.header}>Панель управления</h1>
        <Personal username={user.name} />
        <Files files={user.files} />
        <button className={styles.btn} onClick={logout}>Выйти из аккаунта</button>
      </main>
    </>
  )
}