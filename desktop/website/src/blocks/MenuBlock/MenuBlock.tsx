import styles from './MenuBlock.module.scss';
import presentationIcon from '../../static/logos/presentation.svg';
import exitIcon from '../../static/logos/exit.svg';
import reloadIcon from '../../static/logos/reload.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';

export function MenuBlock () {

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {user, setUser} = useContext(UserContext);

    const exit = () => {
      setUser({
        _id: "",
        name: '',
        sessions: [],
        files: [],
        isConfirmed: false,
        email: '',
        password: '',
        cardId: '',
      });
      navigate('/');
    };

    useEffect(() => {
      if (user._id) {
        reload();
      }
    }, []);

    const reload = () => {
      console.log(user);
      setLoading(true);
      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/users/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
            if (data._id) {
              setUser(data);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }

  return (
    <div className={styles.block}>
      <div className={styles.cards}>
        <header className={styles.header}>Привет, {user.name}!</header>
        <Link to='/files' className={styles.card + " " + styles.card_files}>
            <img src={presentationIcon} alt="" className={styles.icon} />
            <header className={styles.card__header}>Файлы</header>
        </Link>
        <div className={styles.card + " " + styles.card_exit} onClick={exit}>
            <img src={exitIcon} alt="" className={styles.icon} />
            <header className={styles.card__header}>Выйти</header>
        </div>
        <div className={styles.card + " " + styles.card_reload} onClick={reload}>
            <img src={reloadIcon} alt="" className={loading ? styles.icon + ' ' + styles.icon_loading : styles.icon} />
            <header className={styles.card__header}>Обновить</header>
        </div>
      </div>
    </div>
  );
}
