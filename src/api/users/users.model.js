const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { setError } = require('../../utils/error/error')

const userSchema = new mongoose.Schema({
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    tareas: [{ type: mongoose.Schema.Types.ObjectId, ref:"tareas", trim: true}]
}, { timestamps: true, collection: 'users'})


userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
const User = mongoose.model('users', userSchema)
module.exports = User