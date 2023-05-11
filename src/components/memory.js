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
         memoryInfo: []
      }
   }

   componentDidMount(){
      fetch("http://localhost:5000/memory-api")
      .then((response)=>response.json())
      .then((memoryData)=>{
         fetch("http://localhost:5000/current-memory")
         .then((response)=>response.json())
         .then((currentMemoryId)=>{
            memoryData.forEach((memory)=>{
               if(memory.memoryId === currentMemoryId[0].currentMemoryId){
                  this.setState({memoryInfo: memory});
               }
            })
            this.setState({dataIsReturned: true});
         });
      });
   };

   render(){
      if(this.state.dataIsReturned){
         return(
            <section className="memory">
               <nav className="backBtn">
                  <img
                     src={iconArrowLeft}
                     alt="arrow-left-icon"
                     onClick={"a"}
                  />
               </nav>
               <main className="memory-main">
                  <article className="modalBox">
                     <section>
                           <button className="fa-solid fa-arrow-left"></button>
                           <p>{this.state.memoryInfo.date}</p>
                           <button className="fa-solid fa-arrow-right"></button>
                     </section>
                     <aside>
                           <small> {this.state.memoryInfo.keyWord} </small>
                           <img src={memoryImg} alt="memory" />
                           <p>
                              {this.state.memoryInfo.text}
                           </p>
                     </aside>
                     <span
                           >by.
                           <img src={profile} alt="profile" />
                           Day
                     </span>
                  </article>
               </main>
               <footer>
                  <section>
                     <button className="icon">
                           <i className="fa-solid fa-house-chimney"></i>
                     </button>
                     <button className="icon">
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

export function Memory(props){
   const navigate = useNavigate();
   return(<MemoryClass navigate={navigate} />)
}