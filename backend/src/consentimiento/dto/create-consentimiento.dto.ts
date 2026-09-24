import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from "class-validator";

import { TipoConsentimiento } from "@prisma/client";

export class CreateConsentimientoDto {

  @IsString({ message: "El DNI debe ser un texto válido." })
  @IsNotEmpty({ message: "Debe introducir un DNI." })
  @Length(5, 18, { message: "El DNI debe tener entre 5 y 18 caracteres." })
  dni!: string;

  @IsEnum(TipoConsentimiento, {
    message: "El origen no es válido.",
  })
  
  @IsNotEmpty({ message: "El origen es obligatorio." })
  origen!: TipoConsentimiento;

  @IsNumberString({}, {
    message: "El número de teléfono solo puede contener números.",
  })
  @IsNotEmpty({
    message: "Debe introducir un número de teléfono.",
  })
  @Length(9, 9, {
    message: "El número de teléfono debe tener 9 dígitos.",
  })
  num_telefono!: string;

  @IsNumberString({}, {
    message: "El número de contacto solo puede contener números.",
  })
  @IsNotEmpty({
    message: "Debe introducir un número de contacto.",
  })
  @Length(9, 9, {
    message: "El número de contacto debe tener 9 dígitos.",
  })
  num_contacto!: string;

  @IsString({
    message: "El nombre completo debe ser un texto válido.",
  })
  @IsNotEmpty({
    message: "Debe introducir su nombre completo.",
  })
  @Length(1, 255, {
    message: "El nombre completo es demasiado largo.",
  })
  nombre_completo!: string;

  @IsBoolean({
    message: "El campo de verificación no es válido.",
  })
  @IsNotEmpty({
    message: "Debe aceptar la política de privacidad.",
  })
  verificado!: boolean;
}