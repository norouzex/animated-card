import Image from "next/image";
import styles from "./page.module.css";
import Cart from "../components/Card";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Cart></Cart>
      </div>
    </main>
  );
}
