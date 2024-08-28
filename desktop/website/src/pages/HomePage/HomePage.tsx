import styles from "./HomePage.module.scss";
import { useParams } from "react-router-dom";
import { QrBlock } from "../../blocks/QrBlock/QrBlock";
import { MenuBlock } from "../../blocks/MenuBlock/MenuBlock";
import { FilesBlock } from '../../blocks/FilesBlock/FIlesBlock';
import { useEffect, useState } from 'react';
import { IUser } from '../../static/types/IUser';
import { UserContext } from '../../contexts/UserContext';

export function HomePage() {
  const { block } = useParams();
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    if (block !== undefined) {
      setOpened(true);
    }
  }, [block]);

  const [user, setUser] = useState<IUser>({
    _id: '',
    name: '',
    sessions: [],
    files: [],
    isConfirmed: false,
    email: '',
    password: '',
    cardId: '',
  });

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <main className={styles.main}>
        {opened ? (
          block === "menu" ? (
            <MenuBlock />
          ) : block === "files" ? (
            <FilesBlock />
          ) : (
            <QrBlock />
          )
        ) : (
          ""
        )}
      </main>
    </UserContext.Provider>
  );
}
