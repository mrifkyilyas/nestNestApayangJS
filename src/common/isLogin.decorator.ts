import { createParamDecorator } from '@nestjs/common';

export const userLogin = createParamDecorator((data, req) => {
  return data ? req.userLogin && req.userLogin[data] : req.userLogin;
});

