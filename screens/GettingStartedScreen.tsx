import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import catImg from '../assets/images/graycat.png';
import dogImg from '../assets/images/longdog.png';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pet, PetData } from '../typings';
import { setPetsArray, setCurrentPet } from '../slices/petsSlice';

type Props = {
  navigation: any;
};

let defaultPetSettings = {
  // id, name, petType, petName, petAgeYears, avatar, petGender set in form
  breed: 'unknown',
  weight: 'unknown',
  gender: 'unknown',
  microchip: 'unknown',
  petMedicalInfo: {
    lastVetVisit: 'unknown',
    allergies: 'unknown',
    medications: 'unknown',
  },
  walkData: {},
  weightData: {},
};

const GettingStartedScreen = ({ navigation }: Props) => {
  const [selectedPet, setSelectedPet] = useState('');
  const [petGender, setPetGender] = useState('');
  const dispatch = useDispatch();
  const petsArray = useSelector((state: PetData) => state.petsArray);

  const setPetData = async (values: any) => {
    const uniqueId =
      new Date().getTime().toString() + Math.random().toString(36).substr(2, 9);

    const newPet = {
      ...defaultPetSettings,
      id: uniqueId,
      ...values,
    };

    let newPetsArr: Pet[];

    // check if petsArray already exists
    if (!petsArray) {
      newPetsArr = [];
      console.log('it was empty');
    } else {
      newPetsArr = [...petsArray];
    }

    newPetsArr.push(newPet);
    // add this pet to petsArray
    // either way set new currentPet

    console.log('before dispatching: ', newPetsArr);

    try {
      dispatch(setPetsArray(newPetsArr));
      dispatch(setCurrentPet(newPet));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('petsArray:: ', petsArray);
  }, [petsArray]);

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView contentContainerStyle={tw`w-7/8 mx-auto mt-10`}>
        <Text style={tw`text-3xl mb-6 text-center`}>
          Let's start with the basics
        </Text>
        <Formik
          initialValues={{
            petType: '',
            petName: '',
            petAgeYears: '',
            gender: '',
            avatar: '',
          }}
          onSubmit={(values) => {
            setPetData(values);
            navigation.navigate('Home');
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <Text style={tw`text-lg mt-4`}>What is your pet's name? *</Text>
              <TextInput
                style={tw`border border-gray-300 p-2 mt-2 mb-4`}
                onChangeText={handleChange('petName')}
                onBlur={handleBlur('petName')}
                value={values.petName}
                //   required
              />
              <Text style={tw`text-lg mb-2`}>
                What type of pet do you have? *
              </Text>
              <View style={tw`flex w-full flex-row justify-around mb-4`}>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('petType', 'dog');
                    setFieldValue('avatar', 'dog');
                    setSelectedPet('dog');
                  }}
                  style={tw``}
                >
                  <Image
                    source={dogImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === 'dog'
                          ? 'border-green-400 border-4'
                          : 'border-gray-300'
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Dog</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFieldValue('petType', 'cat');
                    setFieldValue('avatar', 'cat');
                    setSelectedPet('cat');
                  }}
                >
                  <Image
                    source={catImg}
                    style={[
                      {
                        width: 130,
                        height: 130,
                      },
                      tw`border ${
                        selectedPet === 'cat'
                          ? 'border-green-400 border-4'
                          : 'border-gray-300'
                      } mb-2`,
                    ]}
                  />
                  <Text style={tw`text-center`}>Cat</Text>
                </TouchableOpacity>
              </View>
              <Text style={tw`text-lg`}>How old is your pet? (optional)</Text>
              <View style={tw`flex-row items-center mb-4`}>
                <TextInput
                  style={tw`border border-gray-300 p-2 mt-2 flex-1 text-center`}
                  onChangeText={handleChange('petAgeYears')}
                  onBlur={handleBlur('petAgeYears')}
                  value={values.petAgeYears}
                  placeholder="Years"
                  keyboardType="numeric"
                />
              </View>

              <Text style={tw`text-lg mt-2`}>
                What is your pet's gender? (optional)
              </Text>
              <View style={tw`flex-row mb-10 mt-2`}>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender('female');
                    setFieldValue('petGender', 'female');
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
                    petGender === 'female' && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Female</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPetGender('male');
                    setFieldValue('petGender', 'male');
                  }}
                  style={[
                    tw`border border-gray-300 p-2 w-1/2`,
                    petGender === 'male' && tw`border-green-500`,
                  ]}
                >
                  <Text style={tw`text-center`}>Male</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={tw`rounded-full bg-emerald-500 py-4 mb-4`}
              >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                  Create Pet Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={tw`rounded-full bg-slate-300 py-4`}
              >
                <Text style={tw`text-center text-white text-lg font-semibold`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GettingStartedScreen;
