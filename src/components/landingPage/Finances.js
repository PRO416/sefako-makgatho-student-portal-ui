/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import { sendPostgraduateApplication, getStudentCourse, getAllSchools, getSchoolCourses } from '../../services/loginService';

function Finances(props) {
  const history = useHistory();
  let [submitted, setSubmitted] = useState(false);
  let [course, setCourse] = useState([]);
  let [schools, setSchools] = useState([]);
  let [schoolCourses, setSchoolCourses] = useState([]);
  let [selectedSchool, setSelectedSchool] = useState('Health Care Sciences');
  let [postgraduateCourse, setPostgraduateCourse] = useState([]);
  let [selectedCourse, setSelectedCourse] = useState('');
  let [oneCourse, setOneCourse] = useState([]);
  let [hasSchoolBeenSelected, setHasSchoolBeenSelected] = useState(false);
  let [sentRequest, setSentRequest] = useState(false);
  let [errorData, setErrorData] = useState('');
  let [errorCode, setErrorCode] = useState(0);

  let schoolArray = []

  const { studentData } = props;

  useEffect(() => {
    getStudentCourse(studentData.id)
      .then(res => res.data)
      .then(data => setCourse(data))
    
    getAllSchools()
      .then(res => res.data)
      .then(data => setSchools(data));
  }, []);

  useEffect(() => {
    schools ? schools.map(school => {
      getSchoolCourses(school.id)
        .then(res => res.data)
        .then(data => schoolArray.push(data))
    }) : ''

    setSchoolCourses(schoolArray)
  }, [schools])

  useEffect(() => {
    let s = schools ? schools.filter(school => school.name === selectedSchool) : ''
    let s_values = schoolCourses ? Object.values(schoolCourses)[0] : console.log('undef')
    setOneCourse(s_values);
    setHasSchoolBeenSelected(true);
  }, [selectedSchool])

  useEffect(() => {
    let cour = oneCourse.filter(c => c.name === selectedCourse && c.qualification.name === 'Honours Degree');
    setPostgraduateCourse(cour);
  }, [selectedCourse])
  
  useEffect(() => {
    if (Object.entries(postgraduateCourse).length !== 0)
      sendPostgraduateApplication(studentData.id, Object.values(postgraduateCourse)[0].id)
        .then(res => {
          setErrorCode(res.status);
          setErrorData(res.data);
          setSentRequest(true);
        })
        .catch(e => {
          if(e.response) {
            setErrorData(e.response.data);
            setErrorCode(e.response.status);
          }
        })
  }, [submitted])

  useEffect(() => {
    if(sentRequest === true)
      redirect();
  }, [sentRequest])

  const handleChange = e => setSelectedSchool(e.target.value);

  const handleCourseChange = e => setSelectedCourse(e.target.value);

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/');

  const headToSchool = () => history.push('/dashboard/academics');

  const redirect = () => {
    submitted ? 
      setTimeout(() => {
        headHome();
      }, 5000) : 'Warning';
  }

  const submitPostGrad = e => {
    e.preventDefault();
    setSubmitted(true);
  }

  const errorStyling = {
    margin: '3vh 0'
  }

  return (
    <div >
      <Navbar
        location="finances"
        headHome={headHome}
        headToFinance={headToFinance}
        headToRes={headToRes}
        headToSchool={headToSchool}
      />
      <div className="finances">
        {
          errorCode === 0 ? '' :
          errorCode === 403 ? 
          <div style={errorStyling}>
            <h3>{errorData}</h3>
          </div> : ''
        }
        {
          sentRequest === true ?
          <div className={{
            margin: '2vh 0',
            textTransform: 'uppercase'
          }}>
            <h3>Application submitted. Your application will be reviewed</h3>
          </div> : ''
        }
        <form method="POST" style={{marginBottom: '4vh'}}>
          <div className="form-group">
            <label htmlFor="firstname">FIRSTNAME</label>
            <input type="text" className="form-control" name="firstname" value={studentData.user.firstname}disabled></input>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">LASTNAME</label>
            <input type="text" className="form-control" name="lastname" value={studentData.user.lastname} disabled></input>
          </div>
          <div className="form-group">
            <label htmlFor="idnumber">ID NUMBER</label>
            <input type="text" className="form-control" name="idNumber" value="990101082756" disabled></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input type="email" className="form-control" name="email" value={studentData.user.email} disabled></input>
          </div>
          <div className="form-group">
            <label htmlFor="stdNum">STUDENT NUMBER</label>
            <input type="text" className="form-control" name="studentNum" value={studentData.studentNum} disabled></input>
          </div>

          <h4>SELECT YOUR SCHOOL</h4>
          {
            schools ? <select className="form-control" value={selectedSchool} onChange={handleChange}>
              {
                schools.map(school => (
                  <option key={school.id} value={school.name}>{school.name}</option>
                ))
              }
            </select> : ""
          }
          {
            hasSchoolBeenSelected ? <h4>SELECT YOUR COURSE</h4> : ''
          }
          {
            oneCourse ? <select className="form-control" onChange={handleCourseChange}>
              {
                oneCourse
                  .filter(mod => mod.qualification.name === 'Honours Degree')
                  .map(mod => (
                    <option key={mod.id} value={mod.name}>{mod.name}</option>
                ))
              }
            </select> : ''
          }
          <button type="submit" onClick={submitPostGrad}>apply</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Finances;