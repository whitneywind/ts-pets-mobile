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
    walkGoal: number,
    walkGoalMet: boolean,
    walkStreak?: number,
}

export interface PetMedicalInfo {
    lastVetVisit?: string,
    allergies?: string,
    medications?: string, 
}

export type WalkData = {
    [walkDate: string]: string,
}

export type WeightData = {  
    [weightDate: string]: string
};

// how structured on dogapi
export type DogEntry = {
    id: string,
    type: string,
    attributes: {
        name: string,
        description: string,
        life: {
            max: number,
            min: number,
        },
        male_weight: {
            max: number,
            min: number,
        }
        female_weight: {
            max: number,
            min: number,
        }
        hypoallergenic: boolean,
    },
    relationships: {
        group: {
            data: {
                id: string,
                type: string,
            }
        }
    }
}

export type PetData = {
    petsArray: Pet[] | [],
    currentPet: Pet | null,
};

// data from api
export type DogFactsData = {
    dogFacts: DogEntry[] | [],
};


// combined in reducer so state should now be merged and look like:
// export type RootState = PetData & DogFactsData;