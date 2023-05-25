import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class ExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      console.log(exception.getResponse());
      const newException = new GraphQLError(exception.message, {
        extensions: {
          code: exception.getStatus(),
          originalError: exception.getResponse(),
          stacktrace: exception.stack,
        },
      });
      return newException;
    }
    return exception;
  }
}
