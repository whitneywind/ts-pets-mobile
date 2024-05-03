import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contact, DateApptMap, GeneralInfo } from "../typings";

const initialState: GeneralInfo = {
    contactList: [],
    appointments: {},
}

export const generalInfoSlice = createSlice({
    name: "PetInfoSlice",
    initialState,
    reducers: {
        setContactInfo: (state, action: PayloadAction<Contact[]>) => {
            state.contactList = action.payload;
        },
        deleteContact: (state, action) => {
            state.contactList = action.payload;
        },
        setAppointmentInfo: (state, action: PayloadAction<DateApptMap>) => {
            state.appointments = action.payload
        },
        clearAllGeneralInfo: (state) => {
            state.contactList = initialState.contactList;
            state.appointments = initialState.appointments;
        }
    }
})

export const { setContactInfo, setAppointmentInfo, clearAllGeneralInfo, deleteContact } = generalInfoSlice.actions;

export default generalInfoSlice.reducer;