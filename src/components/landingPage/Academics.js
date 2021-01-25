/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import { getStudentCourse, getStudentModules } from '../../services/loginService';

function Academics(props) {
  const history = useHistory();
  const [course, setCourse] = useState([]);
  let [modules, setModules] = useState([]);
  let [ed, setEd] = useState(false);
  let [pr, setPr] = useState(false);
  let [er, setEr] = useState(false);
  let [as, setAs] = useState(false);

  const { studentData } = props;

  useEffect(() => {
    getStudentCourse(studentData.id)
      .then(res => res.data)
      .then(data => setCourse(data))
  }, []);

  useEffect(() => {
    course[0] ? getStudentModules(studentData.id, course[0].id)
      .then(res => res.data)
      .then(data => setModules(data)) : 'dne'
  }, [course])

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/postgraduate');

  const headToRes = () => history.push('/');

  const headToSchool = () => history.push('/dashboard/academics');

  return (
    <div>
      <Navbar
        location="academics"
        headHome={headHome}
        headToFinance={headToFinance}
        headToRes={headToRes}
        headToSchool={headToSchool}
      />
      <div className="academics">
        {
          course ? course.map(c => (
            <div key={c.id} className="academic-details">
              <div className="enrolment">
                <button onClick={() => setEd(!ed)}>
                  <h3>
                    Enrolment Details
                    {
                      ed ? ' -' : ' +'
                    }
                  </h3>
                </button>
                {
                  ed ? 
                  <div className="enrolment-details">
                    {
                      course ?
                      course.map(c => (
                        <table key={c.id}>
                          <tbody>
                            <tr>
                              <td>SCHOOL</td>
                              <td>{c.course.school.name}</td>
                            </tr>
                            <tr>
                              <td>COURSE</td>
                              <td>{c.course.name}</td>
                            </tr>
                            <tr>
                              <td>COURSE CODE</td>
                              <td>{c.course.code}</td>
                            </tr>
                            <tr>
                              <td>CURRENT LEVEL</td>
                              <td>{c.currentLevel}</td>
                            </tr>
                            <tr>
                              <td>
                                <h3>MODULES</h3>
                              </td>
                            </tr>
                            
                            <table className="table" style={{fontWeight: '600', fontSize: '1.5rem'}}>
                              <thead className="thead-dark">
                                <tr>
                                  <th scope="col">CODE</th>
                                  <th scope="col">NAME</th>
                                  <th scope="col">ACADEMIC PERIOD</th>
                                  <th scope="col">YEAR</th>
                                </tr>
                              </thead>
                            {
                              modules ? modules
                                .filter(m => m.module.year === course[0].currentLevel)
                                .map(mod => (
                                  <tbody key={mod.id}>
                                    <tr>
                                      <td>{mod.module.code}</td>
                                      <td>{mod.module.name}</td>
                                      <td>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</td>
                                      <td>{mod.module.year}</td>
                                    </tr>
                                  </tbody>
                              )) : ''
                            }
                            </table>
                          </tbody>
                        </table>
                      )) : ''
                    }
                  </div> : ''
                }
              </div>
              <div className="report">
                <button onClick={() => setPr(!pr)}>
                  <h3>
                    Progress Report
                    {
                      pr ? ' -' : ' +'
                    }
                  </h3>
                </button>
                {
                  pr ? 
                  <div className="enrolment-details">
                    <div>
                      <h3>STUDENT NUMBER {studentData.studentNum}</h3>
                      <h3>STUDENT NAME {`${studentData.user.firstname} ${studentData.user.lastname}`}</h3>
                      <br/>
                    </div>
                    
                    <hr/>
                    <h3>YEAR: 2021</h3>

                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th>CODE</th>
                          <th>MODULE</th>
                          <th>PERIOD</th>
                          <th>GRADE</th>
                        </tr>
                      </thead>
                    {
                      modules ? modules
                        .filter(m => course[0].currentLevel === m.module.year)
                        .map(mod => (
                          <tbody key={mod.id}>
                            <tr>
                              <td>{mod.module.code}</td>
                              <td>{mod.module.name}</td>
                              <td>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</td>
                              <td>{mod.grade}</td>
                            </tr>
                          </tbody>)) : ''
                    }
                    </table>
                    <br/><hr/>
                        <h3>YEAR: 2020</h3>
                    
                    <table className="table">
                     <thead className="thead-dark">
                       <tr>
                        <th>CODE</th>
                         <th>MODULE</th>
                         <th>PERIOD</th>
                         <th>GRADE</th>
                       </tr>
                     </thead>
                    {
                      modules ? modules
                        .filter(m => (course[0].currentLevel > 0 && course[0].currentLevel - 1 === m.module.year))
                        .map(mod => (
                          <tbody key={mod.id}>
                            <tr>
                              <td>{mod.module.code}</td>
                              <td>{mod.module.name}</td>
                              <td>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</td>
                              <td>{mod.grade}</td>
                            </tr>
                          </tbody>)) : ''
                    }
                    </table>
                    <br/><hr/>

                    <h3>YEAR: 2019</h3>
                    
                    <table className="table">
                     <thead className="thead-dark">
                       <tr>
                        <th>CODE</th>
                         <th>MODULE</th>
                         <th>PERIOD</th>
                         <th>GRADE</th>
                       </tr>
                     </thead>
                    {
                      modules ? modules
                        .filter(m => (course[0].currentLevel > 0 && course[0].currentLevel - 2 === m.module.year))
                        .map(mod => (
                          <tbody key={mod.id}>
                          <tr>
                            <td>{mod.module.code}</td>
                            <td>{mod.module.name}</td>
                            <td>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</td>
                            <td>{mod.grade}</td>
                          </tr>
                        </tbody>)) : ''
                    }
                    </table>
                  </div> : ''
                }
              </div>
              <div className="results">
                <button onClick={() => setEr(!er)}>
                  <h3>
                    Examination Results
                    {
                      er ? ' -' : ' +'
                    }
                  </h3>
                </button>
                {
                  er ? 
                  <div className="enrolment-details">
                    <h3>STUDENT NUMBER {studentData.studentNum}</h3><br/>
                    <h3>RESULTS FOR: {`${studentData.user.firstname} ${studentData.user.lastname}`}</h3><br/>
                    <h3>QUALIFICATION: BSc (Mathematical Sciences) III</h3><br/>
                    <table className="table">
                     <thead className="thead-dark">
                        <tr>
                          <td>MODULES</td>
                          <td>ACADEMIC PERIOD</td>
                          <td>MARK</td>
                        </tr>
                      </thead>
                    {
                      modules ? modules
                        .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
                        .filter(m => course[0].currentLevel === m.module.year)
                        .map(mod => (
                        <tbody key={mod.id}>
                          <tr>
                            <td>{mod.module.name}</td>
                            <td>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</td>
                            <td>{mod.grade}</td>
                          </tr>
                        </tbody>
                      )) : ''
                    }
                    </table>
                  </div> : ''
                }
              </div>
              <div className="admission">
                <button onClick={() => setAs(!as)}>
                  <h3>
                    Admission Status
                    {
                      as ? ' -' : ' +'
                    }
                  </h3>
                </button>
                {
                  as ? 
                  <div className="enrolment-details">
                    {
                      course ?
                        course.map(c => (
                          <table key={c.id}>
                            <tbody>
                              <tr>
                                <td>APPROVAL</td>
                                <td>{c.approved ? 'APPROVED' : 'NOT APPROVED'}</td>
                              </tr>
                              <tr>
                                <td>COMPLETED</td>
                                <td>{c.completed ? 'COMPLETED' : 'NOT COMPLETED'}</td>
                              </tr>
                            </tbody>
                          </table>
                        )) : ''
                    }
                  </div> : ''
                }
              </div>
            </div>
          )) : <div>Loading . . .</div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Academics;