import styles from './Logo.module.scss';
import skfxlogo from '../../static/logos/skfxlogo.svg';

export function Logo () {
  return (
    <img src={skfxlogo} alt="skfx" className={styles.logo} />
  );
}
