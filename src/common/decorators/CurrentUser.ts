import { createParamDecorator } from '@nestjs/common';

/* tslint:disable-next-line variable-name */
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
