"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./ui.module.css";
import { TipoConsentimiento } from "@/types/consentimiento.type";
import { actualizarFechaConsentimiento } from "@/services/consentimiento.service";

function isoToInputDate(
  iso: string,
) {

  const date = new Date(iso);

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getDate(),
    ).padStart(2, "0");

  const hours =
    String(
      date.getHours(),
    ).padStart(2, "0");

  const minutes =
    String(
      date.getMinutes(),
    ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export default function FechaEditable({
  id,
  origen,
  fecha,
  onUpdated,
}: {
  id: number;
  origen: TipoConsentimiento;
  fecha: string;
  onUpdated: () => void;
}) {

  const [editando, setEditando] =
    useState(false);

  const [valor, setValor] =
    useState(
      isoToInputDate(fecha),
    );

  const [guardando, setGuardando] =
    useState(false);


  useEffect(() => {

    setValor(
      isoToInputDate(fecha),
    );

  }, [fecha]);


  async function guardar() {

    try {

      setGuardando(true);

      const fechaIso =
        new Date(valor).toISOString();

      await actualizarFechaConsentimiento(
        origen,
        id,
        fechaIso,
      );

      setEditando(false);

      onUpdated();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Error al actualizar.",
      );

    } finally {

      setGuardando(false);

    }
  }


  if (!editando) {

    return (
      <div className={styles.view}>

        <span>
          {new Date(
            fecha,
          ).toLocaleString()}
        </span>

        <button
          className={styles.editButton}
          onClick={() =>
            setEditando(true)
          }
        >
          Editar
        </button>

      </div>
    );
  }


  return (
    <div className={styles.editor}>

      <input
        className={styles.input}
        type="datetime-local"
        value={valor}
        onChange={(event) =>
          setValor(
            event.target.value,
          )
        }
      />

      <button
        className={styles.saveButton}
        disabled={guardando}
        onClick={guardar}
      >
        {guardando
          ? "..."
          : "Guardar"}
      </button>

      <button
        className={styles.cancelButton}
        disabled={guardando}
        onClick={() => {

          setValor(
            isoToInputDate(fecha),
          );

          setEditando(false);

        }}
      >
        ×
      </button>

    </div>
  );
}