import React from 'react'
import { useNavigate } from "react-router-dom";

import jar from '../image/jar.png'

class MainPageClass extends React.Component{
   constructor(props){
      super(props)
      this.state = {dataIsReturned: false, hasJars: false, userInfo: [], currentJarInfo: []}
   }

   componentDidMount(){
      fetch("http://localhost:5000/user-loged")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userInfo: userData[0]});
         if(userData[0].jar.length !== 0){
            this.setState({hasJars: true});
            fetch("http://localhost:5000/current-jar")
            .then((response)=>response.json())
            .then((currentJarId)=>{
               userData[0].jar.forEach((jar)=>{
                  if(jar.jarId === currentJarId[0].currentJarId){
                     this.setState({currentJarInfo: jar});
                  }
               })
            });
         }
         this.setState({dataIsReturned: true});
      });
   }

   handleNewJar = ()=>{
      this.props.navigate("/new-jar");
   }

   handleNewMemory = ()=>{
      this.props.navigate("/new-memory");
   }

   handleUser = ()=>{
      this.props.navigate("/user-setting");
   }

   handleSelectJar = (props)=>{
      let newCurrentJarId = {
         "newCurrentJarId": parseInt(props.target.id)
      };

      fetch("http://localhost:5000/change-current-jar", {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(newCurrentJarId)
      }).then(function(response){
         return response.json();
      });
      this.props.navigate(0);
   }

   JarName = (props)=>{
      return(
         <li>
            <button id={props.id} onClick={this.handleSelectJar}>{props.title}</button>
         </li>
      )
   }

   JarList = () =>{
      if(this.state.dataIsReturned){
         return(
            <ul id="menu">
               <li>
                  <button onClick={this.handleNewJar}>Add New Jar</button>
               </li>
               {
                  this.state.userInfo.jar.map((jar)=>{
                     return (
                        <this.JarName 
                           key={jar.jarId}
                           id={jar.jarId}
                           title={jar.name}
                        />
                     )
                  })
               }
            </ul>
         )
      }
   }

   render(){
      if(this.state.dataIsReturned){
         if(this.state.hasJars){
            return(
               <section className="jarexist">
                  <nav>
                        <section id="hamburger">
                           <input type="checkbox" />
                           <span></span>
                           <span></span>
                           <span></span>
                           <this.JarList />
                        </section>
                  </nav>
                  <main className="jarexist-main">
                        <p>{this.state.currentJarInfo.name}</p>
                        <article>
                           <img src={jar} alt="jar" />
                           <p>30 days left</p>
                        </article>
                        <button onClick={this.handleNewMemory}>
                           <i className="fa-solid fa-plus"></i>
                        </button>
                  </main> 
                  <footer>
                        <section>
                           <button>
                              <i className="fa-solid fa-house-chimney"></i>
                           </button>
                           <button>
                              <i className="fa-solid fa-user" onClick={this.handleUser} ></i>
                           </button>
                        </section>
                  </footer>
               </section>
            )
         }
         else{
            return(
               <section className="addJar">
                     <nav>
                        <section id="hamburger">
                           <input type="checkbox" />
                           <span></span>
                           <span></span>
                           <span></span>
                           <ul id="menu">
                              <li>
                                 <button onClick={this.handleNewJar}>Add New Jar</button>
                              </li>
                           </ul>
                        </section>
                     </nav>
                     <main>
                        <section>
                           <h3>You don't have any Jar!</h3>
                           <h4>Let’s make your new memory jar :)</h4>
                        </section>
                        <button onClick={this.handleNewJar}>Make a new Jar</button>
                     </main>
                     <footer>
                        <section>
                           <button>
                              <i className="fa-solid fa-house-chimney"></i>
                           </button>
                           <button>
                              <i className="fa-solid fa-user" onClick={this.handleUser}></i>
                           </button>
                        </section>
                     </footer>
               </section>
            )
         }
      }
      else{
         return(
            <h1>Loading...</h1>
         )
      }
   };
};

export function MainPage(props){
   const navigate = useNavigate();
   return(<MainPageClass navigate={navigate} />)
}