import { Allergie } from "@/screens/AllergiesScreen/Allergie"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AllergieState {
  data: Allergie[]
}

const initialState: AllergieState = {
  data: [],
}

const allergieSlice = createSlice({
  name: "allergie",
  initialState,
  reducers: {
    addAllergieItems(state, action: PayloadAction<Allergie[]>) {
      state.data = action.payload
    },
  },
})

export const { addAllergieItems } = allergieSlice.actions
export default allergieSlice.reducer
