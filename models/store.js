import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';

const adapter = new HttpAdapter({
  basePath: 'http://localhost:3000'
});

const store = new DataStore();
store.registerAdapter('http', adapter, { default: true });
const Article = store.defineMapper('article', {
  endpoint: 'articles',

  deserialize(config, data) {
    console.log(data);
    // const data = data.data[resourceConfig.name] || data.data[resourceConfig.name + 's'];
    return data.data
  }

});

export { store, Article };
