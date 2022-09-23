import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        await mongoose.connect('mongodb+srv://admin:FAX2PJ67_peGZFg@cluster0.oedlp.mongodb.net/library');
    }
}
