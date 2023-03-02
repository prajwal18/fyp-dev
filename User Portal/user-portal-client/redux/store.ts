import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware
});

sagaMiddleware.run(rootSaga);

export default store;