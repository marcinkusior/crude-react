import React, { Component } from 'react';
import { string } from 'prop-types';

export default class Index extends Component {
  static propTypes = {
    title: string
  }

  static defaultProps = {
    title: 'default title'
  }

  state = { example: 'example' }

  render() {
    const { title } = this.props;

    return (
      <div>
        { title }
        { this.state.example }
      </div>
    );
  }
}
