import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const Template1 = () => {
  const _id = useSelector((state) => state.resume.resumeId);
  const [basicInfo, setBasicInfo] = useState({});
  const [workInfo, setWorkInfo] = useState([]);
  const [educationInfo, setEducationInfo] = useState([]);
  const [skillInfo, setSkillInfo] = useState([]);
  const [certificateInfo, setCertificateInfo] = useState([]);
  const [token, setToken] = useState(null);
  const pdfRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setToken(storedUser.token);
    }else{
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (_id && token) {
      const fetchResume = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const res = await axios.get(`http://localhost:8001/api/resume/${_id}`, config);
          setBasicInfo(res.data.basicInfo);
          setWorkInfo(res.data.workInfo || []); // Ensure workInfo is an array
          setEducationInfo(res.data.educationInfo || []); // Ensure educationInfo is an array
          setSkillInfo(res.data.skillInfo || []); // Ensure skillInfo is an array
          setCertificateInfo(res.data.certificateInfo || []); // Ensure certificateInfo is an array
        } catch (err) {
          console.log('Error fetching resume:', err);
        }
      };

      fetchResume();
    }
  }, [_id, token]);

  const generatePDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
      navigate('/dashboard');
    });
  };

  const styles = {
    resume: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: '20px',
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
    },
    headerText: {
      margin: '5px 0',
    },
    summary: {
      marginBottom: '20px',
    },
    summaryHeader: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
    },
    experience: {
      marginBottom: '20px',
    },
    experienceHeader: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
    },
    job: {
      marginBottom: '20px',
    },
    jobTitle: {
      fontSize: '1.2em',
      margin: 0,
    },
    jobInfo: {
      margin: '5px 0',
    },
    education: {
      marginBottom: '20px',
    },
    educationHeader: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
    },
    skills: {
      marginBottom: '20px',
    },
    skillsHeader: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
    },
    certifications: {
      marginBottom: '20px',
    },
    certificationsHeader: {
      fontSize: '1.5em',
      color: '#333',
      marginBottom: '10px',
    },
    ul: {
      listStyle: 'none',
      padding: 0,
    },
    li: {
      background: '#fff',
      marginBottom: '5px',
      padding: '10px',
      borderRadius: '5px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
    },
  };

  return (
    <div>
      <div style={styles.resume} ref={pdfRef}>
        <header style={styles.header}>
          <h1 style={styles.headerText}>{basicInfo.name}</h1>
          <p style={styles.headerText}>{basicInfo.roll}</p>
          <p style={styles.headerText}>Email: {basicInfo.email} | Phone: {basicInfo.phone}</p>
          <p style={styles.headerText}>LinkedIn: {basicInfo.linkedin} | GitHub: {basicInfo.git}</p>
        </header>
        <section style={styles.summary}>
          <h2 style={styles.summaryHeader}>Professional Summary</h2>
          <p>{basicInfo.summary}</p>
        </section>
        <section style={styles.experience}>
          <h2 style={styles.experienceHeader}>Work Experience</h2>
          {workInfo.map((work, index) => (
            <div key={index} style={styles.job}>
              <h3 style={styles.jobTitle}>{work.prevroll}</h3>
              <p style={styles.jobInfo}>{work.company}</p>
              <p style={styles.jobInfo}>{work.date}</p>
              <ul style={styles.ul}>
                {work.description.map((desc, i) => (
                  <li key={i} style={styles.li}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section style={styles.education}>
          <h2 style={styles.educationHeader}>Education</h2>
          {educationInfo.map((edu, index) => (
            <div key={index}>
              <h3>{edu.education}</h3>
              <p>{edu.university}</p>
              <p>{edu.graduate}</p>
            </div>
          ))}
        </section>
        <section style={styles.skills}>
          <h2 style={styles.skillsHeader}>Skills</h2>
          <ul style={styles.ul}>
            {skillInfo.map((skill, index) => (
              <li key={index} style={styles.li}>{skill}</li>
            ))}
          </ul>
        </section>
        <section style={styles.certifications}>
          <h2 style={styles.certificationsHeader}>Certifications</h2>
          <ul style={styles.ul}>
            {certificateInfo.map((cert, index) => (
              <li key={index} style={styles.li}>{cert}</li>
            ))}
          </ul>
        </section>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={generatePDF} style={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template1;
