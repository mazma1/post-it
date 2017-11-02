import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const configureStore = (initialState = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunk))
    );
  }
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

export default configureStore;
