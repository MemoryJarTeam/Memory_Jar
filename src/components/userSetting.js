import React from 'react'

import userPic from '../image/user.png'
import imgFile from '../image/image.png'
import { useNavigate } from 'react-router-dom';

class UserSettingsClass extends React.Component{
   constructor(props){
      super(props);
      this.state = {name: '', email: '', dataIsReturned: false, userInfo: []}; 
   }
   
   componentDidMount(){
      fetch("http://localhost:5000/user-loged")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userInfo: userData[0]});
         this.setState({name: userData[0].name});
         this.setState({email: userData[0].email});
         this.setState({dataIsReturned: true});
      });
   }

   handleChange = (event) =>{
      this.setState({[event.target.name]: event.target.value});
   }

   handleSubmit = (event) =>{
      let userEdit = {
         "id": this.state.userInfo.id,
         "name": this.state.name,
         "email": this.state.email
      };

      fetch("http://localhost:5000/user-setting", {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(userEdit)
      }).then(function(response){
         return response.json();
      });
      this.props.navigate('/main-page');
      event.preventDefault();
   }

   render(){
      if(this.state.dataIsReturned){
         return(
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
                     <input type="text" name="name" id="name" placeholder="User Name" defaultValue={this.state.userInfo.name} onChange={this.handleChange}  />
                     <input type="email" name="email" id="email" placeholder="User Email" defaultValue={this.state.userInfo.email} onChange={this.handleChange} />
                  </aside>
                  <input type="submit" value="Edit"/>
               </form>
            </section>
         )
      }
      else{
         return(
            <h1>Loading...</h1>
         )
      }
   }
};

export function UserSettings(props){
   const navigate = useNavigate();
   return(<UserSettingsClass navigate={navigate} />)
}