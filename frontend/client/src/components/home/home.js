import React from "react";
import './home.css';
import About from "../about/about";
import Navbar from './navbar/navbar'
import Header from "./header/header";
import Footer from "./footer/footer";
import Registration from "../registration/registration";
import Homeimage from "../images/homeimage";
import Login from "../login/login";
const home = ({currentPage , onPageChange})=>{
    return(
        <>
            <div>
            <Header/>
            <Navbar onPageChange={onPageChange}></Navbar>
            {currentPage === 'about' &&<About/>}
            {currentPage === 'registration' && <Registration/>}
            {currentPage === 'login' && <Login/>}
            {/* <Homeimage/> */}

           
            
            <Footer/>

            </div>
            

        </>
    );
};

export default home;