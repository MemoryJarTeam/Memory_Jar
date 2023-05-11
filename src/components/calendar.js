import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import iconArrowLeft from "../image/icon/icon-arrow-left.svg";

class CalendarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIsReturned: false,
            userInfo: [],
            currentJarInfo: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/user-loged")
            .then((response) => response.json())
            .then((userData) => {
                this.setState({ userInfo: userData[0] });
                if (userData[0].jar.length !== 0) {
                    fetch("http://localhost:5000/current-jar")
                        .then((response) => response.json())
                        .then((currentJar) => {
                            this.setState({ currentJarInfo: currentJar[0] });
                            this.setState({ dataIsReturned: true });
                        });
                }
            });
    }

    handleMainPage = () => {
        this.props.navigate("/main-page");
    };

    handleUser = () => {
        this.props.navigate("/user-setting");
    };

    handleKeyword = () => {
        this.props.navigate("/keyword");
    };

    handleSelectMemory = (props) => {
        let newCurrentMemoryId = {
            newCurrentMemoryId: parseInt(props.target.id),
        };

        fetch("http://localhost:5000/change-current-memory", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newCurrentMemoryId),
        }).then(function (response) {
            return response.json();
        });
        this.props.navigate("/memory");
    };

    render() {
        if (this.state.dataIsReturned) {
            // const [value, onChange] = useState(new Date());
            return (
                <section className="calendar">
                    <nav className="backBtn">
                        <img
                            src={iconArrowLeft}
                            alt="arrow-left-icon"
                            onClick={this.handleMainPage}
                        />
                    </nav>
                    <main className="calendar-main">
                        <h3>{this.state.currentJarInfo.name}</h3>
                        <section>
                            <button className="calendarBtn">Calendar</button>
                            <button
                                className="keywordBtn"
                                onClick={this.handleKeyword}
                            >
                                Key word
                            </button>
                        </section>
                        <article className="calendarBox">
                            <Calendar />
                        </article>
                    </main>
                    <footer>
                        <section>
                            <button>
                                <i
                                    className="fa-solid fa-house-chimney"
                                    onClick={this.handleMainPage}
                                ></i>
                            </button>
                            <button>
                                <i
                                    className="fa-solid fa-user"
                                    onClick={this.handleUser}
                                ></i>
                            </button>
                        </section>
                    </footer>
                </section>
            );
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

export function CalendarPage(props) {
    const navigate = useNavigate();
    return <CalendarClass navigate={navigate} />;
}
