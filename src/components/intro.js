import React from 'react';
import { useNavigate } from 'react-router-dom';

class IntroClass extends React.Component{
   
}

export function Intro(props){
   const navigate = useNavigate();
   return(<IntroClass navigate={navigate} />)
}