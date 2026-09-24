import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, ParseEnumPipe, Query } from '@nestjs/common';
import { ConsentimientoService } from './consentimiento.service';
import { ProxyIpService } from 'src/proxy-ip/proxy-ip.service';
import { CreateConsentimientoDto } from './dto/create-consentimiento.dto';
import { TipoConsentimiento } from '@prisma/client';
import { FindConsentimientoQueryDto } from './dto/find-consentiemienpo.pagination.dto';
import { UpdateFechaConsentimientoDto } from './dto/update-fecha-consentimiento.dto';

@Controller('consentimiento')
export class ConsentimientoController {
  constructor(
    private readonly consentimientoService: ConsentimientoService,
    private readonly proxyIpService: ProxyIpService
  ) {}

  @Get(':origen')
  findAll(
    @Param('origen', new ParseEnumPipe(TipoConsentimiento)) origen: TipoConsentimiento,
    @Query() query: FindConsentimientoQueryDto
  ) {
    return this.consentimientoService.findConsentimientos(origen, query);
  }

  @Get(':origen/:id')
  getConsentimiento(
    @Param('origen', new ParseEnumPipe(TipoConsentimiento)) origen: TipoConsentimiento,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.consentimientoService.findConsentimiento(id, origen);
  }

  @Post('/registrar')
  create(
    @Req() req: Request,
    @Body() dto: CreateConsentimientoDto
  ) {
    const ip = this.proxyIpService.getIpClient(req);
    return this.consentimientoService.create(dto, ip);
  }

  @Patch(':origen/:id/fecha')
  updateFechaConsentimiento(
    @Param('origen', new ParseEnumPipe(TipoConsentimiento)) origen: TipoConsentimiento,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFechaConsentimientoDto,
  ) {
    return this.consentimientoService.updateFechaConsentimiento(id, origen, dto.fecha_consentimiento);
  }
}
