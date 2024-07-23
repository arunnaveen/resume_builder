const express = require('express');
const router = express.Router();
const {postResumeData, updateResumeData, getResumeData} = require('../controllers/resumeController');
const {protect} = require('../middleware/authMiddleware');

router.post('/',protect,postResumeData);

router.get('/:id',protect,getResumeData);

router.put('/:id',protect,updateResumeData);

module.exports = router;

