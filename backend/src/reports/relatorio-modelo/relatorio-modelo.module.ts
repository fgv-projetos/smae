import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ReportsModule } from '../relatorios/reports.module';
import { RelatorioModeloController } from './relatorio-modelo.controller';
import { RelatorioModeloService } from './relatorio-modelo.service';

/**
 * CRUD dos modelos (templates) de saída de relatório + descoberta de colunas.
 *
 * A descoberta de colunas tem dois modos. O estático vem do registro de decoradores
 * (`@ReportRows`/`@ReportColumn`) e devolve a união das variantes da fonte. O preciso passa
 * pelo `ReportsService.describeSchemaDaFonte`, que roda o mesmo `describeSchema` da execução
 * e por isso depende dos services de relatório — daí a dependência do `ReportsModule`.
 *
 * `forwardRef` por precaução: o `ReportsModule` não importa este módulo hoje, mas ele usa
 * `forwardRef` em todos os seus imports, e um import futuro fecharia o ciclo em silêncio.
 */
@Module({
    imports: [PrismaModule, forwardRef(() => ReportsModule)],
    controllers: [RelatorioModeloController],
    providers: [RelatorioModeloService],
    exports: [RelatorioModeloService],
})
export class RelatorioModeloModule {}
