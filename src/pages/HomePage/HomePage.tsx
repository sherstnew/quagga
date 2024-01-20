import styles from "./HomePage.module.scss";
import quaggaLogo from "../../static/logos/quagga.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { QrBlock } from "../../blocks/QrBlock/QrBlock";
import { MenuBlock } from "../../blocks/MenuBlock/MenuBlock";
import { FilesBlock } from '../../blocks/FilesBlock/FIlesBlock';

export function HomePage() {
  const { block } = useParams();
  const [opened, setOpened] = useState(false);

  console.log(block);

  return (
    <main className={styles.main}>
      <img
        src={quaggaLogo}
        alt=""
        className={styles.open}
        onClick={() => setOpened(!opened)}
      />
      {opened ? (
        block === "menu" ? (
          <MenuBlock />
        ) : block === "files" ? (
          <FilesBlock />
        ) : (
          // <QrBlock />
          <MenuBlock />
        )
      ) : (
        ""
      )}
    </main>
  );
}
