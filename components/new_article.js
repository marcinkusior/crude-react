import React, { Component } from 'react';
import { func } from 'prop-types';
import { Article } from '../models/store';

import ArticleForm from './article_form';

export default class ArticleCard extends Component {
  static propTypes = {
    callback: func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
  }

  state = {
    article: Article.createRecord({ title: '', content: '', image_url: '' })
  }

  onChange(event) {
    const { article } = this.state;
    article[event.target.name] = event.target.value;
    this.setState({ article });
  }

  saveArticle(event) {
    event.preventDefault();
    this.state.article.save()
      .then(this.props.callback)
      .then(() => {
        this.setState({ article: Article.createRecord({ title: '', content: '', image_url: '' }) });
      });
  }

  render() {
    return (
      <div>
        <ArticleForm
          article={this.state.article}
          onChange={this.onChange}
          onSubmit={this.saveArticle}
        />
      </div>
    );
  }
}
