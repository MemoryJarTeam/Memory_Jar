import React from "react";
import { useNavigate } from "react-router-dom";

import iconArrowLeft from "../image/icon/icon-arrow-left.svg";
import heartRegular from "../image/icon/heart-regular.svg";
import heartSolid from "../image/icon/heart-solid.svg";
import iconImgButton from "../image/icon/icon-img-button.svg";

class MemoryWritingClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataIsReturned: false,
            jarDataIsReturned: false,
            keyWord: "",
            level: "",
            text: "",
            userInfo: [],
            currentJarId: null,
            lastMemoryId: null,
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/user-loged")
            .then((response) => response.json())
            .then((userData) => {
                this.setState({ userInfo: userData[0] });
                this.setState({ lastMemoryId: userData[1].lastMemoryId });
                this.setState({ userDataIsReturned: true });
            });
        fetch("http://localhost:5000/current-jar")
            .then((response) => response.json())
            .then((currentJarId) => {
                this.setState({ currentJarId: currentJarId[0].currentJarId });
                this.setState({ jarDataIsReturned: true });
            });
    }

    handleBack = () => {
        this.props.navigate("/main-page");
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newDate = new Date();
        const currentDate =
            newDate.getDate() +
            "/" +
            (newDate.getMonth() + 1) +
            "/" +
            newDate.getFullYear();
        let newMemory = {
            memoryId: this.state.lastMemoryId + 1,
            jarId: this.state.currentJarId,
            userId: this.state.userInfo.id,
            date: currentDate,
            keyWord: this.state.keyWord,
            level: this.state.level,
            text: this.state.text,
            picture: "http://dummyimage.com/100x100.png/dddddd/000000",
        };

        fetch("http://localhost:5000/new-memory", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newMemory),
        }).then(function (response) {
            return response.json();
        });

        this.props.navigate("/main-page");
    };

    render() {
        if (this.state.userDataIsReturned && this.state.jarDataIsReturned) {
            return (
                <section className="memoryWriting">
                    <nav className="backBtn">
                        <img
                            src={iconArrowLeft}
                            alt="arrow-left-icon"
                            onClick={this.handleBack}
                        />
                    </nav>
                    <main>
                        <section
                            onSubmit={this.handleSubmit}
                            className="modalBox"
                        >
                            {/* <h3 id="todayDate">1</h3> */}
                            <form className="memoryInputBox">
                                <aside>
                                    <p>Keyword Title</p>
                                    <input
                                        type="text"
                                        name="keyWord"
                                        maxLength="20"
                                        placeholder="Summarize your memory in 20 letters!"
                                        value={this.state.value}
                                        onChange={this.handleChange}
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
                                            <button
                                                type="button"
                                                name="level"
                                                value="#fdf7c3"
                                                onClick={this.handleChange}
                                                className={
                                                    this.state.level ===
                                                    "#fdf7c3"
                                                        ? "selected"
                                                        : ""
                                                }
                                            ></button>
                                            <button
                                                type="button"
                                                name="level"
                                                value="#ffdeb4"
                                                onClick={this.handleChange}
                                                className={
                                                    this.state.level ===
                                                    "#ffdeb4"
                                                        ? "selected"
                                                        : ""
                                                }
                                            ></button>
                                            <button
                                                type="button"
                                                name="level"
                                                value="#ffb4b4"
                                                onClick={this.handleChange}
                                                className={
                                                    this.state.level ===
                                                    "#ffb4b4"
                                                        ? "selected"
                                                        : ""
                                                }
                                            ></button>
                                            <button
                                                type="button"
                                                name="level"
                                                value="#b2a4ff"
                                                onClick={this.handleChange}
                                                className={
                                                    this.state.level ===
                                                    "#b2a4ff"
                                                        ? "selected"
                                                        : ""
                                                }
                                            ></button>
                                        </article>
                                        <img
                                            src={heartSolid}
                                            alt="full-heart"
                                        />
                                    </section>
                                </aside>
                                <aside>
                                    <textarea
                                        name="text"
                                        placeholder="Write your memory"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    ></textarea>
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
                                        // onChange={}
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
            );
        } else {
            // return(
            //     <h1>Loading...</h1>
            // )
        }
    }
}

export function MemoryWriting(props) {
    const navigate = useNavigate();
    return <MemoryWritingClass navigate={navigate} />;
}
