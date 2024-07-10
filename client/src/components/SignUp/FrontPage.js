import React from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
   return(
    <>
      <div
      className="d-flex justify-content-center align-items-end container-fluid min-vh-100"
      style={{
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(18deg, rgba(2,0,36,1) 0%, rgba(8,7,138,1) 28%, rgba(9,9,121,1) 35%, rgba(6,75,164,1) 56%, rgba(3,134,203,1) 75%, rgba(0,212,255,1) 100%)',
      }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-md-12 col-lg-6">
          <div
            className="card p-4 shadow-md"
            style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#021c6b',
              color: '#ffffff',
            }}
          >
            <div className="mb-1">
              <div className="card-title text-center">Naveen Resume-Builder</div>
            </div>
            <div className="mb-3">
              <div className="card-body text-center h2">Get Started with Us</div>
              <div className="row">
                <Link to='/signup' className="btn btn-block btn-outline-light m-2 col">Sign Up</Link>
                <Link to='/login' className="btn btn-block btn-outline-light m-2 col"> Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   )
}

export default FrontPage;