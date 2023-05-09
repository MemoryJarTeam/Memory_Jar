import React from 'react'
import { useNavigate } from "react-router-dom";

import iconArrowLeft from '../image/icon/icon-arrow-left.svg'
import heartRegular from '../image/icon/heart-regular.svg'
import heartSolid from '../image/icon/heart-solid.svg'
import iconImgButton from '../image/icon/icon-img-button.svg'

class MemoryWritingClass extends React.Component{
   constructor(props){
      super(props);
      this.state = {dataIsReturned: false}
   }

   componentDidMount(){
      fetch("http://localhost:5000/user-loged")
      .then((response)=>response.json())
      .then((userData)=>{
         this.setState({userInfo: userData[0]});
         if(userData[0].jar.length !== 0){
            this.setState({hasJars: true});
         }
         this.setState({dataIsReturned: true});
      });
   }

   handleBack = ()=>{
      this.props.navigate('/main-page');
   }

   handleSubmit = ()=>{
      this.props.navigate('/main-page');
   }

   render(){
      return(
         <section className="memoryWriting">
            <nav className="backBtn">
                <img
                    src={iconArrowLeft}
                    alt="arrow-left-icon"
                    onClick={this.handleBack}
                />
            </nav>
            <main>
                <section onSubmit={this.handleSubmit} className="modalBox">
                    {/* <h3 id="todayDate">1</h3> */}
                    <form  className="memoryInputBox">
                        <aside>
                            <p>Keyword Title</p>
                            <input
                                type="text"
                                maxlength="20"
                                placeholder="Summarize your memory in 20 letters!"
                            />
                        </aside>
                        <aside>
                            <p>Choose your memory color!</p>
                            <section className="colorBox">
                                <img
                                    src={heartRegular}
                                    alt="empty-heart"
                                />
                                <article className="colorBtn">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </article>
                                <img
                                    src={heartSolid}
                                    alt="full-heart"
                                />
                            </section>
                        </aside>
                        <aside>
                            <textarea placeholder="Write your memory"></textarea>
                            <label
                                htmlFor="updateMemoryImg"
                                className="updateMemoryImg"
                            >
                                <img
                                    src={iconImgButton}
                                    alt="upload-img"
                                />
                            </label>
                            <input
                                onchange="imageUpload(event)"
                                id="updateMemoryImg"
                                type="file"
                                accept="image/*"
                            />
                        </aside>
                        <aside>
                            <input type="submit" value="Add" />
                        </aside>
                    </form>
                    <article className="uploadImgScreen"></article>
                </section>
            </main>
        </section>
      )
   }

}

export function MemoryWriting(props){
   const navigate = useNavigate();
   return(<MemoryWritingClass navigate={navigate}/>)
}