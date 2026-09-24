import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  Prisma,
  TipoConsentimiento,
} from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { FindConsentimientoQueryDto } from './dto/find-consentiemienpo.pagination.dto';

@Injectable()
export class ConsentimientoService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findConsentimientos(
    origen: TipoConsentimiento,
    query: FindConsentimientoQueryDto,
  ) {
    try {

      const {
        page = 1,
        limit = 20,

        dni,
        num_telefono,
        num_contacto,
        nombre_completo,
        verificado,
        direccion_ip,

        fechaInicio,
        fechaFin,
      } = query;


      const skip = (page - 1) * limit;


      const where: Prisma.ConsentimientoWhereInput = {
        tipo_consentimiento: origen,
      };


      /**
       * DNI
       */
      if (dni) {
        where.dni = {
          contains: dni,
        };
      }


      /**
       * Teléfono principal
       */
      if (num_telefono) {
        where.num_telefono = {
          contains: num_telefono,
        };
      }


      /**
       * Número de contacto
       */
      if (num_contacto) {
        where.num_contacto = {
          contains: num_contacto,
        };
      }


      /**
       * Nombre
       */
      if (nombre_completo) {
        where.nombre_completo = {
          contains: nombre_completo,
        };
      }


      /**
       * Verificado
       */
      if (verificado !== undefined) {
        where.verificado =
          verificado === 'true';
      }


      /**
       * Dirección IP
       */
      if (direccion_ip) {
        where.direccion_ip = {
          contains: direccion_ip,
        };
      }


      /**
       * Fechas
       */
      if (fechaInicio || fechaFin) {

        where.fecha_consentimiento = {};

        if (fechaInicio) {
          where.fecha_consentimiento.gte =
            new Date(fechaInicio);
        }

        if (fechaFin) {
          const fin = new Date(fechaFin);

          /*
           * Si solamente llega:
           *
           * 2026-09-23
           *
           * incluimos todo ese día.
           */
          if (
            fechaFin.length === 10
          ) {
            fin.setUTCHours(
              23,
              59,
              59,
              999,
            );
          }

          where.fecha_consentimiento.lte =
            fin;
        }
      }


      const [data, total] =
        await this.prisma.$transaction([

          this.prisma.consentimiento.findMany({
            where,

            skip,
            take: limit,

            orderBy: {
              fecha_consentimiento: 'desc',
            },

            select: {
              id: true,

              tipo_consentimiento: true,

              dni: true,

              num_telefono: true,

              num_contacto: true,

              nombre_completo: true,

              verificado: true,

              direccion_ip: true,

              fecha_consentimiento: true,
            },
          }),


          this.prisma.consentimiento.count({
            where,
          }),

        ]);


      const totalPages =
        Math.ceil(total / limit);


      return {
        data,

        pagination: {
          page,
          limit,

          total,

          totalPages,

          hasNextPage:
            page < totalPages,

          hasPreviousPage:
            page > 1,
        },

        filters: {
          dni: dni ?? null,

          num_telefono:
            num_telefono ?? null,

          num_contacto:
            num_contacto ?? null,

          nombre_completo:
            nombre_completo ?? null,

          verificado:
            verificado ?? null,

          direccion_ip:
            direccion_ip ?? null,

          fechaInicio:
            fechaInicio ?? null,

          fechaFin:
            fechaFin ?? null,
        },
      };

    } catch (error) {

      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al obtener los consentimientos.',
      );
    }
  }

  /**
   * Busca un consentimiento por ID y tipo.
   */
  async findConsentimiento(
    id: number,
    origen: TipoConsentimiento,
  ) {
    try {

      const consentimiento =
        await this.prisma.consentimiento.findFirst({
          where: {
            id,
            tipo_consentimiento: origen,
          },

          select: {
            id: true,
            dni: true,
            num_telefono: true,
            num_contacto: true,
            nombre_completo: true,
            verificado: true,
            direccion_ip: true,
            fecha_consentimiento: true,
            tipo_consentimiento: true,
          },
        });

      if (!consentimiento) {
        throw new NotFoundException(
          'No se encontró el consentimiento.',
        );
      }

      return consentimiento;

    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al buscar el consentimiento.',
      );
    }
  }


  /**
   * Busca un consentimiento por DNI y tipo.
   */
  async findConsentimientoPorDni(
    dni: string,
    origen: TipoConsentimiento,
  ) {
    try {

      return await this.prisma.consentimiento.findFirst({
        where: {
          dni,
          tipo_consentimiento: origen,
        },
      });

    } catch (error) {

      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al buscar el consentimiento.',
      );
    }
  }


  /**
   * Crea un nuevo consentimiento.
   */
  async create(
    dto: CreateConsentimientoDto,
    ip: string,
  ) {
    try {

      /*
       * Validamos que haya aceptado
       * los términos y condiciones.
       */
      if (dto.verificado !== true) {
        throw new UnauthorizedException(
          'Debes aceptar los términos y condiciones de tu consentimiento.',
        );
      }


      /*
       * Verificamos si el DNI ya existe
       * para el mismo tipo de consentimiento.
       */
      const existeDni =
        await this.prisma.consentimiento.findFirst({
          where: {
            dni: dto.dni,
            tipo_consentimiento: dto.origen,
          },
        });

      if (existeDni) {
        throw new BadRequestException(
          'Ya existe un registro asociado al DNI introducido.',
        );
      }


      /*
       * Verificamos si el número de teléfono
       * ya existe para el mismo tipo.
       */
      const existeTelefono =
        await this.prisma.consentimiento.findFirst({
          where: {
            num_telefono: dto.num_telefono,
            tipo_consentimiento: dto.origen,
          },
        });

      if (existeTelefono) {
        throw new BadRequestException(
          'Ya existe un registro asociado al número de teléfono introducido.',
        );
      }


      /*
       * Creamos el consentimiento.
       */
      const consentimiento =
        await this.prisma.consentimiento.create({
          data: {
            tipo_consentimiento: dto.origen,

            dni: dto.dni,

            num_telefono: dto.num_telefono,

            num_contacto: dto.num_contacto,

            nombre_completo: dto.nombre_completo,

            verificado: dto.verificado,

            direccion_ip: ip,
          },
        });


      return {
        id: consentimiento.id,
        ip: consentimiento.direccion_ip,
        tipo: consentimiento.tipo_consentimiento,
        statusCode: 201,
      };

    } catch (error) {

      /*
       * Dejamos pasar los errores
       * que nosotros mismos generamos.
       */
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }


      /*
       * Prisma P2002:
       * violación de índice UNIQUE.
       */
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          'Ya existe un consentimiento con los datos introducidos.',
        );
      }


      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al crear el consentimiento.',
      );
    }
  }

  async updateFechaConsentimiento(
    id: number,
    origen: TipoConsentimiento,
    fechaConsentimiento: string,
  ) {
    try {
      const consentimiento = await this.prisma.consentimiento.findFirst({
        where: {
          id, tipo_consentimiento: origen
        },
        select: {
          id: true
        },
      });

      if (!consentimiento) {
        throw new NotFoundException(`No se encontro el consentimiento`);
      }

      const fecha = new Date(fechaConsentimiento);

      if (Number.isNaN(fecha.getTime())) {
        throw new BadRequestException('La fecha de consentimiento no es valida.')
      }

      const actualizado = await this.prisma.consentimiento.update({
        where: { id },
        data: {
          fecha_consentimiento: fecha
        },
        select: {
          id: true,
          tipo_consentimiento: true,
          dni: true,
          nombre_completo: true,
          fecha_consentimiento: true
        },
      });

      return {
        message: `Fecha de consentimiento actualizado correctamente`,
        data: actualizado
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
        
      throw new InternalServerErrorException(
        'Ocurrió un error inesperado al actualizar la fecha de consentimiento.',
      );    
    }
  }
}