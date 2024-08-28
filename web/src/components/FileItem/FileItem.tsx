import styles from './FileItem.module.scss';
import { IFile } from '../../assets/types/IFile';
import { fileIcons } from '../../assets/data/fileIcons';
import unknownFileIcon from '../../assets/icons/files/unknown-file.svg';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface IFileItemProps {
  file: IFile,
}

export default function FileItem(props: IFileItemProps) {

  const navigate = useNavigate();

  const [cookies] = useCookies(['QUAGGA_TOKEN']);

  function deleteFile(filename: string) {
    fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/files/${filename}`, {
      method: 'DELETE',
      headers: {
        'Authorization': cookies["QUAGGA_TOKEN"]
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        navigate(0);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
      <div className={styles.file}>
        <img src={props.file.extension.toUpperCase() in fileIcons ? fileIcons[props.file.extension.toUpperCase()]: unknownFileIcon} alt="Файл" className={styles.icon} />
        <header className={styles.name}>{`${props.file.originalName}.${props.file.extension}`}</header>
        <a href={import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL + props.file.path} target="_blank" download={`${props.file.originalName}.${props.file.extension}`}>
          <button className={styles.btn + ' ' + styles.open}>Открыть</button>
        </a>
        <button className={styles.btn + ' ' + styles.delete} onClick={() => deleteFile(props.file.filename)}>Удалить</button>
      </div>
  )
}