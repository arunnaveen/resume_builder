import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { setResumeId } from '../../features/resume/resumeSlice';

const Resume_maker = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const _id = useSelector((state) => state.resume.resumeId);

    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setToken(storedUser.token);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const config = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${token}`
        }
    }), [token]);

    const [formData, setFormData] = useState({
        basicInfo: {
            name: '',
            roll: '',
            email: '',
            phone: '',
            linkedin: '',
            git: '',
            summary: ''
        },
        workInfo: [
            { prevroll: '', company: '', date: '', description: ['', '', ''] },
            { prevroll: '', company: '', date: '', description: ['', '', ''] }
        ],
        educationInfo: [
            { education: '', university: '', graduate: '' },
        ],
        skillInfo: ['', '', '', '', ''],
        certificateInfo: ['', '', '']
    });

    useEffect(() => {
        // Fetch existing resume data if _id is set
        if (_id) {
            axios.get(`http://localhost:8001/api/resume/${_id}`, config)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((error) => {
                    console.error('Failed to fetch resume data:', error);
                });
        }
    }, [_id, config]);

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value
            }
        }));
    };

    const handleArrayChange = (e, section, index) => {
        const { name, value } = e.target;
        const updatedArray = [...formData[section]];
        updatedArray[index] = {
            ...updatedArray[index],
            [name]: value
        };
        setFormData(prevData => ({
            ...prevData,
            [section]: updatedArray
        }));
    };

    const handleNestedArrayChange = (e, section, index, field, subIndex) => {
        const { value } = e.target;
        const updatedArray = [...formData[section]];
        const updatedField = [...updatedArray[index][field]];
        updatedField[subIndex] = value;
        updatedArray[index] = {
            ...updatedArray[index],
            [field]: updatedField
        };
        setFormData(prevData => ({
            ...prevData,
            [section]: updatedArray
        }));
    };

    const handleSkillChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...formData.skillInfo];
        updatedSkills[index] = value;
        setFormData(prevData => ({
            ...prevData,
            skillInfo: updatedSkills
        }));
    };

    const handleCertificateChange = (e, index) => {
        const { value } = e.target;
        const updatedCertificates = [...formData.certificateInfo];
        updatedCertificates[index] = value;
        setFormData(prevData => ({
            ...prevData,
            certificateInfo: updatedCertificates
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (_id) {
                response = await axios.put(`http://localhost:8001/api/resume/${_id}`, formData, config);
            } else {
                response = await axios.post(`http://localhost:8001/api/resume`, formData, config);
                dispatch(setResumeId(response.data._id));
            }

            const templateResponse = await axios.post('http://localhost:8001/api/resume/template', { id: Number(id), _id: response.data._id });
            const { redirectUrl } = templateResponse.data;

            if (redirectUrl) {
                navigate(redirectUrl);
            }
            console.log(formData);
        } catch (err) {
            console.error('Failed to submit form', err);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar-brand text-white">Resume Builder</div>
                <div className="nav navbar-nav">
                    <Link to='/dashboard'><li className="text-white">Template</li></Link>
                </div>
                <div className="nav navbar-nav navbar-right">
                    <button className="btn btn-light" onClick={handleLogout}>Log Out</button>
                </div>
            </nav>
            <div className="text-dark text-center fs-1">Fill Your Details Here</div>
            <form className="row" onSubmit={onSubmit}>
                {/* Basic Info */}
                <div className="col-md-4 mb-3">
                    <label htmlFor="name" className="text-light">Name</label>
                    <input className="form-control" id="name" name="name" value={formData.basicInfo.name} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Please Enter Your Name" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="roll" className="text-light">Roll</label>
                    <input className="form-control" id="roll" name="roll" value={formData.basicInfo.roll} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Enter about your Roll" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="email" className="text-light">Email</label>
                    <input className="form-control" id="email" name="email" value={formData.basicInfo.email} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Enter your Email" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="phone" className="text-light">Mobile</label>
                    <input className="form-control" id="phone" name="phone" value={formData.basicInfo.phone} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Enter your phone number" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="linkedin" className="text-light">LinkedIn</label>
                    <input className="form-control" id="linkedin" name="linkedin" value={formData.basicInfo.linkedin} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Enter LinkedIn link" />
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="git" className="text-light">GitHub</label>
                    <input className="form-control" id="git" name="git" value={formData.basicInfo.git} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Enter GitHub link" />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="summary" className="text-light">Professional Summary</label>
                    <textarea className="form-control" id="summary" name="summary" value={formData.basicInfo.summary} onChange={(e) => handleChange(e, 'basicInfo')} placeholder="Give something about you..." />
                </div>

                {/* Work Experience */}
                <div className="text-light h3">Work Experience</div>
                {formData.workInfo.map((work, index) => (
                    <div key={index}>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`prevroll${index}`} className="text-light">Previous Role</label>
                            <input className="form-control" id={`prevroll${index}`} name="prevroll" value={work.prevroll} onChange={(e) => handleArrayChange(e, 'workInfo', index)} placeholder="Enter about your previous role" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`company${index}`} className="text-light">Company Details</label>
                            <input className="form-control" id={`company${index}`} name="company" value={work.company} onChange={(e) => handleArrayChange(e, 'workInfo', index)} placeholder="Enter about your company details" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`date${index}`} className="text-light">Date</label>
                            <input className="form-control" id={`date${index}`} name="date" value={work.date} onChange={(e) => handleArrayChange(e, 'workInfo', index)} placeholder="Enter the date" />
                        </div>
                        <div className="col-12">
                            <label className="text-light">Description</label>
                            {work.description.map((desc, descIndex) => (
                                <div className="mb-2" key={descIndex}>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name={descIndex}
                                        value={desc}
                                        onChange={(e) => handleNestedArrayChange(e, 'workInfo', index, 'description', descIndex)}
                                        placeholder={`Enter description ${descIndex + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Education */}
                <div className="text-light h3">Education</div>
                {formData.educationInfo.map((education, index) => (
                    <div key={index}>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`education${index}`} className="text-light">Education</label>
                            <input className="form-control" id={`education${index}`} name="education" value={education.education} onChange={(e) => handleArrayChange(e, 'educationInfo', index)} placeholder="Enter your education" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`university${index}`} className="text-light">University</label>
                            <input className="form-control" id={`university${index}`} name="university" value={education.university} onChange={(e) => handleArrayChange(e, 'educationInfo', index)} placeholder="Enter your university" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor={`graduate${index}`} className="text-light">Graduation Date</label>
                            <input className="form-control" id={`graduate${index}`} name="graduate" value={education.graduate} onChange={(e) => handleArrayChange(e, 'educationInfo', index)} placeholder="Enter graduation date" />
                        </div>
                    </div>
                ))}

                {/* Skills */}
                <div className="text-light h3">Skills</div>
                {formData.skillInfo.map((skill, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <label htmlFor={`skill${index}`} className="text-light">Skill {index + 1}</label>
                        <input className="form-control" id={`skill${index}`} name={`skill${index}`} value={skill} onChange={(e) => handleSkillChange(e, index)} placeholder={`Enter skill ${index + 1}`} />
                    </div>
                ))}

                {/* Certificates */}
                <div className="text-light h3">Certificates</div>
                {formData.certificateInfo.map((certificate, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <label htmlFor={`certificate${index}`} className="text-light">Certificate {index + 1}</label>
                        <input className="form-control" id={`certificate${index}`} name={`certificate${index}`} value={certificate} onChange={(e) => handleCertificateChange(e, index)} placeholder={`Enter certificate ${index + 1}`} />
                    </div>
                ))}

                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Resume_maker;
