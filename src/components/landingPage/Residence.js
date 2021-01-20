import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHistory } from 'react-router-dom';

function Residence() {
  const history = useHistory();

  const headHome = () => history.push('/dashboard/home');

  const headToFinance = () => history.push('/dashboard/finances');

  const headToRes = () => history.push('/dashboard/residence');

  const headToSchool = () => history.push('/dashboard/academics');

  return (
    <div>
      <Navbar
        location="residence"
        headHome={headHome}
        headToFinance={headToFinance}
        headToRes={headToRes}
        headToSchool={headToSchool}
      />
      <div className="residence">
        
      </div>
      <Footer />
    </div>
  )
}

export default Residence;