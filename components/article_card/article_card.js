import React, { Component } from 'react';
import { object, func } from 'prop-types';

import ArticleForm from '../article_form/article_form';

import './article_card.scss';

export default class ArticleCard extends Component {
  static propTypes = {
    article: object.isRequired,
    callback: func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.toggleIsEditting = this.toggleIsEditting.bind(this);
    this.destroyArticle = this.destroyArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  state = {
    isEditing: false,
    editedArticle: Object.assign({}, this.props.article)
  }

  onChange(event) {
    const { editedArticle } = this.state;
    editedArticle[event.target.name] = event.target.value;
    this.setState({ editedArticle });
  }

  updateArticle(event) {
    event.preventDefault();
    this.state.isEditing = false;
    const article = Object.assign(this.props.article, this.state.editedArticle);
    article.save().then(this.props.callback);
  }

  destroyArticle() {
    this.props.article.destroy().then(this.props.callback);
  }

  toggleIsEditting() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const { article } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="article-card">
        { isEditing ? (
          <div>
            <ArticleForm
              article={this.state.editedArticle}
              onChange={this.onChange}
              onSubmit={this.updateArticle}
            />
            <button
              className="article-card__back-button"
              onClick={this.toggleIsEditting}>
              <i className="fas fa-times" />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="article-card__destroy-button"
              onClick={this.destroyArticle}
            >
              <i className="fas fa-trash-alt fa-fw" />
            </button>
            <button
              className="article-card__edit-button"
              onClick={this.toggleIsEditting}
            >
              <i className="fas fa-pencil-alt fa-fw" />
            </button>

            <div className="article-card__title"> { article.title } </div>
            <div className="article-card__content"> { article.content } </div>
          </div>
        )}
      </div>
    );
  }
}
