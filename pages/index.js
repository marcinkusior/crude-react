import React, { Component } from 'react';
import { Article } from '../models/store';

import ArticleCard from '../components/article_card';
import NewArticle from '../components/new_article';


export default class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  state = {
    articles: [],
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles() {
    Article.findAll().then((articles) => {
      this.setState({
        articles
      });
    });
  }

  render() {
    const articles = this.state.articles.map(article =>
      (<ArticleCard
        key={article.id}
        article={article}
        callback={this.fetchArticles}
      />));

    return (
      <div>
        <div>
          { articles }
        </div>
        <br />
        <NewArticle callback={this.fetchArticles} />
      </div>
    );
  }
}
