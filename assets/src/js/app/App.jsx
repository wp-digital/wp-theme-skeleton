import React, { Component } from 'react';
import WithTestComponent from './wrapWithHoc.jsx';

class App extends Component {
  state = {};

  makeSomeMagic = () => {
    global.alert(5 + 10);
  };

  render() {
    return (
      <>
        <h1 onClick={this.makeSomeMagic}>{`I'm from React. Click me`}</h1>
        <img src={this.props.superState ? this.props.imageSrc : ''} alt="" />
      </>
    );
  }
}

export default WithTestComponent(App);
