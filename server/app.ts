import express, { Response, Request, NextFunction } from 'express';

const app = express();

// Pretty json output
app.set('json spaces', 2);

app.get('/products', (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: true });
});

app.listen(8000, () => {
  console.log('server running');
});
