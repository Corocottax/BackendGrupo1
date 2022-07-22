const Tarea = require("./tareas.model");
const { setError } = require("../../utils/error/error");

const postNewTarea = async (req, res, next) => {
  try {
    const newTarea = new Tarea(req.body);
    if (req.file) {
      newTarea.photo = req.file.path;
    }
    const tareaDB = await newTarea.save();
    return res.status(201).json(tareaDB);
  } catch (error) {
    return next(error);
  }
};

const getAllTareas = async (req, res, next) => {
  try {
    const tareaDB = await Tarea.find();
    return res.status(200).json(tareaDB);
  } catch (error) {
    return next(setError(404, "Tarea server fail"));
  }
};

const getTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tareaDB = await Tarea.findById(id);
    if (!tareaDB) {
      return next(setError(404, "Tarea not found"));
    }
    return res.status(200).json(tareaDB);
  } catch (error) {
    return next(setError(404, "Tarea server fail"));
  }
};

const patchTarea = async (req, res, next) => {
    try {
      const { id } = req.params;
      const patchTarea = new Tarea(req.body);
      patchTarea._id = id;
      const tareaDB = await Tarea.findById(id);
      const TareaUpdated = await Tarea.findByIdAndUpdate(id, patchTarea);
      if (!tareaDB) {
        return next(setError(404, "Tarea not found"));
      }
      return res.status(200).json({ new: patchTarea, old: TareaUpdated });
    } catch (error) {
      return next(setError(500, "Tarea cant be replaced"));
    }
  };

const deleteTarea = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tareaDB = await Tarea.findByIdAndDelete(id);
    if (!tareaDB) {
      return next(setError(404, "Error borrando Tarea"));
    }
    return res.status(200).json(tareaDB);
  } catch (error) {
    return next(setError(500, "Tarea no se puede borrar"));
  }
};

module.exports = {
  postNewTarea,
  getAllTareas,
  deleteTarea,
  getTarea,
  patchTarea
};