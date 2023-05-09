import React from 'react'
import { useNavigate } from 'react-router-dom';

import iconArrowLeft from '../image/icon/icon-arrow-left.svg'

class AddJarClass extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         name: '',
         date: '',
         color: '#ffffff',
         dataIsReturned: false,
         userInfo: [],
         lastJarId: null
      }; 
   }
   
   componentDidMount(){
      fetch("http://localhost:5000/user-loged")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userInfo: userData[0]});
         this.setState({lastJarId: userData[1].lastJarId});
         this.setState({dataIsReturned: true});
      });
   }

   handleBack = ()=>{
      this.props.navigate('/main-page');
   }

   handleChange = (event) =>{
      this.setState({[event.target.name]: event.target.value});
   }

   handleSubmit = (event) =>{
      event.preventDefault();
      
      let newJar = {
         "jarId": this.state.lastJarId+1,
         "userId": this.state.userInfo.id,
         "name": this.state.name,
         "date": this.state.date,
         "color": this.state.color
      };

      fetch("http://localhost:5000/new-jar", {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(newJar)
      }).then(function(response){
         return response.json();
      });
      this.props.navigate('/main-page');
   }

   render(){
      if(this.state.dataIsReturned){
         return(
            <section className="addJarModal">
               <nav className="backBtn">
                  <img
                     src={iconArrowLeft}
                     alt="arrow-left-icon"
                     onClick={this.handleBack}
                  />
               </nav>
               <main>
                  <section className="modalBox">
                     <form onSubmit={this.handleSubmit} className="JarInputBox">
                        <aside>
                           <p>Jar Name</p>
                           <input
                              type="text"
                              name='name'
                              maxLength="20"
                              placeholder="Put a name on the Jar!"
                              value={this.state.value} 
                              onChange={this.handleChange}
                           />
                        </aside>
                        <aside>
                           <p>Opening Date</p>
                           <input
                              type="number"
                              name='date'
                              max="365"
                              placeholder="Put amount of days to open the jar"
                              value={this.state.value} 
                              onChange={this.handleChange}
                           />
                        </aside>
                        <aside>
                           <p>Choose the Color of the Jar</p>
                           <input 
                              type="color" 
                              name='color'
                              value={this.state.value} 
                              onChange={this.handleChange}
                           />
                        </aside>
                        <aside>
                           <input type="submit" value="Create a Jar" />
                        </aside>
                     </form>
                  </section>
               </main>
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

export function AddJar(props){
   const navigate = useNavigate();
   return(<AddJarClass navigate={navigate} />)
}