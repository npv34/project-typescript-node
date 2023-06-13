import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "admin",
    password: process.env.DB_PASSWORD,
    database: "eshop-app",
    entities: [
        './dist/entities/*.js'
    ]
})

export default AppDataSource;
