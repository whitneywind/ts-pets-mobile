export interface Pet {
    id: string,
    petName: string,
    petType: string,
    breed?: string,
    weight?: string,
    microchip?: string,
    avatar?: string,
    petAgeYears?: string,
    petGender?: string,
    image?: string,
    uri?: string,
    walkData?: WalkData,
    medicalInfo?: PetMedicalInfo,
    weightData?: WeightData,
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    allergies?: string,
    medications?: string, 
}

export type WalkData = {
    [walkDate: string]: string
}

export type WeightData = {  
    [weightDate: string]: string
};

// what state should look like
export type PetData = {
    petsArray: Pet[] | [],
    currentPet: Pet | null,
};