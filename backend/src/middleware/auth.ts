import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type JwtUser = JwtPayload & {
  sub?: string;
  email?: string;
  id?: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
      token?: string;
    }
  }
}

type JwtCookieOptions = {
  cookieName?: string;
  secret: string;
  algorithms?: jwt.Algorithm[];
  required?: boolean;
};

export function jwtCookieAuth(opts: JwtCookieOptions) {
  const cookieName = opts.cookieName ?? "access_token";
  const algorithms = opts.algorithms ?? ["HS256"];
  const required = opts.required ?? true;

  return function jwtMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token: string | undefined = (req as any).cookies?.[cookieName];
    if (!token) {
      if (!required) return next();
      return res.status(401).json({ error: "Missing auth token" }).send();
    }

    try {
      const decoded = jwt.verify(token, opts.secret, { algorithms }) as JwtUser;
      req.user = decoded;
      req.token = token;
      return next();
    } catch (err: any) {
      if (!required) return next();
      const msg =
        err?.name === "TokenExpiredError"
          ? "Token expired"
          : err?.name === "JsonWebTokenError"
            ? "Invalid token"
            : "Unauthorized";
      return res.status(401).json({ error: msg }).send();
    }
  };
}
