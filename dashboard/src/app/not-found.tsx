import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>

        <h1 className={styles.title}>
          Página no encontrada
        </h1>

        <p className={styles.description}>
          Parece que no es por aquí, prueba con una URL exacta que le brindan.
        </p>
      </div>
    </main>
  );
}