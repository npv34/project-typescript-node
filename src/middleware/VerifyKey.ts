import { NextFunction, Request, Response } from "express";

const verifyKey = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.key !== '1212121') {
      let data = {
          message: "Key not found"
      }
      res.status(503).json(data);
  } else {
      next()
  }
}

export default verifyKey;
