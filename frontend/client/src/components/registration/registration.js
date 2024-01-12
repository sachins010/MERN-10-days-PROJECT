import React, { useState } from 'react'
import axios from 'axios'
import Alert from '../alert/alert'
import './registration.css'

export default function Registration() {

    const intialFormData = {
        username: '',
        password: '',
        email: '',
        mobile_No: '',
        address: '',
    };

    const [formData, setFormData] = useState(intialFormData);
    const[successMessage, setSuccesssMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');
    const[showAlert, setShowAlert] = useState(false);

    const handleChange = (e)=>{
        const{name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            await axios.post('http://localhost:4040/register',formData);
            setSuccesssMessage('Registered Successfully');
            setFormData(intialFormData);//  reset the form data
            setShowAlert(true);
        }catch(error){
            console.error('Registration failed:', error);
            setErrorMessage('Registration Failed');
            setShowAlert(true)
        }
    };

    const closeAlert= ()=>{
        setShowAlert(false);
    }
  return (
    <div>
      <h2>Registrtation Form</h2>

      <form onSubmit={handleSubmit} >
      <div className="input-container">
         <i className="fa fa-user icon"></i>
         <input className="input-field" type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange}></input>
      </div>

      <div className="input-container">
         <i className="fa fa-key icon"></i>
         <input className="input-field" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}></input>
      </div>

      <div className="input-container">
         <i className="fa fa-envelope icon"></i>
         <input className="input-field" type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
      </div>

      <div className="input-container">
         <i className="fa fa-key icon"></i>
         <input className="input-field" type="text" placeholder="Mobile Number" name="mobile_No" value={formData.mobile_No} onChange={handleChange}></input>
      </div>

      <div className="input-container">
         <i className="fa fa-key icon"></i>
         <input className="input-field" type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange}></input>
      </div>
    
      {showAlert && (
          <Alert message={successMessage || errorMessage} onClose={closeAlert} />
        )}
     

      <button type="submit" className="button">Register</button>
      </form>


    </div>
  
  )
}
