const Resume = require('../models/resume'); // Assuming you have a Resume model

const postResumeData = async (req, res) => {
  try {
    const newResume = new Resume({
      user: req.user.id,
      ...req.body
    });
    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getResumeData = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateResumeData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResume = await Resume.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedResume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { postResumeData, getResumeData, updateResumeData };
