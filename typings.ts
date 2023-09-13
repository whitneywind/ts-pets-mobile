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
    medicalInfo?: PetMedicalInfo,
    exerciseInfo?: PetExerciseInfo
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    allergies?: string,
    medications?: string, 
}

export type WalkData = [walkDate: string, walkTime: string]

export interface PetExerciseInfo {
    dailyWalkGoal: string,
    walkingStreak: string,
    allWalkData: WalkData[]
}

// also what the asyncstorage looks like
export type PetData = Pet[];

export type GlobalStateType = {
    currentPet: Pet,
    petData: PetData,
}