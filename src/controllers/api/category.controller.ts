import {Request, Response} from "express";
import AppDataSource from "../../database/DataSource";
import {Categories} from "../../entities/Categories";
import {Products} from "../../entities/Products";

class CategoryController {
    static async getCategories(req: Request, res: Response) {
        const categoryRepo = AppDataSource.getRepository(Categories);
        const categories = await categoryRepo.find(
            {
                relations: {
                    products: true,
                }});
        const result: any = {
            status: "success",
            data: categories
        }
        return res.json(result)
    }

    static async store(req: any, res: any) {
        try {
            const {name} = req.body;
            const categoryRepo = AppDataSource.getRepository(Categories);
            const category = new Categories();
            category.name = name;
            await categoryRepo.save(category)
            const result: any = {
                status: "success",
                message: "Create category success!"
            }
            return res.json(result);
        }catch (e: any) {
            const result: any = {
                status: "error",
                message: e.message
            }
            return res.json(result);
        }
    }

    static async getProductByCategoryId(req: any, res: any) {
        const idCate = +req.params.id;
        const productRepo = AppDataSource.getRepository(Products);
        const products = await productRepo.find({
            where: {
                category: {
                    id: idCate
                }
            }
        })
        const result: any = {
            status: "success",
            data: products
        }
        return res.json(result)
    }

    static async update(req: any, res: any) {
        try {
            const idCate = +req.params.id;
            const {name} = req.body;
            const categoryRepo = AppDataSource.getRepository(Categories);
            const categoryUpdate: any = await categoryRepo.findOneBy({
                id: idCate
            });
            categoryUpdate.name = name;
            await categoryRepo.save(categoryUpdate)
            const result: any = {
                status: "success",
                message: "Update category success!"
            }
            return res.json(result);
        }catch (e: any) {
            const result: any = {
                status: "error",
                message: e.message
            }
            return res.json(result);
        }
    }
}

export default CategoryController;
