import { Diet } from "@/screens/DietScreen/Diet"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DietState {
  data: Diet[]
}

const initialState: DietState = {
  data: [],
}

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {
    addDietItems(state, action: PayloadAction<Diet[]>) {
      state.data = action.payload
    },
  },
})

export const { addDietItems } = dietSlice.actions
export default dietSlice.reducer
