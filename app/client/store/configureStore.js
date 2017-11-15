import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';


/**
  * Configures and sets up the redux store
  *
  * @param {object} initialState - Initial state of the application
  *
  * @returns {object} Redux store
  */
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
