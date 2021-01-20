import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import portrait from '../../images/blank-profile.png';

function LandingPage(props) {
  const student = props.studentData;
  const history = useHistory();

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/dashboard/residence');

  const headToSchool = () => history.push('/dashboard/academics');

  return (
    <div className="home">
      <Navbar
        location="home"
        headHome={headHome}
        headToFinance={headToFinance}
        headToRes={headToRes}
        headToSchool={headToSchool}
      />
            <div className="container">
              <div className="id-card">
                <img src={portrait} alt=""/>
                <div className="details">
                  <div>student number: {student.studentNum}</div>
                  <div>first name(s): {student.user.firstname}</div>
                  <div>last name: {student.user.lastname}</div>
                  <div>student email: {student.user.email}</div>
                </div>
              </div>
            </div>
      <Footer />
    </div>
  )
}

export default LandingPage;