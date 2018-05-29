import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

export const adapter = new HttpAdapter({
  basePath: 'http://localhost:3000'
});

export const store = new DataStore();

store.registerAdapter('http', adapter, { default: true });

store.defineMapper('articles', {
  endpoint: 'articles'
  // schema: schemas.comment,
  // relations: relations.comment
});
