import express from "express";
import multer from "multer";
const upload = multer({ dest: 'public/uploads/' })

import CategoryController from "../controllers/api/category.controller";

const apiRouter = express.Router();

apiRouter.get('/categories', CategoryController.getCategories);
apiRouter.post('/categories', CategoryController.store);
apiRouter.put('/categories/:id', CategoryController.update);
apiRouter.get('/categories/:id/products', CategoryController.getProductByCategoryId);

export default apiRouter;