import styles from './FilesBlock.module.scss';
import { useEffect, useState } from 'react';
import { Logo } from '../../components/Logo/Logo';
import { Link } from 'react-router-dom';
import fileIcon from '../../static/logos/file.svg';

export function FilesBlock () {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://91.204.253.192:45219/api/panel/files/fetch', {
      headers: {
        'Authorization': 'f60919de81624e7bde76b6a6e6272a82388b39ae9837f682817956ca0754b030'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        setFiles(data);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className={styles.block}>
      <Link to='/menu' className={styles.back}>← Обратно</Link>
      <div className={styles.files}>
        {
          files.map((file: any) => (
            <div className={styles.file}>
              <img src={fileIcon} alt="" className={styles.file__icon} />
              <div className={styles.file__name}>
                {
                  `${file.displayName}.${file.extension}`
                }
              </div>
            </div>
          ))
        }
      </div>
      <Logo />
    </div>
  );
}
