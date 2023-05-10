import React from "react";
import { useNavigate } from "react-router-dom";

class MemoryBeadClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            level: "",
            dataIsReturned: false,
        };
    }

    MemoryBeadList = () => {
        if (this.state.dataIsReturned) {
            return (
                // {
                //     // this.state.
                // }
                <div className="bead"></div>
            );
        }
        // render(){
        //     return(

        //     )
        // }
    };
}

export function MemoryBead(props) {
    const navigate = useNavigate();
    return <MemoryBeadClass navigate={navigate} />;
}
