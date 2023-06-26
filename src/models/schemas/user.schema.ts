import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    role: String,
    facebook_id: String,
    google_id: String,
})

const User = mongoose.model("User", userSchema)
export default User;
