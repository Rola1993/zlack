//This file will be responsible for combining our multiple, domain-specific reducers

import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer
});

export default rootReducer;

//our default application state should look like this:
// {
//   entities: {
//     users: {}
//   },
//   session: {
//     id: null,
//   },
//   errors: {
//     session: []
//   }
// }
