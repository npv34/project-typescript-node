import express from "express";
import verifyKey from "../middleware/VerifyKey";
import checkPermission from "../middleware/CheckPermission";

const router = express.Router();
let users = [
    {
        id: 1,
        name: "quan",
        email: "quan@gmail.com",
        address: "123 HN"
    },
    {
        id: 2,
        name: "quan",
        email: "quan@gmail.com",
        address: "123 HN"
    }
];

router.get('/users',verifyKey, ((req, res, next) => {
    res.status(200).json(users);
}))

router.get('/users/:id',verifyKey, checkPermission, ((req, res, next) => {
    let id: number = +req.params.id;
    let user = users.filter(item => {
        return item.id === id;
    })
    res.status(200).json(user);
}))

router.delete('/users/:id/', verifyKey, checkPermission, ((req, res, next) => {
        let id: number = +req.params.id;
        let indexUser = findById(id);
        if (indexUser == -1) {
            let data = {
                message: "not found"
            }
            res.status(404).json(data);
        } else {
            users.splice(indexUser, 1);
            let data = {
                message: "Delete successfully",
                users: users
            }
            res.status(200).json(data);
        }
}))

const findById = (id: number) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return i;
        }
    }
    return -1;
}

export default router;
