import { createSlice } from '@reduxjs/toolkit'

export const characterCardsSlice = createSlice({
  name: 'characterCards',
  initialState: {
    characterAttributes: undefined,
    characterSkills: undefined
  },
  reducers: {
    updateCharacterAttributes: (state, action) => {
      state.characterAttributes = action.payload
    },
    updateCharacterSkills: (state, action) => {
      state.characterSkills = action.payload
    }
  },
})

export const { updateCharacterAttributes, updateCharacterSkills } = characterCardsSlice.actions

export default characterCardsSlice.reducer