import User from "../../models/schemas/user.schema";

export default class UserController {
    static async getAllUsers(req: any, res: any): Promise<any> {
        const data = await User.find({});
        return res.json(data);
    }

    static async deleteUser(req: any, res: any): Promise<any> {
        const id = req.params.id;
        await User.deleteOne({_id: id})
        return res.json({
            status: 'success',
            message: 'Delete user successfully'
        });
    }
}
