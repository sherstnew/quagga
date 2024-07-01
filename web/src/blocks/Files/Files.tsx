import styles from './Files.module.scss';
import { files } from '../../assets/data/files';
import FileItem from '../../components/FileItem/FileItem';

export default function Files() {
  return (
    <section className={styles.files}>
      <h2 className={styles.header}>Файлы</h2>
      <div className={styles.files_container}>
        {
          files.map((file, index) => (
            <FileItem file={file} key={index} />
          ))
        }
      </div>
      <div className={styles.input_container}>
        <label htmlFor="uploadFile" className={styles.file_input}>Загрузить файл</label>
        <input type="file" id='uploadFile' style={{display: 'none'}} />
      </div>
    </section>
  )
}