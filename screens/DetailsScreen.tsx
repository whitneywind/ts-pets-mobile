import { Icon } from '@rneui/base';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { setCurrentPet, updateOnePet, deleteOnePet } from '../slices/petsSlice';
import * as ImagePicker from 'expo-image-picker';
import dogImg from '../assets/images/germanshepherd.png';
import catImg from '../assets/images/fluffycat.png';
import { PetData } from '../typings';
import { current } from '@reduxjs/toolkit';

type Props = {
  navigation: any;
};

// TO-DO: image not updating immediately bc image is not coming from the petsArray, but the currentPet
// this is why it only updates immediately in the PetsList component

const DetailsScreen = ({ navigation }: Props) => {
  const petsArray = useSelector((state: PetData) => state.petsArray);
  const currentPet = useSelector((state: PetData) => state.currentPet);

  // if (!currentPet || petsArray.length === 0) {
  //   navigation.navigate('GettingStarted');
  // }

  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [petName, setPetName] = useState(currentPet!.petName);
  const [breed, setBreed] = useState(currentPet!.breed);
  const [weight, setWeight] = useState(currentPet!.weight);
  const [petAgeYears, setPetAgeYears] = useState(currentPet!.petAgeYears);
  const [gender, setGender] = useState(currentPet!.petGender);
  const [microchip, setMicrochip] = useState(currentPet!.microchip);

  // TO-DO: add function to delay state change until after user stops typing

  const handleSaveChanges = async () => {
    const updatedPetDetails = {
      ...currentPet,
      petName,
      breed,
      weight,
      petAgeYears,
      gender,
      microchip
    };

    console.log('updatetdpetdettails: ', updatedPetDetails)

    dispatch(
        updateOnePet({
          petId: currentPet!.id,
          updatedDetails: updatedPetDetails,
        })
      );
      dispatch(
        setCurrentPet({
          ...currentPet,
          ...updatedPetDetails,
        })
      );

    setEditMode(false);
  };

  // test that state updated correctly
  useEffect(() => {
    console.log('currentPet:', currentPet!.petName);
    console.log('pet data length: ', petsArray.length);

  }, [currentPet, petsArray]);

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(result, null, 2));

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      let currentPetWithPicture = {
        ...currentPet,
        uri: result.assets[0].uri,
      };

      // update in state
      dispatch(
        updateOnePet({
          petId: currentPet!.id,
          updatedDetails: currentPetWithPicture,
        })
      );
      dispatch(
        setCurrentPet({
          ...currentPet,
          ...currentPetWithPicture,
        })
      );
    }
  };

  // deletes from array but current pet not updating
const handleDelete = () => {
    console.log('deleting this id: ', currentPet!.id)
    dispatch(deleteOnePet({ petId: currentPet!.id }));
  
    if (!petsArray || petsArray.length < 1) {
            dispatch(setCurrentPet(null));
            navigation.navigate("GettingStarted");
    } else {
      // TO-DO: why is it only able too navigate Home and not to any other page??? also it only seems to do the else statement
        // dispatch(setCurrentPet(petsArray[0]));
        if (petsArray.length >= 1) {
          console.log('trying to go to home')
          dispatch(setCurrentPet(petsArray[0]));
          navigation.navigate("Home");
        } else {
          console.log('trying to go to getting started')
          dispatch(setCurrentPet(null));
          navigation.navigate("GettingStarted");
        }
    }

      // setTimeout(updateCurr, 500);
};

if (!currentPet) {
  return (
    <SafeAreaView>
      <View>
        <Text>no pet data</Text>
      </View>
    </SafeAreaView>
  )
}

  return (
    <SafeAreaView style={tw`h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-semibold pr-2 tracking-wide`}>
            Details
          </Text>
          {!editMode ? (
            <TouchableOpacity onPress={() => setEditMode(true)} style={tw``}>
              <Icon name="wrench" type="font-awesome" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSaveChanges} style={tw``}>
              <Icon name="check" type="feather" size={20} />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`w-full mx-auto pb-3 mt-3 mb-2 rounded-lg`}>
          <TouchableOpacity
            style={tw`w-1/2 rounded-lg mx-auto`}
            onPress={pickImage}
          >
            <Image
              style={[
                {
                  width: 180,
                  height: 170,
                  resizeMode: 'cover',
                  borderRadius: 6,
                },
                tw`self-center m-2`,
              ]}
              source={
                currentPet!.uri
                  ? { uri: currentPet!.uri }
                  : currentPet!.avatar === 'dog'
                  ? dogImg
                  : catImg
              }
            />
          </TouchableOpacity>

          <View style={tw`flex items-center bg-white rounded-lg mt-3 px-4`}>
            {!editMode ? (
              <Text style={tw`text-2xl p-3 tracking-wide font-bold`}>
                {currentPet!.petName}
              </Text>
            ) : (
              <TextInput
                style={tw`text-2xl font-bold border border-gray-300 p-3`}
                value={petName}
                onChangeText={setPetName}
              />
            )}
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center p-1 pt-2 font-bold underline`}>
            General
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Age:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet!.petAgeYears === 'unknown'
                    ? '---'
                    : currentPet!.petAgeYears}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={petAgeYears}
                  onChangeText={setPetAgeYears}
                />
              )}
            </View>

            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Breed:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet!.breed === 'unknown' ? '---' : currentPet!.breed}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={breed}
                  onChangeText={setBreed}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Weight:
              </Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet!.weight === 'unknown'
                    ? '---'
                    : currentPet!.weight}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={weight}
                  onChangeText={setWeight}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Gender:</Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet!.petGender === 'unknown'
                    ? '---'
                    : currentPet!.petGender}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={gender}
                  onChangeText={setGender}
                />
              )}
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Microchip:
              </Text>
              {!editMode ? (
                <Text style={tw`text-lg p-1`}>
                  {currentPet!.microchip === 'unknown'
                    ? '---'
                    : currentPet!.microchip}
                </Text>
              ) : (
                <TextInput
                  style={tw`text-xl border border-gray-300 p-2`}
                  value={microchip}
                  onChangeText={setMicrochip}
                />
              )}
            </View>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center font-bold p-1 pt-2 underline`}>
            Medical
          </Text>
          <View style={tw`flex items-center gap-y-2`}>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Last Vet Visit:</Text>
              <Text style={tw`text-lg p-1`}>3/12/2023</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>
                Allergies
              </Text>
              <Text style={tw`text-lg text-right text-gray-700 p-1`}>none</Text>
            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Medications:</Text>
              <Text style={tw`text-lg p-1`}>none</Text>
            </View>
          </View>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ActivityScreen')}
          >
            <View style={tw`bg-emerald-400 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                style={tw``}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Remove Pet Data
          </Text>
          <TouchableOpacity onPress={handleDelete}>
            <View style={tw`bg-red-400 rounded-lg py-2 w-1/3 my-2 mx-auto`}>
              <Icon name="warning" type="antdesign" size={25} style={tw``} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailsScreen;
