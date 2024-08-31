import styles from './QrBlock.module.scss';
import QRCode from 'react-qr-code';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: any;
  }
}

export function QrBlock() {
  const [panelId, setPanelId] = useState<string>('');

  const [cardId, setCardId] = useState<string | null>(null);

  window.electron.onSendUID((uid: string) => {
    authByUid(uid);
  });

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
   if (user._id !== '') {
      navigate('/menu');
    }
  }, [user]);

  useEffect(() => {
    if (user._id && user._id !== '') {
      navigate('/menu');
    }
  }, [navigate, user]);

  function authByUid(uid: string) {
    if (user._id === '' && uid !== '' && panelId !== '') {
      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/connections/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardId: String(uid),
          panelId: String(panelId)
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data._id && data._id !== '') {
          setUser(data);
        } else {
          setCardId(uid);
        }
      })
      .catch(err => {
        setCardId(uid);
        console.log(err);
      })
    }
  }

  useEffect(() => {
    if (panelId === '') {
      
      const ws = new WebSocket(
        `${import.meta.env.VITE_PUBLIC_BACKEND_WS_URL}/connections/add`
      );
      // const panId = window.crypto.randomUUID();
      const panId = "123";

      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            panelId: panId,
          })
        );
      };

      ws.onmessage = function (event) {
        if (event.data === "Panel connected") {
          setPanelId(panId);
        } else {
          const data = JSON.parse(event.data);

          fetch(
            `${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/users/${data._id}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data._id !== '') {
                setUser(data);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }, []);

  return (
    <div className={styles.block}>
      <header className={styles.header}>Отсканируйте код</header>
      <span className={styles.subheader}>войдите с помощью сайта</span>
      {panelId !== '' ? (
        <QRCode
          value={`${import.meta.env.VITE_PUBLIC_AUTH_URL}/qr/${panelId}?cardId=${cardId ? cardId : "0"}`}
          className={styles.qr}
        />
      ) : (
        ''
      )}
      <div className={styles.divider}>
        <hr className={styles.line} />
        <span className={styles.or}>или</span>
        <hr className={styles.line} />
      </div>
      <span className={styles.schoolcard}>{cardId ? "Карта не привязана. Чтобы привязать карту, войдите по QR." : "Приложите карту"}</span>
    </div>
  );
}
