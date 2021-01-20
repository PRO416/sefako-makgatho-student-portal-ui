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
  let [courses, setCourses] = useState([]);
  let [selectedSchoolName, setSelectedSchoolName] = useState('');
  let [selectedSchool, setSelectedSchool] = useState({});

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
    getSchoolCourses(selectedSchool.id)
      .then(res => res.data)
      .then(data => setCourses(data))
  }, [selectedSchool])

  useEffect(() => {
    console.log(selectedSchoolName)
  }, [selectedSchoolName])

  const updateSelectedSchool = e => {
    setSelectedSchoolName(e.value.target);
    console.log(e.value.target);
    // console.log("hello: " + schools.filter(school => e.value.target === school.name ? school : null));
  }

  // console.log(selectedSchoolName);
  // console.log(selectedSchool);
  // console.log(courses);

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/dashboard/residence');

  const headToSchool = () => history.push('/dashboard/academics');

  const submitPostGrad = e => {
    e.preventDefault();

    setSubmitted(true);

    redirect();
  }

  const redirect = () => submitted ? headHome : 'Warning';

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
          <select>
          {
            schools ? schools.map(school => (
                <option key={school.id} value={school.name} data-name={school.id}>{school.name}</option>
            )) : ""
          }
          </select>
          {
            selectedSchoolName ? 
            <div>
              {selectedSchoolName}
            </div> : ""
          }
          {
            selectedSchool ?
            <div>
              {selectedSchool.name}
            </div> : ""
          }
          <button type="submit" onClick={submitPostGrad}>apply</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Finances;