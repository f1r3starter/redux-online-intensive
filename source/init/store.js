// Core
import { createStore } from "redux";

// Reducers
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

// Enhancers
import { enhancedStore, sagaMiddleware } from "./middleware/core";

export const store = createStore(rootReducer, enhancedStore);

sagaMiddleware.run(rootSaga);
