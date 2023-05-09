import React from "react";
import { useNavigate } from "react-router-dom";
import jarCharacter2 from "../image/jarCharacter-2.png";

class SplashPageClass extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigate("/intro");
        }, 2000);
    }
    render() {
        return (
            <section>
                <figure class="splash">
                    <img src={jarCharacter2} alt="Jar" />
                </figure>
            </section>
        );
    }
}

export function SplashPage(props) {
    const navigate = useNavigate();
    return <SplashPageClass navigate={navigate} />;
}
