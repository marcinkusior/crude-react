import React, { Component } from 'react';
import { func, object } from 'prop-types';

import './article_form.scss';

export default class ArticleForm extends Component {
  static propTypes = {
    article: object.isRequired,
    onSubmit: func.isRequired,
    onChange: func.isRequired
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="article-form">
        <input
          type="text"
          name="title"
          className="article-form__title"
          value={this.props.article.title} onChange={this.props.onChange}
          placeholder="Title..."
        />
        <input
          type="text"
          name="content"
          value={this.props.article.content}
          onChange={this.props.onChange}
          placeholder="Content..."
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
