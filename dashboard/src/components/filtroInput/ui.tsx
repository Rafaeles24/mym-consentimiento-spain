"use client";

import styles from "./ui.module.css";


export default function FiltroInput({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  type?: "text" | "date";
  onChange: ( value: string ) => void;
}) {

  return (
    <div className={styles.container}>

      <label className={styles.label}>
        {label}
      </label>

      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

    </div>
  );
}