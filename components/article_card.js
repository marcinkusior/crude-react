import React, { Component } from 'react';
import { object, func } from 'prop-types';

import ArticleForm from './article_form';

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

    if (this.state.isEditing) {
      return (
        <div>
          <ArticleForm
            article={this.state.editedArticle}
            onChange={this.onChange}
            onSubmit={this.updateArticle}
          />
          <button onClick={this.toggleIsEditting}> Back </button>
          <br />
          <br />
        </div>
      );
    }

    return (
      <div>
        <div> title: { article.title } </div>
        <div> content: { article.content } </div>
        <button onClick={this.destroyArticle}> Destroy </button>
        <button onClick={this.toggleIsEditting}> Edit </button>
        <br />
        <br />
      </div>
    );
  }
}
