import { createParamDecorator } from '@nestjs/common';

export const isLogin = createParamDecorator((data, req) => {
  return data ? req.isLogin && req.isLogin[data] : req.isLogin;
});

