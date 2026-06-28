const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
exports.getTasks = async (req, res) => {
  try {
    let query = {};
    
    // Filtering by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Sorting
    let sortObj = { createdAt: -1 }; // default sort by newest
    if (req.query.sortBy) {
      if (req.query.sortBy === 'oldest') sortObj = { createdAt: 1 };
      if (req.query.sortBy === 'priorityDesc') sortObj = { priority: -1 }; // Needs custom mapping if strict sorting needed, but for simplicity we rely on string sort or just dates. Let's do string sort for priority: High -> Low. Actually, enum string sort might be weird. Let's stick to date sorting for now and let frontend handle advanced sorting if needed, or implement simple sort.
    }

    const tasks = await Task.find(query).sort(sortObj);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Public
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'No task found' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'No task found' });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
