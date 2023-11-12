import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DogFactsData, DogEntry } from "../typings";


const initialState: DogFactsData = {
    dogFacts: [],
}

export const dogFactsSlice = createSlice({
    name: "dogFactsSlice",
    initialState,
    reducers: {
        setFactsArray: (state, action: PayloadAction<DogEntry[]>) => {
            state.dogFacts = action.payload;
        }
    }
})

export const { setFactsArray } = dogFactsSlice.actions;

export default dogFactsSlice.reducer;