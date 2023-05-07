import { createSlice } from '@reduxjs/toolkit'

export const characterCardsSlice = createSlice({
  name: 'characterCards',
  initialState: {
    characterAttributes: undefined
  },
  reducers: {
    updateCharacterAttributes: (state, action) => {
      state.characterAttributes = action.payload
    }
  },
})

export const { updateCharacterAttributes } = characterCardsSlice.actions

export default characterCardsSlice.reducer