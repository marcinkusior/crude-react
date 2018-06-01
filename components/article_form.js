import React, { Component } from 'react';
import { func, object } from 'prop-types';

export default class ArticleForm extends Component {
  static propTypes = {
    article: object.isRequired,
    onSubmit: func.isRequired,
    onChange: func.isRequired
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input type="text" name="title" value={this.props.article.title} onChange={this.props.onChange} />
        <input type="text" name="content" value={this.props.article.content} onChange={this.props.onChange} />
        <input type="text" name="image_url" value={this.props.article.image_url} onChange={this.props.onChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
