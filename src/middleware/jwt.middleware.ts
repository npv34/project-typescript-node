import jwt from "jsonwebtoken";
import JWTConfig from "../config/jwt.config";

function verifyJWT(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    // tslint:disable-next-line:no-console
    console.log(authHeader)
    if (!authHeader) {
        res.json({
            status: "error",
            message: "Token is required"
        })
    }

    const token = authHeader.split(" ")[1]
    // verify token co dung hay khong
    jwt.verify(token, JWTConfig.accessTokenSecret, (err: any, decoded: any) => {
        // neu token khong verify dung
        if (err) {
            res.json({
                status: "error",
                message: "Token invalid",
            })
        }
        req.currenUserLogin = decoded;
        // neu token dung thi next
        next()
    });
}

export  default verifyJWT;
