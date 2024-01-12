import React, { useState} from 'react'
import axios from 'axios'
import Alert from '../alert/alert'
import './login.css'

export default function Login() {

  const intialFormData = {

    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(intialFormData);
  const [successMessage, setSuccesssMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert,setShowAlert] = useState(false);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const response = await axios.post('http://localhost:4040/login',formData);
      const {token}=response.data;
      console.log('Login Successful. Token',token);

      setSuccesssMessage('Login Successfully');
      setErrorMessage('');
      setFormData(intialFormData);// reset data 
      setShowAlert(true);
    }catch(error){
      console.log('Login Failed',error);
      setErrorMessage('Login Failed',error.response?.data?.error || 'Unknown error');
      setShowAlert(true);
    }
  }
  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <div>
       <h2>Login Form</h2>

      <form onSubmit={handleSubmit} >
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input className="input-field" type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange}></input>
        </div>

      <div className="input-container">
         <i className="fa fa-key icon"></i>
         <input className="input-field" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange}></input>
      </div>

      {showAlert && (
         <Alert message={successMessage || errorMessage} onClose={closeAlert} />
      )}

      <button type="submit" className="button">Login</button>
      </form>
    </div>
  )
}
