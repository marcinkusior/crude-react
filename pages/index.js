import React, { Component } from 'react';
import { store } from '../models/store';

import Article from '../components/article';
import ArticleForm from '../components/article_form';

export default class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  state = {
    articles: [],
    newArticle: store.createRecord('article', { title: '', content: '', image_url: '' })
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles() {
    store.findAll('article').then((articles) => {
      this.setState({
        articles
      });
    });
  }

  saveArticle(event) {
    this.state.newArticle.save().then(() => {
      this.fetchArticles();
      const newArticle = store.createRecord('article', { title: '', content: '', image_url: '' });
      this.setState({ newArticle });
    });
    event.preventDefault();
  }

  destroyArticle(article) {
    article.destroy().then(this.fetchArticles);
  }

  changeHandler(event) {
    const { newArticle } = this.state;
    newArticle[event.target.name] = event.target.value;
    this.setState({ newArticle });
  }

  render() {
    const saveArticle = this.saveArticle.bind(this);
    const changeHandler = this.changeHandler.bind(this);

    const articles = this.state.articles.map(article =>
      (<Article
        key={article.id}
        article={article}
        callback={this.fetchArticles}
      />)
    );

    return (
      <div>
        <div>
          { articles }
        </div>
        <br />
        <ArticleForm
          article={this.state.newArticle}
          onSubmit={ saveArticle }
          onChange={ changeHandler }
        />
      </div>
    );
  }
}
