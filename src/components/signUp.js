import React from 'react'
import { useNavigate } from 'react-router-dom';

import userPic from '../image/user.png'
import imgFile from '../image/image.png'
import iconArrowLeft from '../image/icon/icon-arrow-left.svg'

class SignUpClass extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         name: '', 
         email: '', 
         password: '', 
         confirmPass: '', 
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
   }

   handleSubmit = (event) =>{
      let counter = 0;
      let lastUser = this.state.userList.length-1;
      if(this.state.password !== this.state.confirmPass){ 
         alert("Password and Confirm Password must be same"); 
         return;
       }
      this.state.userList.forEach((user)=>{
         if(user.email === this.state.email){
            alert("This user exist");
            return false;
         }
         else if(counter === lastUser){
            let newUser = {
               "id": this.state.userList[lastUser].id+1,
               "name": this.state.name,
               "email": this.state.email,
               "password": this.state.password
            };
            fetch("http://localhost:5000/new-user", {
               method: 'POST',
               headers: {
                  'Content-type': 'application/json'
               },
               body: JSON.stringify(newUser)
            }).then(function(response){
               return response.json();
            });
            this.props.navigate('/sign-up');
         }
         counter++;
      });
      event.preventDefault();
   }

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
               <form onSubmit={this.handleSubmit}>
                  <figure className="userPic">
                     <img src={userPic} alt="User Pic"/>
                     <label htmlFor="userPic">
                        <img src={imgFile} alt="Icon"/>
                     </label>
                     <input type="file" accept="image/*" name="userPic" id="userPic"/>
                  </figure>
                  <aside>
                     <input type="text" name="name" id="name" placeholder="User Name" value={this.state.value} onChange={this.handleChange}/>
                     <input type="email" name="email" id="email" placeholder="User Email" value={this.state.value} onChange={this.handleChange}/>
                     <input type="password" name="password" id="password" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
                     <input type="password" name="confirmPass" id="confirmPass"  placeholder="Confirm Password" value={this.state.value} onChange={this.handleChange}/>
                  </aside>
                  <input type="submit" value="Sign Up"/>
               </form>
            </section>
         </section>
      )
   }
}

export function SignUp(props){
   const navigate = useNavigate();
   return(<SignUpClass navigate={navigate} />)
}