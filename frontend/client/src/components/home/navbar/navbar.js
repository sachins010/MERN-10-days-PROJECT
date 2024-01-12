import React from "react";
import './navbar.css';

const navbar = ({onPageChange})=>{
    const handlePageChange = (page)=>{
        console.log('onPageChange',onPageChange);

        if(typeof onPageChange === 'function'){
            onPageChange(page);
        }else{
            console.log('onPageChange is not function');
        }
    };

    return(
        <>
        <div>
        {/* <nav className="navbar">
            <ul>
                <li onClick={()=>handlePageChange('home')}>Home</li>
                <li onClick={()=>handlePageChange('about')}>About</li>
                <li onClick={()=>handlePageChange('contact us')}>Contact us</li>
            </ul>
        </nav> */}

        <ul>
            <li><a onClick={()=>handlePageChange('home')}>Home</a></li>
            <li><a onClick={()=>handlePageChange('about')}>About</a></li>
             <li><a onClick={()=>handlePageChange('contact us')}>Contact us</a></li>
             <li><a onClick={()=>handlePageChange('login')}>Login</a></li>
             <li><a onClick={()=>handlePageChange('registration')}>Register</a></li>
             
           
             {/* <li style="float:right"><a class="active" href="#about">About</a></li> */}
        </ul>
        </div>
        
        </>
        
    );
};

export default navbar;



