import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getOneStudent } from '../../services/loginService';

function Login(props) {
  let [name, setName] = useState('');
  let [password, setPassword] = useState('');
  let [data, setData] = useState([]);
  let [found, setFound] = useState(false);
  let [error, setError] = useState(false);

  const history = useHistory();

  let { transfer } = props;

  useEffect(() => {
    transfer(data);
  }, [data]);

  const submitHandler = e => {
    e.preventDefault();

    getOneStudent(name, password)
      .then(res => {
        setData(res.data);
        setFound(true);
        found ? history.push('/dashboard/home') : <div>Loading. . .</div>
      })
      .catch(err => {
        console.log(err)
        setError(true);
      });
  }

  const styles = {
    height: '85vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase'
  }

  const formStyle = {
    height: '50vh',
    width: '50vw',
    border: '1px solid black',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const buttonStyles = {
    height: '3rem',
    width: '60%'
  }

  const inputStyle = {
    height: '3rem',
    width: '60%'
  }

  const labelStyle = {
    padding: '0',
    margin: '0',
    fontSize: '2.5rem'
  }

  const errorMessageStyles = {
    marginBottom: '3vh',
  }

  return (
    <div className="login" style={styles}>
      {error ? <h1 style={errorMessageStyles}>Incorrect Login Details</h1> : ''}
      <form style={formStyle} method="POST">
        <label htmlFor="student_no" style={labelStyle}>
          Student Number:
        </label>
        <input type="text" name="student_no" id="student_no" style={inputStyle} onChange={e => setName(e.target.value)} />  
        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <input type="password" name="password" style={inputStyle} onChange={e => setPassword(e.target.value)} />
        <button type="submit" style={buttonStyles} className="submit-button" onClick={submitHandler}>Login</button>
      </form>
    </div>
  )
}

export default Login
