import styles from './MenuBlock.module.scss';
import presentationIcon from '../../static/logos/presentation.svg';
import exitIcon from '../../static/logos/exit.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';

export function MenuBlock () {

    const exit = () => {
        fetch('http://91.204.253.192:45219/api/panel/closeConnection', {
            method: 'POST',
            headers: {
                "Authorization": 'f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030'
            }
        })
        .then(() => {
            window.location.href = '/'
        })
        .catch(err => {
            console.log(err);
        })
    };

  return (
    <div className={styles.block}>
      <div className={styles.cards}>
        <Link to='/files' className={styles.card + " " + styles.card_files}>
            <img src={presentationIcon} alt="" className={styles.icon} />
            <header className={styles.card__header}>Открыть файл</header>
        </Link>
        <div className={styles.card + " " + styles.card_exit} onClick={exit}>
            <img src={exitIcon} alt="" className={styles.icon} />
            <header className={styles.card__header}>Выйти</header>
        </div>
      </div>
      <Logo />
    </div>
  );
}
