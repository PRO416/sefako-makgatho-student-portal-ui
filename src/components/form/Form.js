import React, { useState } from 'react';
import Logo from './Logo';
import Login from './Login';

function Form(props) {
  const styles = {
    height: '100vh',
    width: '100vw',
    background: 'rgb(255, 94, 1)'
  }

  let [data, setData] = useState([]);

  const transfer = (dataTransfer) => {
    setData(dataTransfer);
    props.transfer(data);
  }

  return (
    <div className="form" style={styles}>
      <Logo />
      <Login transfer={transfer}/>
    </div>
  )
}

export default Form;