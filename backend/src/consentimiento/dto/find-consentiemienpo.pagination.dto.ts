import { PartialType } from "@nestjs/mapped-types";
import { IsBooleanString, IsDateString, IsNumberString, IsOptional, isString, IsString } from "class-validator";
import { Pagination } from "src/pagination/dto/pagination.dto";

export class FindConsentimientoQueryDto extends PartialType(Pagination) {
  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsNumberString()
  num_telefono?: string;

  @IsOptional()
  @IsNumberString()
  num_contacto?: string;

  @IsOptional()
  @IsString()
  nombre_completo?: string;

  @IsOptional()
  @IsBooleanString()
  verificado?: string;

  @IsOptional()
  @IsDateString()
  direccion_ip?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  fechaFin?: string;
}