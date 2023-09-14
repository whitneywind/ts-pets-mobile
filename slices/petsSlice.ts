import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pets: [],
    currentPet: null,
};

export const petSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload;
          },
    }
})

export default petSlice.reducer;