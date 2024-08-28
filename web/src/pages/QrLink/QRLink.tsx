import styles from './QRLink.module.scss';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function QRLink() {

  const { panelId } = useParams();

  const [cookies] = useCookies(['QUAGGA_TOKEN']);

  const navigate = useNavigate();

  useEffect(() => {

    if (cookies.QUAGGA_TOKEN) {
          const ws = new WebSocket(
            `${import.meta.env.VITE_PUBLIC_BACKEND_WS_URL}/connections/connect`
          );

          ws.onopen = function() {
            fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/sessions/user/${cookies['QUAGGA_TOKEN']}`)
            .then(res => res.json())
            .then(data => {
              if (data.status === "ok") {
                ws.send(JSON.stringify({
                  userId: data.data._id,
                  panelId: panelId
                }))
              }
            })
            .catch(err => {
              console.log(err);
            })
          }

          ws.onmessage = function(event) {
            if (event.data === "User connected") {
              navigate('/panel');
            }
          }
    }

  }, [cookies, panelId]);

  return (
    <main className={styles.link_wrapper}>
      {
        cookies['QUAGGA_TOKEN']
        ?
        <div className={styles.message}>
          <span className={styles.message_text}>Скоро произойдет вход, ожидайте...</span>
        </div>
        :
        <div className={styles.message}>
          <span className={styles.message_text}>Вы не вошли в аккаунт на этом устройстве, войдите и повторите попытку еще раз!</span>
          <Link to={`/login?panelId=${panelId}`} className={styles.login}>Войти в аккаунт</Link>
        </div>
      }
    </main>
  )
}