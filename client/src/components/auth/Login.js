import React , {Fragment, useState} from 'react'
import {Link,Redirect} from 'react-router-dom';

import  axios from 'axios';  
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'; 



 const Login = (props) => {
    
    const [formData, setFormData]= useState({
        email: '',
        password: '',
        confirmPassword:''
    }); 


    const { email,password } = formData; 

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
        
    }

    const onSubmit  = async (e) => {
        e.preventDefault(); 
        props.login(email,password);
        
    }

    // Redirect if logged in 
    if(props.isAuthenticated){
      return <Redirect to ="/dashboard" /> 
    }

    
    return (
    <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
        <form className="form" onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email"  value = {email}
                   onChange = {term => onChange(term)} required />

          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value = {password}
              onChange = {term => onChange(term)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to ='/register'>Sign up</Link>
        </p>
    </Fragment>
    );
};



Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps,{login})(Login); 
