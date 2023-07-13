import React, { Component } from "react";
import ElementMaker from "./ElementMaker";


class App extends Component {
  constructor() {
    super();
    this.state = {
      fullName: { text: "", showInputEle: false },
    };
  }


  componentDidMount() {
    const storedText = localStorage.getItem("fullNameText");


    if (storedText) {
      this.setState((prevState) => ({
        fullName: {
          ...prevState.fullName,
          text: storedText,
        },
      }));
    }
  }


  handleDoubleClick = () => {
    this.setState((prevState) => ({
      fullName: {
        ...prevState.fullName,
        showInputEle: true,
      },
    }));
  };


  handleBlur = () => {
    const { text } = this.state.fullName;
    localStorage.setItem("fullNameText", text);


    this.setState((prevState) => ({
      fullName: {
        ...prevState.fullName,
        showInputEle: false,
      },
    }));
  };


  handleChange = (e) => {
    const newText = e.target.value;
    this.setState((prevState) => ({
      fullName: {
        ...prevState.fullName,
        text: newText,
      },
    }));
  };


  render() {
    const { text, showInputEle } = this.state.fullName;


    return (
     
        <div>
          <strong> </strong>
          <ElementMaker
            value={text}
            handleChange={this.handleChange}
            handleDoubleClick={this.handleDoubleClick}
            handleBlur={this.handleBlur}
            showInputEle={showInputEle}
          />
        </div>
    );
  }
}


export default App;
