import React , {Fragment, useState} from 'react'
import {Link} from 'react-router-dom';

import  axios from 'axios';  
export const Login = () => {
    
    const [formData, setFormData]= useState({
        email: '',
        password: '',
        confirmPassword:''
    }); 


    const { email,password} = formData; 

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value})
        
    }

    const onSubmit  = async (e) => {
        e.preventDefault(); 
        console.log('Success'); 
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
    )
}