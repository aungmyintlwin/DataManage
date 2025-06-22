import { PriotizeHealthConcern } from "@/screens/HealthConcern/HealthConcern"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface HealthState {
  data: PriotizeHealthConcern[]
}

const initialState: HealthState = {
  data: [],
}

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<PriotizeHealthConcern[]>) {
      state.data = action.payload
    },
  },
})

export const { addItems } = healthSlice.actions
export default healthSlice.reducer
