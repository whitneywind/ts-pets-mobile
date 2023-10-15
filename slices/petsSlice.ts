import { PayloadAction, createSlice } from "@reduxjs/toolkit"
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
        updateOnePet: (state, action: PayloadAction<{ petId: string, updatedDetails: Partial<Pet> }>) => {
            const { petId, updatedDetails } = action.payload;
            state.petsArray = state.petsArray.map((pet) => {
                return pet.id === petId ? { ...pet, ...updatedDetails } : pet
            });
        }
    }
});

export const { setPetsArray, setCurrentPet, updateOnePet } = petSlice.actions;

export default petSlice.reducer;