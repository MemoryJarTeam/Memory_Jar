import React from 'react';
import { useNavigate } from "react-router-dom";

import iconArrowLeft from '../image/icon/icon-arrow-left.svg'

class KeyWordClass extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         dataIsReturned: false, 
         userInfo: [], 
         currentJarInfo: []
      }
   }

   componentDidMount(){
      fetch("http://localhost:5000/user-loged")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userInfo: userData[0]});
         if(userData[0].jar.length !== 0){
            fetch("http://localhost:5000/current-jar")
            .then((response)=>response.json())
            .then((currentJar)=>{
               this.setState({currentJarInfo: currentJar[0]});
               this.setState({dataIsReturned: true});
            });
         }
      });
   };

   handleMainPage = ()=>{
      this.props.navigate("/main-page");
   };

   handleCalendar = ()=>{
      this.props.navigate("/calendar");
   };

   handleSelectMemory = (props)=>{
      let newCurrentMemoryId = {
         "newCurrentMemoryId": parseInt(props.target.id)
      };

      fetch("http://localhost:5000/change-current-memory", {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: JSON.stringify(newCurrentMemoryId)
      }).then(function(response){
         return response.json();
      });
      this.props.navigate("/memory");
   };

   KeyWordButton = (props)=>{
      return(
         <button id={props.id} onClick={this.handleSelectMemory} style={{backgroundColor:props.keyBgColor}}>{props.keyWord}</button>
      )
   }

   KeyWordArticle = ()=>{
      if(this.state.dataIsReturned){
         let memory = this.state.currentJarInfo.memoryList;
         let counter = 0;
         return(
            <article>
               {
                  memory.map((mem)=>{
                     console.log(mem.level)
                     return(
                        <this.KeyWordButton
                        key={counter}
                        id={counter++}
                        keyWord={mem.keyWord}
                        keyBgColor={mem.level}
                        />
                     )
                  })
               }
            </article>
         )
      }
   }


   render(){
      if(this.state.dataIsReturned){
         return(
            <section className="keyword">
               <nav className="backBtn">
                   <img
                       src={iconArrowLeft}
                       alt="arrow-left-icon"
                       onClick={this.handleMainPage}
                   />
               </nav>
               <main className="keyword-main">
                   <h3>{this.state.currentJarInfo.name}</h3>
                   <section>
                       <button className="calendarBtn" onClick={this.handleCalendar}>Calendar</button>
                       <button className="keywordBtn">Key word</button>
                   </section>
                   <this.KeyWordArticle/>
               </main>
               <footer>
                   <section>
                       <button>
                           <i className="fa-solid fa-house-chimney"></i>
                       </button>
                       <button>
                           <i className="fa-solid fa-user"></i>
                       </button>
                   </section>
               </footer>
           </section>
         )
      }
      else{
         return(<h1>Loading...</h1>)
      }
   }
}

export function KeyWord(props){
   const navigate = useNavigate();
   return(<KeyWordClass navigate={navigate} />)
}