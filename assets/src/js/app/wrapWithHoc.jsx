import React, { Component } from 'react';
import http from '../modules/httpService';

function wrapWithHoc(WrappedComponent) {
  return class WrappedWithHoc extends Component {
    state = {
      superState: false,
      imageSrc: '',
      testingWatch: false
    };

    async componentDidMount() {
      const { data } = await http.get('https://jsonplaceholder.typicode.com/photos/1');
      const imageSrc = data.thumbnailUrl;
      this.setState({ superState: true, imageSrc });
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}

export default wrapWithHoc;
