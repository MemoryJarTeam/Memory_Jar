import React from 'react';
import { useNavigate } from 'react-router-dom';

import jarCharacter2 from '../image/jarCharacter-2.png';
import iconArrowLeft from '../image/icon/icon-arrow-left.svg'

class LogInClass extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         email: '', 
         password: '', 
         userList: []
      };
   };

   componentDidMount(){
      fetch("http://localhost:5000/user-api")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userList: userData});
      });
   };

   handleBack = ()=>{
      this.props.navigate('/intro');
   }

   handleChange = (event) =>{
      this.setState({[event.target.name]: event.target.value});
   };

   handleSubmit = (event) =>{
      event.preventDefault();
      if(this.state.email === "" || this.state.password === ""){
         alert("Please fill in Email and Password");
      }
      else{
         this.state.userList.forEach((user)=>{
            if(user.email === this.state.email && user.password === this.state.password){
               fetch("http://localhost:5000/user-login", {
                  method: 'POST',
                  headers: {
                     'Content-type': 'application/json'
                  },
                  body: JSON.stringify(user)
               }).then(function(response){
                  return response.json();
               });
               this.props.navigate('/main-page');
            }
         });
      }
   };
   
   render(){
      return(
            <section className='loginNav'>
               <nav className="backBtn">
                  <img
                     src={iconArrowLeft}
                     alt="arrow-left-icon"
                     onClick={this.handleBack}
                  />
               </nav>
                        <section className="logIn">
               <figure>
                  <img src={jarCharacter2} alt="Jar Logo"/>
               </figure>
               <form onSubmit={this.handleSubmit}>
                  <aside>
                     <input type="email" name="email" id="email" placeholder="Email" value={this.state.value} onChange={this.handleChange}/>
                     <input type="password" name="password" id="password" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
                  </aside>
                  <input type="submit" value="Log In" />
               </form>
                        </section>
            </section>
      )
   }
};

export function LogIn(props){
   const navigate = useNavigate();
   return(<LogInClass navigate={navigate}/>)
}