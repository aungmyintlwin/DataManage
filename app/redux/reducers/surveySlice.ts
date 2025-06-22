import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SurveyState {
  is_daily_exposure: boolean
  is_somke: boolean
  alchol: string
}

const initialState: SurveyState = {
  is_daily_exposure: true,
  is_somke: false,
  alchol: "0-1",
}

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    updateDailyExposure(state, action: PayloadAction<boolean>) {
      state.is_daily_exposure = action.payload
    },
    updateIsSmoke(state, action: PayloadAction<boolean>) {
      state.is_somke = action.payload
    },
    updateAlchol(state, action: PayloadAction<string>) {
      state.alchol = action.payload
    },
  },
})

export const { updateDailyExposure, updateIsSmoke, updateAlchol } = surveySlice.actions
export default surveySlice.reducer
