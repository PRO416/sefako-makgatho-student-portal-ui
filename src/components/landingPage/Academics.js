/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFAcademicTranscript from './PDFAcademicTranscript';

import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import { getStudentCourse, getStudentModules } from '../../services/loginService';

function Academics(props) {
  const history = useHistory();
  const [course, setCourse] = useState([]);
  let [modules, setModules] = useState([]);
  let [postModules, setPostModules] = useState([]);
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
    let undergrad = course.filter(c => c.course.postGraduateCourse == false)
    if (Object.entries(undergrad).length !== 0)
      getStudentModules(studentData.id, undergrad[0].id)
        .then(res => res.data)
        .then(data => setModules(data))
    else
      console.log('dne')

    let postgrad = course.filter(c => c.course.postGraduateCourse == true)
    if (Object.entries(postgrad).length !== 0)
      getStudentModules(studentData.id, postgrad[0].id)
      .then(res => res.data)
      .then(data => setPostModules(data))
    else
      console.log('dne post')
  }, [course])

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/postgraduate');

  const headToRes = () => history.push('/');

  const headToSchool = () => history.push('/dashboard/academics');

  // const downloadPDF = () => ReactPDF.render(<PDFAcademicTranscript />, `${__dirname}/example.pdf`);

  // const downloadPDF = () => <PDFDownloadLink document={<PDFAcademicTranscript />} fileName="somename.pdf">
  // {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
  // </PDFDownloadLink>

  const downloadPDF = () => 'hello'

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
            <div className="academic-details">
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
                      course
                        .filter(c => c.approved)
                        .map(c => (
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
                                .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
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
                    {/* {
                      Object.entries(course).length !== 0 && Object.entries(modules).length !== 0 ?
                        <PDFViewer>
                          <PDFAcademicTranscript
                            studentData={studentData}
                            modules={modules}
                            course={course}
                          />
                        </PDFViewer>
                      : ''
                    } */}
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
                        .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
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
                        .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
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
                        .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
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
                    <hr />
                    {
                      Object.entries(course).length !== 0 && Object.entries(modules).length !== 0 ?
                        <PDFDownloadLink
                          style={{
                            backgroundColor: '#007bff',
                            padding: '8px 14px',
                            margin: '15px 8px',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            borderRadius: '4px',
                            color: '#fff',
                          }}
                          document={
                            <PDFAcademicTranscript
                              studentData={studentData}
                              modules={modules}
                              course={course}
                            />
                          }
                          fileName="academic_record.pdf">
                          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download document')}
                        </PDFDownloadLink>
                      : ''
                    }
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
                    {
                      course ?
                        course
                          .filter(c => c.approved)
                          .map(c => ( 
                            <h3>QUALIFICATION: BSc ({`${c.course.name}`}) {`${c.currentLevel}`}</h3>
                          ))
                        : ''
                    } 
                    <br/>
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
                          <div key={c.id}>
                            <table className="table">
                              <thead className="thead-dark">
                                <tr>
                                  <th>CODE</th>
                                  <th>NAME</th>
                                  <th>STATUS</th>
                                  <th>COMPLETED</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{c.course.code}</td>
                                  <td>{c.course.name}</td>
                                  <td>{c.approved ? 'APPROVED' : 'PENDING'}</td>
                                  <td>{c.completed ? 'COMPLETED' : 'NOT COMPLETED'}</td>
                                </tr>
                              </tbody>
                            </table>
                            <hr /><br />
                          </div>
                        )) : ''
                    }
                  </div> : ''
                }
              </div>
            </div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Academics;