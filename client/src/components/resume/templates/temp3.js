import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template3 = () => {
  const _id = useSelector((state) => state.resume.resumeId);
  const [resumeData, setResumeData] = useState({});
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
          setResumeData(res.data);
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
      const imgWidth = 210;
      const pageHeight = 295;
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
    resumeContainer: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '2px solid #333',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    nameTitle: {
      h1: {
        margin: 0,
        fontSize: '2em',
      },
      p: {
        margin: '5px 0 0',
        fontSize: '1.2em',
        color: '#555',
      },
    },
    contactInfo: {
      p: {
        margin: '2px 0',
      },
    },
    columns: {
      display: 'flex',
    },
    leftColumn: {
      width: '30%',
      padding: '20px',
      backgroundColor: '#f8f8f8',
    },
    rightColumn: {
      width: '70%',
      padding: '20px',
    },
    section: {
      marginBottom: '20px',
      h2: {
        marginBottom: '10px',
        fontSize: '1.5em',
        color: '#333',
      },
      ul: {
        listStyle: 'none',
        padding: 0,
        li: {
          background: '#fff',
          marginBottom: '5px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
        },
      },
    },
    job: {
      marginBottom: '20px',
      h3: {
        margin: 0,
        fontSize: '1.2em',
      },
      p: {
        margin: '5px 0',
      },
      ul: {
        margin: '10px 0 0',
        paddingLeft: '20px',
      },
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
      <div style={styles.resumeContainer} ref={pdfRef}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.nameTitle.h1}>{resumeData.basicInfo?.name || 'John Smith'}</h1>
            <p style={styles.nameTitle.p}>{resumeData.basicInfo?.roll || 'Frontend Developer'}</p>
          </div>
          <div>
            <p style={styles.contactInfo.p}>Email: {resumeData.basicInfo?.email || 'john.smith@example.com'}</p>
            <p style={styles.contactInfo.p}>Phone: {resumeData.basicInfo?.phone || '(111) 222-3333'}</p>
            <p style={styles.contactInfo.p}>LinkedIn: {resumeData.basicInfo?.linkedin || 'linkedin.com/in/johnsmith'}</p>
            <p style={styles.contactInfo.p}>GitHub: {resumeData.basicInfo?.git || 'github.com/johnsmith'}</p>
          </div>
        </header>
        <div style={styles.columns}>
          <div style={styles.leftColumn}>
            <section style={styles.section}>
              <h2 style={styles.section.h2}>Skills</h2>
              <ul style={styles.section.ul}>
                {resumeData.skillInfo?.map((skill, index) => (
                  <li key={index} style={styles.section.ul.li}>{skill}</li>
                ))}
              </ul>
            </section>
            <section style={styles.section}>
              <h2 style={styles.section.h2}>Education</h2>
              {resumeData.educationInfo?.map((education, index) => (
                <div key={index}>
                  <h3>{education.education}</h3>
                  <p>{education.university}</p>
                  <p>Graduated: {education.graduate}</p>
                </div>
              ))}
            </section>
            <section style={styles.section}>
              <h2 style={styles.section.h2}>Certifications</h2>
              <ul style={styles.section.ul}>
                {resumeData.certificateInfo?.map((certification, index) => (
                  <li key={index} style={styles.section.ul.li}>{certification}</li>
                ))}
              </ul>
            </section>
          </div>
          <div style={styles.rightColumn}>
            <section style={styles.section}>
              <h2 style={styles.section.h2}>Professional Summary</h2>
              <p>{resumeData.basicInfo?.summary || 'Detail-oriented Frontend Developer with extensive experience in creating responsive web applications.'}</p>
            </section>
            <section style={styles.section}>
              <h2 style={styles.section.h2}>Work Experience</h2>
              {resumeData.workInfo?.map((job, index) => (
                <div key={index} style={styles.job}>
                  <h3 style={styles.job.h3}>{job.prevroll}</h3>
                  <p style={styles.job.p}>{job.company}</p>
                  <p style={styles.job.p}>{job.date}</p>
                  <ul style={styles.job.ul}>
                    {job.description?.map((description, i) => (
                      <li key={i}>{description}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={generatePDF} style={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Template3;
