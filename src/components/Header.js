import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import {firebase} from '../firebase/firebase';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <h3 className="header__title--user">
        <img className="user-icon" width="30" height="30" src={firebase.auth().currentUser.photoURL} />
          { firebase.auth().currentUser.displayName }
        </h3>
    <Link className="header__title" to="/dashboard">
      <h1>Expensify</h1>
    </Link>
    <Link className="header__title" to="/Currency">
      <h1>Currency Converter</h1>
      </Link>
      <button className="button button--link" onClick={startLogout}>Logout</button>
  </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);
