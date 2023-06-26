import User from "../../models/schemas/user.schema";
import jwt from "jsonwebtoken"
import JWTConfig from "../../config/jwt.config";

export class LoginController {
    static async login(req: any, res: any) {
        const {username, password} = req.body;
        // tim user trong databas
        const user = await User.find({username, password});
        // tslint:disable-next-line:no-console
        console.log(user);
        if (user.length === 0) {
            const data = {
                status: 'error',
                message: 'Account does not exist'
            }
            return res.json(data)
        } else {
            // Generate an access token
            const payload = {
                username: user[0].username,
                role: user[0].role
            }

            const accessToken = jwt.sign(payload, JWTConfig.accessTokenSecret);
            res.json({accessToken});
        }

    }
}
