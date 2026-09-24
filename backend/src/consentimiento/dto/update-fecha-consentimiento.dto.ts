import { IsDateString, IsNotEmpty } from "class-validator";

export class UpdateFechaConsentimientoDto {
  @IsNotEmpty({
    message: 'Debe introducir una fecha de consentimiento'
  })
  @IsDateString({}, {
    message: 'La fecha de consentimiento no es valida.'
  })
  fecha_consentimiento!: string;
}