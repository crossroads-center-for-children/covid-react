import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Provider } from 'react-redux';
import 'fontsource-roboto';

import configureStore from './store/configureStore';

import AppWrapper from './App';
import './sass/index.scss';

console.log(process.env.REACT_APP_API_URL);
const link = createHttpLink({ uri: `${process.env.REACT_APP_API_URL}/graphql` });
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link,
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <AppWrapper />
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
