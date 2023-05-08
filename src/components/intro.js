import React from 'react';
import { useNavigate } from 'react-router-dom';

import jarCharacter2 from '../image/jarCharacter-2.png'

class IntroClass extends React.Component{
   handleLogIn = ()=>{
      this.props.navigate('/login');
   }

   handleSignUp = ()=>{
      this.props.navigate('/sign-up');
   }

   render(){
      return(
         <section className="intro">
            <figure>
                <img
                    src={jarCharacter2}
                    alt="jarCharacter"
                />
                <figcaption>
                    <h1>Memory Jar</h1>
                </figcaption>
            </figure>
            <article>
                <button className="logInBtn" onClick={this.handleLogIn} >Log In with Email</button>
                <button className="signUpBtn" onClick={this.handleSignUp} >Sign Up Our Jar!</button>
            </article>
        </section>
      )
   }
}

export function Intro(props){
   const navigate = useNavigate();
   return(<IntroClass navigate={navigate} />)
}