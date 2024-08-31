import styles from './FilesBlock.module.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import fileIcon from '../../static/logos/file.svg';
import { fileIcons }from '../../static/data/icons';
import { IFile } from '../../static/types/IFile';
import { UserContext } from '../../contexts/UserContext';


declare global {
  interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      electron: any;
  }
}

export function FilesBlock () {

  const {user} = useContext(UserContext);

  return (
    <div className={styles.block}>
      <Link to='/menu' className={styles.back}>← Обратно</Link>
      <div className={styles.files}>
        {
          user.files.map((file: IFile, index: number) => (
            <div key={index} className={styles.file} onClick={() => {
              window.electron.openFile(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}${file.path}`);
            }}>
              <img src={fileIcons[file.extension.toUpperCase()] || fileIcon} alt="" className={styles.file__icon} />
              <div className={styles.file__name}>
                {
                  `${file.originalName}.${file.extension}`
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
