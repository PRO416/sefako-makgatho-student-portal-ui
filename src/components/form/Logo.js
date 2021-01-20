import React from 'react';
import logo from '../../images/logo.jpg';

function Logo() {
  const styles = {
    height: '15vh',
    width: '100vw',
    background: 'linear-gradient(to right, #fff 55%, rgb(255, 94, 1), rgb(255, 94, 1))',
    display: 'flex',
    justifyContent: 'flex-start'
  }

  const imgStyles = {
    height: '100%',
  }

  const headerStyles = {
    textTransform: 'uppercase',
    display: 'grid',
    placeItems: 'center',
    marginLeft: '20vw',
    fontSize: '4rem',
    color: 'rgb(12, 25, 136)'
  }

  return (
    <div className="form-logo" style={styles}>
      <img src={logo} alt="" style={imgStyles} />
        <h1 style={headerStyles}>Login</h1>
    </div>
  )
}

export default Logo;