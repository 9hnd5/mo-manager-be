import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindFeeReportArgs {
  @Field((type) => Date, { nullable: true })
  date?: Date;
}
