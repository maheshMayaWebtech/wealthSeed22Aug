import mongoose from "mongoose";


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

let User = mongoose.model("user", userSchema);

export default User;