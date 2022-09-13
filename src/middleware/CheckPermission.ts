import { NextFunction,  Request, Response } from "express";

const checkPermission = (req: Request, res: Response, next: NextFunction) => {
  let role = 'user';
  if (role !== 'admin') {
      res.status(503).json({message: 'Not authorized'})
  } else {
      next();
  }
}

export default checkPermission;
