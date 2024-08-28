import styles from './Files.module.scss';
import FileItem from '../../components/FileItem/FileItem';
import { IFile } from '../../assets/types/IFile';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface IFilesProps {
  files: IFile[]
}

export default function Files(props: IFilesProps) {

  const [cookies] = useCookies(['QUAGGA_TOKEN']);

  const navigate = useNavigate();

  function uploadFiles(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files) {

      const formData = new FormData();

      const file = evt.target.files[0];

      formData.append('file', file);
      formData.append('name', file.name.split('.')[0]);
      formData.append('extension', file.name.split('.')[1]);

      fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_HTTP_URL}/files`, {
        method: 'POST',
        headers: {
          'Authorization': cookies["QUAGGA_TOKEN"]
        },
        body: formData
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
  }

  return (
    <section className={styles.files}>
      <h2 className={styles.header}>Файлы</h2>
      <div className={styles.files_container}>
        {
          props.files.map((file, index) => (
            <FileItem file={file} key={index} />
          ))
        }
      </div>
      <div className={styles.input_container}>
        <label htmlFor="uploadFile" className={styles.file_input}>Загрузить файл</label>
        <input type="file" id='uploadFile' style={{display: 'none'}} onChange={(evt) => uploadFiles(evt)} />
      </div>
    </section>
  )
}