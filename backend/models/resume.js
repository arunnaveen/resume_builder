const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    basicInfo: {
        name: { type: String, required: true },
        roll: { type: String },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        linkedin: { type: String },
        git: { type: String },
        summary: { type: String }
    },
    workInfo: [{
        prevroll: { type: String },
        company: { type: String },
        date: { type: String },
        description: [String]
    }],
    educationInfo: [{
        education: { type: String },
        university: { type: String },
        graduate: { type: String }
    }],
    skillInfo: [String],
    certificateInfo: [String]
});

module.exports = mongoose.model('Resume', resumeSchema);
