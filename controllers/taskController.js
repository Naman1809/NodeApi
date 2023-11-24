import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import { Task } from "../models/taskmodel.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const Tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      Tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);
    // const{title, description} = req.body;
    const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
    });
    task.save();
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
    });
  } catch (error) {
    next(error);
  }
};
