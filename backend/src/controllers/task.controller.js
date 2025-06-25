import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {

    const userId = req.userId;
    const tasks = await Task.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    if(!tasks) return res.json({success:false,message:"No Task Available"});
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks", error: error.message });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const userId = req.userId;

    const isSameTaskNameExists = await Task.findOne({ where: { title } });
    if (isSameTaskNameExists) {
      return res.status(409).json({
        success: false,
        message: `${title} already exists. Choose different title!`,
      });
    }

    const task = await Task.create({ title, status, userId });
    res.status(201).json({ success: true, message: "Task created successfully", data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating task", error: error.message });
  }
};

