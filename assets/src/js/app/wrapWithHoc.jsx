import React, { Component } from 'react';

function wrapWithHoc(WrappedComponent) {
  return class WrappedWithHoc extends Component {
    state = {
      superState: false,
      imageSrc: '',
      testingWatch: false
    };

    async componentDidMount() {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
      const { thumbnailUrl: imageSrc } = await response.json();
      console.log(imageSrc);
      this.setState({ superState: true, imageSrc });
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}

export default wrapWithHoc;
