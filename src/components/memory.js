import React from 'react';
import { useNavigate } from "react-router-dom";

import iconArrowLeft from '../image/icon/icon-arrow-left.svg'
import memoryImg from '../image/memory.jpg'
import profile from '../image/profile.jpg'

class MemoryClass extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         dataIsReturned: false, 
         memoryPosition: null,
         memoryLength: null,
         memoryInfo: []
      }
   }

   componentDidMount(){
      fetch("http://localhost:5000/current-jar")
      .then((response)=>response.json())
      .then((jarData)=>{
         this.setState({memoryLength: jarData[0].memoryList.length});
         fetch("http://localhost:5000/current-memory")
         .then((response)=>response.json())
         .then((memoryData)=>{
            this.setState({memoryPosition: memoryData[0].currentMemoryId});
            this.setState({memoryInfo: jarData[0].memoryList[memoryData[0].currentMemoryId]});
            this.setState({dataIsReturned: true});
         });
      });
   };

   handleBack = ()=> {
      this.props.navigate(-1);
   }

   handleMainPage = ()=>{
      this.props.navigate("/main-page");
   }

   handleUser = ()=>{
      this.props.navigate("/user-setting");
   }

   handleChangeMemory = (props)=>{
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
      this.props.navigate(0);
   };

   Button = (props)=>{
      if(props.position === "back" && this.state.memoryPosition > 0){
         return(
            <button 
               id={this.state.memoryPosition-1} 
               onClick={this.handleChangeMemory} 
               className={props.class}
            ></button>
         )
      }
      else if(props.position === "front" && this.state.memoryPosition < this.state.memoryLength-1){
         return(
            <button 
               id={this.state.memoryPosition+1} 
               onClick={this.handleChangeMemory} 
               className={props.class}
            ></button>
         )
      }
      else{
         return(
            <button 
                disabled
                className={props.class}
             ></button> 
          )
      }
   }

   render(){
      if(this.state.dataIsReturned){
         console.log(this.state.memoryInfo)
         return(
            <section className="memory">
               <nav className="backBtn">
                  <img
                     src={iconArrowLeft}
                     alt="arrow-left-icon"
                     onClick={this.handleBack}
                  />
               </nav>
               <main className="memory-main">
                  <article className="modalBox">
                     <section>
                        <this.Button
                           position="back"
                           class={"fa-solid fa-arrow-left"}
                        />
                        <p>{this.state.memoryInfo.date}</p>
                        <this.Button
                           position="front"
                           class={"fa-solid fa-arrow-right"}
                        />
                     </section>
                     <aside>
                           <small style={{backgroundColor:this.state.memoryInfo.level}}> {this.state.memoryInfo.keyWord} </small>
                           <img src={memoryImg} alt="memory" />
                           <p>
                              {this.state.memoryInfo.text}
                           </p>
                     </aside>
                     {/* <span
                           >by.
                           <img src={profile} alt="profile" />
                           Day
                     </span> */}
                  </article>
               </main>
               <footer>
                  <section>
                     <button className="icon">
                           <i className="fa-solid fa-house-chimney"  onClick={this.handleMainPage}></i>
                     </button>
                     <button className="icon">
                           <i className="fa-solid fa-user" onClick={this.handleUser}></i>
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

export function Memory(props){
   const navigate = useNavigate();
   return(<MemoryClass navigate={navigate} />)
}