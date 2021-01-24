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
  let [selectedCourses, setSelectedCourses] = useState([]);
  let [selectedCourse, setSelectedCourse] = useState('');
  let [oneCourse, setOneCourse] = useState([]);
  let [hasSchoolBeenSelected, setHasSchoolBeenSelected] = useState(false);

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

  const handleChange = e => setSelectedSchool(e.target.value);

  const handleCourseChange = e => setSelectedCourse(e.target.value);

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/');

  const headToSchool = () => history.push('/dashboard/academics');

  const redirect = () => submitted ? headHome() : 'Warning';

  const submitPostGrad = e => {
    e.preventDefault();

    setSubmitted(true);

    redirect();
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
        <form method="POST">
          <h4>SELECT YOUR SCHOOL</h4>
          {
            schools ? <select value={selectedSchool} onChange={handleChange}>
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
            hasSchoolBeenSelected ? <h5>Press ctrl to select multiple options</h5> : ''
          }
          {
            oneCourse ? <select onChange={handleCourseChange} multiple>
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