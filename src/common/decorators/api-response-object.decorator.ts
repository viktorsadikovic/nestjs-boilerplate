import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseStatus } from '../enums';

export const ApiResponseObjectDto = <TModel extends Type<any>>(
  model: TModel,
  isArray = false,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          status: {
            type: 'string',
            enum: Object.values(ResponseStatus),
          },
          data: isArray
            ? {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              }
            : {
                type: 'object',
                $ref: getSchemaPath(model),
              },
        },
      },
    }),
  );
};
