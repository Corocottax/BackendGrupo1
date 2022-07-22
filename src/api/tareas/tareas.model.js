const mongoose = require('mongoose')

const TareaSchema = new mongoose.Schema({
    descripcion: { type: String, trim: true, required: true },
    check: { type: Boolean, trim: true, required: true }
}, { timestamps: true, collection: 'tarea'})

const Tarea = mongoose.model('tareas', TareaSchema)
module.exports = Tarea