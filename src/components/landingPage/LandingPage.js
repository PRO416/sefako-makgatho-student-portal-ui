import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import portrait from '../../images/blank-profile.png';

function LandingPage(props) {
  const student = props.studentData;
  const history = useHistory();

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/postgraduate');

  const headToRes = () => history.push('/');

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
                  <div>id number: 987937920472</div>
                  <div>physical address: 166 Joburg Ave.<br/>
                                         Bryanston<br/>
                                         Johannesburg<br/>
                                         2040<br/>
                  </div>
                  <div>school residential address: 179 vds <br/>
                                         pretorius street<br/>
                                         Pretoria central<br/>
                                         0001<br/>
                  </div>
                  <div>residence name: south point</div>
                  <div>room number: 987</div>
                </div>
              </div>
            </div>
      <Footer />
    </div>
  )
}

export default LandingPage;