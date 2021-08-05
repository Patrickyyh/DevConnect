import React , {Fragment, useState} from 'react'
import  axios from 'axios';  

// import Component
import Alert from '../layout/Alert';


// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types'; 



 const Register = (props) => {
    
    const [formData, setFormData]= useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:''
    }); 


    const {name, email,password,confirmPassword} = formData; 

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
        
    }

    const onSubmit  = async (e) => {
        e.preventDefault(); 
        if(password !== confirmPassword){
            props.setAlert('Passwords do not match','danger')
        }else{
            
        }
    }

    
    return (
    <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit = {e => onSubmit(e)}>
          <div className="form-group">
            <input type="text" 
                   placeholder="Name" 
                   name="name" 
                   required  
                   value = {name}
                   onChange = {term => onChange(term)}/>
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email"  value = {email}
                   onChange = {term => onChange(term)} required />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              minLength="6"
              value = {confirmPassword}
              onChange = {term => onChange(term)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
    </Fragment>
    )
}; 

Register.propTypes = {
    setAlert: PropTypes.func.isRequired
}
export default connect(null,{setAlert})(Register); 
