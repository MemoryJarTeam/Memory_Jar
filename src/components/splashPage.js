import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import jarCharacter2 from '../image/jarCharacter-2.png'

class SplashPageClass extends React.Component {
    // useEffect(() => {
    //     setTimeout(() => {
    //             this.props.navigate("/intro");
    //     }, 2000);
    // }, []);

    componentDidMount(){
        setTimeout(() => {
            this.props.navigate("/intro");
        }, 2000);
    }
    // setTimeout(() => {
    // }, 2000);

    render() {
        return (
            <section>
                <figure class="splash">
                    <img src={jarCharacter2} alt="Jar"/>
                </figure>
                {/* <script src="./script/index.js" defer></script> */}
            </section>
        );
    }
}

export function SplashPage(props) {
    const navigate = useNavigate();
    return <SplashPageClass navigate={navigate} />;
}
