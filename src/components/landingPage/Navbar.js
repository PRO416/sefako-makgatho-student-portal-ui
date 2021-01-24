import React from 'react';
import logo from '../../images/logo.jpg';

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="logo" onClick={props.headHome}>
        <img src={logo} alt="" />
      </div>
      <ul className="nav-links">
        {props.location === "home" ? <li className="active" onClick={props.headHome}>Account</li> : <li onClick={props.headHome}>Account</li>}
        {
          props.location === 'finances' ?
          <li onClick={props.headToFinance} className="activeX">
            <div to="/">Postgraduate</div>
            <ul>

            </ul>
          </li> :
          <li onClick={props.headToFinance}>
            <div to="/">Postgraduate</div>
            <ul>

            </ul>
          </li>
        }
        {
          props.location === 'academics' ? 
          <li onClick={props.headToSchool} className="activeX">
            <div>Academics</div>
            <ul>
            
            </ul>
          </li> : 
          <li onClick={props.headToSchool}>
          <div>Academics</div>
          <ul>
            
          </ul>
        </li>
        }
        {
          props.location === "residence" ?
          <li onClick={props.headToRes} className="activeX">
            <div>Residence</div>
            <ul>
              
            </ul>
          </li> :
          <li onClick={props.headToRes}>
            <div>Logout</div>
            <ul>
              
            </ul>
          </li>
        }
      </ul>
    </div>
  )
}

export default Navbar;