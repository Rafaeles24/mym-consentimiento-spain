"use client";

import {
  Consentimiento,
  TipoConsentimiento,
} from "@/types/consentimiento.type";

import FechaEditable from "../fechaEditable/ui";

import styles from "./ui.module.css";


interface Props {
  origen: TipoConsentimiento;
  data: Consentimiento[];
  onFechaUpdated: () => void;
}


export default function TablaConsentimientos({
  origen,
  data,
  onFechaUpdated,
}: Props) {

  if (!data.length) {

    return (
      <div className={styles.empty}>
        No se encontraron registros.
      </div>
    );

  }


  return (
    <div className={styles.wrapper}>

      <table className={styles.table}>

        <thead>

          <tr>
            <th>ID</th>
            <th>Teléfono</th>
            <th>Verificado</th>
            <th>IP</th>
            <th>Fecha consentimiento</th>
          </tr>

        </thead>


        <tbody>

          {data.map(
            (consentimiento) => (

              <tr
                key={consentimiento.id}
              >

                <td>
                  {consentimiento.id}
                </td>

                <td>
                  {
                    consentimiento
                      .num_telefono
                  }
                </td>

                <td>

                  <span
                    className={
                      consentimiento.verificado
                        ? styles.verificado
                        : styles.noVerificado
                    }
                  >
                    {
                      consentimiento.verificado
                        ? "SÍ"
                        : "NO"
                    }
                  </span>

                </td>


                <td>
                  {
                    consentimiento
                      .direccion_ip ??
                    "-"
                  }
                </td>


                <td>

                  <FechaEditable
                    id={
                      consentimiento.id
                    }

                    origen={
                      origen
                    }

                    fecha={
                      consentimiento
                        .fecha_consentimiento
                    }

                    onUpdated={
                      onFechaUpdated
                    }
                  />

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>
  );
}