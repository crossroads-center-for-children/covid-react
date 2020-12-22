import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Provider } from 'react-redux';
import 'fontsource-roboto';

import configureStore from './store/configureStore';

import App from './App';
import './sass/index.scss';

// const link = createHttpLink({ uri: '/graphql' });
// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   cache,
//   link,
// });

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <ApolloProvider client={client}> */}
        <App />
        {/* </ApolloProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
