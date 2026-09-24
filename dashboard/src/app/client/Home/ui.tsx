"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./ui.module.css";
import { Consentimiento, ConsentimientoFiltros, Pagination, TipoConsentimiento } from "@/types/consentimiento.type";
import { getConsentimiento } from "@/services/consentimiento.service";
import FiltroOrigen from "@/components/filtroOrigen/ui";
import FiltroInput from "@/components/filtroInput/ui";
import FiltroVerificado from "@/components/filtroVerificado/ui";
import TablaConsentimientos from "@/components/tablaConsentimiento/ui";

const filtrosIniciales:
  ConsentimientoFiltros = {

    dni: "",

    num_telefono: "",

    num_contacto: "",

    nombre_completo: "",

    verificado: "",

    direccion_ip: "",

    fechaInicio: "",

    fechaFin: "",
  };


export default function HomeUI() {

  const [origen, setOrigen] =
    useState<TipoConsentimiento>(
      "DEMO_TELECOM",
    );


  const [filtros, setFiltros] =
    useState<ConsentimientoFiltros>(
      filtrosIniciales,
    );


  const [data, setData] =
    useState<Consentimiento[]>([]);


  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });


  const [loading, setLoading] =
    useState(true);


  const [reload, setReload] =
    useState(0);


  function cambiarFiltro(
    campo:
      keyof ConsentimientoFiltros,

    valor: string,
  ) {

    setPagination(
      (prev) => ({
        ...prev,
        page: 1,
      }),
    );

    setFiltros(
      (prev) => ({
        ...prev,
        [campo]: valor,
      }),
    );
  }


  useEffect(() => {

    const timer =
      setTimeout(
        async () => {

          try {

            setLoading(true);

            const response =
              await getConsentimiento(
                origen,

                pagination.page,

                pagination.limit,

                filtros,
              );


            setData(
              response.data,
            );


            setPagination(
              response.pagination,
            );

          } catch (error) {

            console.error(
              error,
            );

          } finally {

            setLoading(false);

          }

        },

        350,
      );


    return () =>
      clearTimeout(timer);

  }, [
    origen,
    filtros,
    pagination.page,
    pagination.limit,
    reload,
  ]);


  function limpiarFiltros() {

    setFiltros(
      filtrosIniciales,
    );

    setPagination(
      (prev) => ({
        ...prev,
        page: 1,
      }),
    );
  }


  return (
    <main className={styles.main}>

      <header className={styles.header}>

        <div>

          <p className={styles.eyebrow}>
            Administración
          </p>

          <h1 className={styles.title}>
            Consentimientos
          </h1>

          <p className={styles.subtitle}>
            Consulta y administra los
            registros de consentimiento.
          </p>

        </div>

        <div
          className={styles.total}
        >
          <span>
            Registros
          </span>

          <strong>
            {pagination.total}
          </strong>
        </div>

      </header>


      <section
        className={
          styles.filters
        }
      >

        <FiltroOrigen
          value={origen}

          onChange={(value) => {

            setOrigen(value);

            setPagination(
              (prev) => ({
                ...prev,
                page: 1,
              }),
            );

          }}
        />


        <FiltroInput
          label="DNI"
          value={filtros.dni}
          placeholder="Buscar DNI"

          onChange={(value) =>
            cambiarFiltro(
              "dni",
              value,
            )
          }
        />


        <FiltroInput
          label="Nombre"
          value={
            filtros.nombre_completo
          }
          placeholder="Buscar nombre"

          onChange={(value) =>
            cambiarFiltro(
              "nombre_completo",
              value,
            )
          }
        />


        <FiltroInput
          label="Teléfono"
          value={
            filtros.num_telefono
          }
          placeholder="Buscar teléfono"

          onChange={(value) =>
            cambiarFiltro(
              "num_telefono",
              value,
            )
          }
        />


        <FiltroInput
          label="Contacto"
          value={
            filtros.num_contacto
          }
          placeholder="Buscar contacto"

          onChange={(value) =>
            cambiarFiltro(
              "num_contacto",
              value,
            )
          }
        />


        <FiltroVerificado
          value={
            filtros.verificado
          }

          onChange={(value) =>
            cambiarFiltro(
              "verificado",
              value,
            )
          }
        />


        <FiltroInput
          label="Dirección IP"
          value={
            filtros.direccion_ip
          }
          placeholder="Buscar IP"

          onChange={(value) =>
            cambiarFiltro(
              "direccion_ip",
              value,
            )
          }
        />


        <FiltroInput
          label="Desde"
          type="date"
          value={
            filtros.fechaInicio
          }

          onChange={(value) =>
            cambiarFiltro(
              "fechaInicio",
              value,
            )
          }
        />


        <FiltroInput
          label="Hasta"
          type="date"
          value={
            filtros.fechaFin
          }

          onChange={(value) =>
            cambiarFiltro(
              "fechaFin",
              value,
            )
          }
        />

      </section>


      <div
        className={
          styles.filterActions
        }
      >

        <button
          className={
            styles.clearButton
          }
          onClick={
            limpiarFiltros
          }
        >
          Limpiar filtros
        </button>

      </div>


      <section
        className={
          styles.tableSection
        }
      >

        {loading ? (

          <div
            className={
              styles.loading
            }
          >
            Cargando registros...
          </div>

        ) : (

          <TablaConsentimientos
            data={data}

            onFechaUpdated={() =>
              setReload(
                (prev) =>
                  prev + 1,
              )
            }
          />

        )}

      </section>


      <footer
        className={
          styles.pagination
        }
      >

        <div
          className={
            styles.pageInfo
          }
        >

          Página{" "}

          <strong>
            {pagination.page}
          </strong>

          {" "}de{" "}

          <strong>
            {
              pagination.totalPages ||
              1
            }
          </strong>

        </div>


        <div
          className={
            styles.paginationButtons
          }
        >

          <button
            disabled={
              !pagination.hasPreviousPage
            }

            onClick={() =>
              setPagination(
                (prev) => ({
                  ...prev,

                  page:
                    prev.page - 1,
                }),
              )
            }
          >
            ← Anterior
          </button>


          <button
            disabled={
              !pagination.hasNextPage
            }

            onClick={() =>
              setPagination(
                (prev) => ({
                  ...prev,

                  page:
                    prev.page + 1,
                }),
              )
            }
          >
            Siguiente →
          </button>

        </div>

      </footer>

    </main>
  );
}