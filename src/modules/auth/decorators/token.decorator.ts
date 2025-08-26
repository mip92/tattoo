import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }

    return null;
  }
);
