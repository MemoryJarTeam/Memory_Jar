import React from 'react'
import { useNavigate } from "react-router-dom";

import jarCap from '../image/cap.svg'

class MainPageClass extends React.Component{
   
   constructor(props){
      super(props)
      this.state = {
         dataIsReturned: false, 
         hasJars: false, 
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
               this.setState({hasJars: true});
            });
         }
         this.setState({dataIsReturned: true});
      });
   }

   handleMainPage = ()=>{
      this.props.navigate("/main-page");
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

   handleResult = ()=>{
      let made = this.state.currentJarInfo.madeDate;
      let now = new Date();
      let madeArr = made.split('.')
      let nowYear = now.getFullYear();   // 연도
      let nowMonth = now.getMonth()+1;   // 월    
      let nowDay = now.getDate();        // 일
      let stDate = new Date(madeArr[0], madeArr[1], madeArr[2]);
      let endDate = new Date(nowYear, nowMonth, nowDay);
      
      let btMs = endDate.getTime() - stDate.getTime() ;
      let btDay =  btMs / (1000*60*60*24) ;
      let dDate = this.state.currentJarInfo.date - btDay;
      console.log(dDate)
      if(dDate === 0){
         this.props.navigate("/keyword");
      }

   }

   JarName = (props)=>{
      return(
         <li>
            <button id={props.id} onClick={this.handleSelectJar}>{props.title}</button>
         </li>
      )
   }

   JarList = () =>{
      if(this.state.dataIsReturned && this.state.hasJars){
         return(
            <ul id="menu">
               <li>
                  <button className='navAddJarBtn' onClick={this.handleNewJar}>Add New Jar</button>
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

   MemoryBead = (props)=>{
      return(
         <div className="bead" style={{backgroundColor: props.color}}></div>
      )
   }

   MemoryArticle = ()=>{
      if(this.state.dataIsReturned && this.state.hasJars){
         let memory = this.state.currentJarInfo.memoryList;
         if(memory.length<37){
            return(
               <article>
                  {
                     memory.map((mem)=>{
                        return(
                           <this.MemoryBead
                              key={mem.memoryId}
                              color={mem.level}
                           />
                        )
                     })
                  }
               </article>
            )
         } else {
            // console.log(memory)
            let newMemoryList = memory.slice(0,36)
            console.log(newMemoryList)
            return (
               <article>
                  {
                     newMemoryList.map((mem)=>{
                        return(
                           <this.MemoryBead
                              key={mem.memoryId}
                              color={mem.level}
                           />
                        )
                     })
                  }
               </article>
            )
         }
      }
   }

   DdayCalculate = () =>{
      console.log(this.state.currentJarInfo.madeDate)
      let made = this.state.currentJarInfo.madeDate;
      let now = new Date();
      let madeArr = made.split('.')
      let nowYear = now.getFullYear();   // 연도
      let nowMonth = now.getMonth()+1;   // 월    
      let nowDay = now.getDate();        // 일
      let stDate = new Date(madeArr[0], madeArr[1], madeArr[2]);
      let endDate = new Date(nowYear, nowMonth, nowDay);
      
      let btMs = endDate.getTime() - stDate.getTime() ;
      let btDay =  btMs / (1000*60*60*24) ;
      let dDate = this.state.currentJarInfo.date - btDay;
      
      // console.log(`Made date? ${madeArr}`)
      // console.log(`How many days after? ${this.state.currentJarInfo.date}`)
      // console.log(`how many days left? ${dDate}`);
      if (dDate !== 0) {
         return (
            <p>D - {dDate}</p>
         )
      } else {
         return (
            <>
               <p>D-day</p>
               <p>Click the Jar now!</p>
            </>
         )
      }

   }

   Dday = () =>{
      return (
         <span className='DDate' id='remainTime'>
            <this.DdayCalculate />
         </span>
      )
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
                        <article className='jarArticle'>
                           <section className='jarGroup' onClick={this.handleResult}>
                              <img src={jarCap} alt='cap' className='jarCap'/>
                              <div className='jarCapColor' style={{backgroundColor: this.state.currentJarInfo.color}}></div>
                              <div className='jarBottle'>
                                 <this.MemoryArticle/>
                              </div>
                              <div className='hoverDiv'>{this.state.currentJarInfo.memoryList.length} memories!</div>
                           </section>
                           <p><this.Dday/></p>
                        </article>
                        <button onClick={this.handleNewMemory}>
                           <i className="fa-solid fa-plus"></i>
                        </button>
                  </main> 
                  <footer>
                        <section>
                           <button>
                              <i className="fa-solid fa-house-chimney" onClick={this.handleMainPage}></i>
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
                              <i className="fa-solid fa-house-chimney" onClick={this.handleMainPage}></i>
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