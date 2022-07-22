const TareaRoutes = require('express').Router();
const { postNewTarea, getAllTareas, getTarea, patchTarea, deleteTarea } = require('./tareas.controller');
const { isAuth }= require("../../middlewares/auth");

TareaRoutes.get('/', getAllTareas);
TareaRoutes.get('/:id', getTarea);
TareaRoutes.post('/', [isAuth], postNewTarea);
TareaRoutes.patch('/:id', [isAuth], patchTarea);
TareaRoutes.delete('/:id', [isAuth], deleteTarea);

module.exports = TareaRoutes