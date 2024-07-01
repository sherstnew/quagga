import styles from './FileItem.module.scss';
import { IFile } from '../../assets/types/IFile';
import { fileIcons } from '../../assets/data/fileIcons';
import unknownFileIcon from '../../assets/icons/files/unknown-file.svg';

interface IFileItemProps {
  file: IFile,
}

export default function FileItem(props: IFileItemProps) {
  return (
    <div className={styles.file}>
      <img src={props.file.extension.toUpperCase() in fileIcons ? fileIcons[props.file.extension.toUpperCase()]: unknownFileIcon} alt="Файл" className={styles.icon} />
      <header className={styles.name}>{props.file.originalName}</header>
    </div>
  )
}