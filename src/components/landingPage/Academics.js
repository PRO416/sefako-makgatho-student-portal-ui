import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';
import { getStudentCourse } from '../../services/loginService';

function Academics(props) {
  const history = useHistory();
  const [course, setCourse] = useState([]);
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

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/dashboard/residence');

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
                    hello
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
                    hello
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
                    hello
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
                    hello
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