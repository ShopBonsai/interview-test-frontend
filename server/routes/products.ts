import { Response, Request, NextFunction } from 'express';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: true });
};
