import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import temp from './templates/Resume1.png';
import temp1 from './templates/Resume2.png';
import temp2 from './templates/Resume3.png';

const Dashboard = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth); 

   const templates = [
      { id: 1, src: temp, alt: 'Template 1' },
      { id: 2, src: temp1, alt: 'Template 2' },
      { id: 3, src: temp2, alt: 'Template 3' },
   ];

   // Dashboard protection
   useEffect(() => {
      if (!user) {
         navigate('/login');
      }
   }, [user, navigate]);

   const handleLogout = () => {
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/login');
   }

   return (
      <>
         <style>
            {`
               .body {
                  background: rgb(2,0,36);
                  background: linear-gradient(18deg, rgba(2,0,36,1) 0%, rgba(8,7,138,1) 28%, rgba(9,9,121,1) 35%, rgba(6,75,164,1) 56%, rgba(3,134,203,1) 75%, rgba(0,212,255,1) 100%);
                  background-repeat: no-repeat;
                  color: white;
                  min-height: 100vh;
               }
               .navbar {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 10px 20px;
               }
               .navbar-brand {
                  font-size: 1.5rem;
               }
               .navbar-nav {
                  display: flex;
                  list-style: none;
                  padding: 0;
               }
               .navbar-nav li {
                  margin: 0 10px;
               }
               .card-deck {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 20px; /* Space between cards */
               }
               .card {
                  flex: 1 1 300px; /* Flex-grow, flex-shrink, flex-basis */
                  max-width: 300px; /* Maximum width */
                  position: relative;
                  overflow: hidden;
                  border: none;
                  margin-bottom: 20px;
               }
               .card-img-top {
                  height: 500px; /* Fixed height */
                  width: 100%; /* Full width */
                  object-fit: cover; /* Ensure image covers the area */
               }
               .card-overlay {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.5);
                  color: white;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  opacity: 0;
                  transition: opacity 0.3s ease;
                  padding: 10px;
               }
               .card:hover .card-overlay {
                  opacity: 1;
               }
               .text-link {
                  text-decoration: none;
                  color: inherit;
                  display: block;
                  height: 100%;
                  width: 100%;
               }
               .card-body {
                  position: relative;
                  padding: 10px;
               }
            `}
         </style>
         <div className="body">
            <div className="h1 text-white text-center">
               Naveen Resume Builder
            </div>
            <div className="container">
               <nav className="navbar">
                  <div className="navbar-brand text-white">Resume Builder</div>
                  <div className="nav navbar-nav">
                     <Link to='/dashboard'><li className="text-white">Template</li></Link>
                  </div>
                  <div className="nav navbar-nav navbar-right">
                     <button className="btn btn-light" onClick={handleLogout} aria-label="Log Out">Log Out</button>
                  </div>
               </nav>
               <div className="card-deck mt-4">
                  {templates.map((template) => (
                     <div className="card" key={template.id}>
                        <Link to={`/resume-maker/${template.id}`} className="text-link">
                           <img src={template.src} className="card-img-top" alt={template.alt} />
                           <div className="card-overlay">
                              <div>
                                 <h5 className="card-title">Template {template.id}</h5>
                                 <p className="card-text">Use this template</p>
                              </div>
                           </div>
                           <div className="card-body">
                              {/* Additional content can go here if needed */}
                           </div>
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
}

export default Dashboard;
