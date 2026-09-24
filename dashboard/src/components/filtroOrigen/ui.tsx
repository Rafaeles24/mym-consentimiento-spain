"use client";

import { TipoConsentimiento } from "@/types/consentimiento.type";
import styles from "./ui.module.css";

export default function FiltroOrigen({
  value,
  onChange,
}: {
  value: TipoConsentimiento;
  onChange: (value: TipoConsentimiento ) => void;
}) {

  return (
    <div className={styles.container}>

      <label className={styles.label}>
        Tipo de consentimiento
      </label>

      <select
        className={styles.select}
        value={value}
        onChange={(event) =>
          onChange(
            event.target
              .value as TipoConsentimiento,
          )
        }
      >

        <option value="DEMO_TELECOM">
          Demo Telecom
        </option>

        <option value="ENERGIA_GLOBAL_SPAIN">
          Energía Global Spain
        </option>

      </select>

    </div>
  );
}