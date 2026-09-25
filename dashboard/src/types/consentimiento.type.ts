export type TipoConsentimiento =
  | "DEMO_TELECOM"
  | "ENERGIA_GLOBAL_SPAIN";


export interface Consentimiento {

  id: number;

  dni: string;

  num_telefono: string;

  num_contacto: string;

  nombre_completo: string;

  verificado: boolean;

  direccion_ip: string;

  fecha_consentimiento: string;

}


export interface ConsentimientoFiltros {

  dni: string;

  num_telefono: string;

  num_contacto: string;

  nombre_completo: string;

  verificado: string;

  direccion_ip: string;

  fechaInicio: string;

  fechaFin: string;

}


export interface Pagination {

  page: number;

  limit: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

}


export interface ConsentimientoResponse {

  data: Consentimiento[];

  pagination: Pagination;

}