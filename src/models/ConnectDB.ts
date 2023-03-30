import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        await mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.USERNAME_PASSWORD}@cluster0.oedlp.mongodb.net/${process.env.DATABASE_NAME}`);
    }
}
