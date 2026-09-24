"use client";

import styles from "./ui.module.css";

export default function FiltroVerificado({
  value,
  onChange,
}: {
  value: string;
  onChange: ( value: string ) => void;
}) {

  return (
    <div className={styles.container}>

      <label className={styles.label}>
        Verificado
      </label>

      <select
        className={styles.select}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      >

        <option value="">
          Todos
        </option>

        <option value="true">
          Verificados
        </option>

        <option value="false">
          No verificados
        </option>

      </select>

    </div>
  );
}