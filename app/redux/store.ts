import { configureStore } from "@reduxjs/toolkit"
import healthReducer from "./reducers/healthSlice"
import dietReducer from "./reducers/dietSlice"
import allergieReducer from "./reducers/allergieSlice"
import surveyReducer from "./reducers/surveySlice"

export const store = configureStore({
  reducer: {
    health: healthReducer,
    diet: dietReducer,
    allergie: allergieReducer,
    survey: surveyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
