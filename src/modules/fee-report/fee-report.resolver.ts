import { Args, Query, Resolver } from '@nestjs/graphql';
import { FeeReportService } from './fee-report.service';
import { FindFeeReportRes } from './dto/find-fee-report.res';
import { FindFeeReportArgs } from './dto/find-fee-report.args';

@Resolver((of) => FindFeeReportRes)
export class FeeReportResolver {
  constructor(private feeReportService: FeeReportService) {}

  @Query((returns) => FindFeeReportRes)
  feeReport(@Args() args: FindFeeReportArgs) {
    return this.feeReportService.find(args);
  }
}
