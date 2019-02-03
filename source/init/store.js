// Core
import { createStore } from "redux";

// Reducers
import { rootReducer } from "./rootReducer";

// Enhancers
import { enhancedStore } from "./middleware/core";

export const store = createStore(rootReducer, enhancedStore);
