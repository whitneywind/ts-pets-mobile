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
    weightData?: WeightData,
    medicalInfo?: PetMedicalInfo,
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    allergies?: string,
    medications?: string, 
}

export type WeightData = [date: string, weight: string];

export type WalkData = [walkDate: string, walkLength: string]

// export interface PetExerciseInfo {
//     dailyWalkGoal: string,
//     walkingStreak: string,
//     allWalkData: WalkData[]
// }

// what state should look like
export type PetData = {
    petsArray: Pet[] | [],
    currentPet: Pet | null,
};