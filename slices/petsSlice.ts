import { createSlice } from "@reduxjs/toolkit"
import { Pet, PetData } from "../typings";

const initialState: PetData = {
    petsArray: [],
    currentPet: null,
};

export const petSlice = createSlice({
    name: "petsSlice",
    initialState,
    reducers: {
        setPetsArray: (state, action) => {
            state.petsArray = action.payload;
          },
        setCurrentPet: (state, action) => {
            state.currentPet = action.payload;
        },
    }
});

export const { setPetsArray, setCurrentPet } = petSlice.actions;

export default petSlice.reducer;