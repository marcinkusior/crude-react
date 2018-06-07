import React, { Component } from 'react';
import { func } from 'prop-types';
import { Article } from '../../models/store';

import ArticleForm from '../article_form/article_form';

import './new_article.scss';

export default class ArticleCard extends Component {
  static propTypes = {
    callback: func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.makeFormActive = this.makeFormActive.bind(this);
    this.makeFormInactive = this.makeFormInactive.bind(this);
  }

  state = {
    article: Article.createRecord({ title: '', content: '', image_url: '' }),
    isActive: false
  }

  makeFormActive() {
    this.setState({ isActive: true });
  }

  makeFormInactive() {
    this.setState({ isActive: false });
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
        this.setState({
          article: Article.createRecord({ title: '', content: '', image_url: '' }),
          isActive: false
        });
      });
  }

  render() {
    return (
      <div>
        { this.state.isActive ? (
          <div class="new-article__form">
            <ArticleForm
              article={this.state.article}
              onChange={this.onChange}
              onSubmit={this.saveArticle}
            />
            <div
              className="new-article__back-button"
              onClick={this.makeFormInactive}
            >
              <i className="fas fa-times" />
            </div>
          </div>
        ) : (
          <div
            className="new-article__add-article"
            onClick={this.makeFormActive}
          >
            Add new article...
          </div>
        )}

      </div>
    );
  }
}
