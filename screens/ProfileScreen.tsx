import { Icon } from '@rneui/base';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { setCurrentPet, updateOnePet, deleteOnePet } from '../slices/petsSlice';
import * as ImagePicker from 'expo-image-picker';
import dogImg from '../assets/images/germanshepherd.png';
import catImg from '../assets/images/fluffycat.png';
import { Contact, PetData } from '../typings';
import { RootState } from '../store';
import { Formik } from 'formik';
import {
  clearAllGeneralInfo,
  setContactInfo,
  deleteContact,
} from '../slices/generalInfoSlice';

type Props = {
  navigation: any;
};

const DetailsScreen = ({ navigation }: Props) => {
  const petsArray = useSelector((state: RootState) => state.pets.petsArray);
  const currentPet = useSelector((state: RootState) => state.pets.currentPet);
  const contactArray = useSelector(
    (state: RootState) => state.petInfo.contactList
  );

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
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [callOrEditModalOpen, setCallOrEditModalOpen] = useState(false);
  const [editContactInfo, setEditContactInfo] = useState<Contact>({
    name: '',
    phoneNumber: '',
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [editMedical, setEditMedical] = useState(false);

  useEffect(() => {
    setContacts([...contactArray]);
  }, []);

  // TO-DO: add function to delay state change until after user stops typing - too inefficient right now

  const handleSaveChanges = async () => {
    const updatedPetDetails = {
      ...currentPet,
      petName,
      breed,
      weight,
      petAgeYears,
      gender,
      microchip,
    };

    // console.log('updated pet details: ', updatedPetDetails);

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
  // useEffect(() => {
  //   console.log('currentPet:', currentPet!.petName);
  //   console.log('pet data length: ', petsArray.length);
  // }, [currentPet, petsArray]);

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(JSON.stringify(result, null, 2));

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

  const handleAddEditContact = (name: string, phoneNumber: string) => {
    if (name && phoneNumber) {
      let newContactsArray = contacts;

      if (contacts.length > 0 && editIndex > -1) {
        // edit existing contact
        console.log('editing');
        newContactsArray[editIndex] = { name, phoneNumber };
      } else {
        console.log('adding new');
        newContactsArray.push({ name, phoneNumber });
      }

      setContacts([...newContactsArray]);
      console.log('dispatching this: ', contacts);
      dispatch(setContactInfo(contacts));
    }
  };

  const toggleContactModalOpen = () => {
    setContactModalOpen(!contactModalOpen);

    // if (!contactModalOpen) {
    //   setEditContactInfo({ name: '', phoneNumber: '' });
    //   setEditIndex(-1);
    // }
  };

  const toggleCallOrEditModal = () => {
    setCallOrEditModalOpen(!callOrEditModalOpen);
    console.log("info there: ", editContactInfo)
  };

  // deletes from array but current pet not updating
  const handleDelete = () => {
    console.log('deleting this id: ', currentPet!.id);
    dispatch(deleteOnePet({ petId: currentPet!.id }));

    if (!petsArray || petsArray.length < 1) {
      dispatch(setCurrentPet(null));
      navigation.navigate('GettingStarted');
    } else {
      if (petsArray.length >= 1) {
        // console.log('trying to go to home');
        dispatch(setCurrentPet(petsArray[petsArray.length - 1]));
        navigation.navigate('Home');
      } else {
        // console.log('trying to go to getting started');
        dispatch(setCurrentPet(null));
        navigation.navigate('GettingStarted');
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
    );
  }
  
  const handleDeleteContact = () => {
    const newContactsArray = contacts;
    newContactsArray.splice(editIndex, 1);
    dispatch(deleteContact([...newContactsArray]));
    toggleContactModalOpen();
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          name: editContactInfo.name || '',
          phoneNumber: editContactInfo.phoneNumber || '',
        }}
        onSubmit={(values) => {
          handleAddEditContact(values.name, values.phoneNumber);
          toggleContactModalOpen();
          setEditContactInfo({ name: '', phoneNumber: '' });
          setEditIndex(-1);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={tw`w-full`}>
            <View style={tw`flex items-center mb-6 mx-3`}>
              <Text style={tw`text-lg text-center`}>Contact:</Text>
              <TextInput
                style={tw`border border-gray-300 text-xl pb-4 pt-2 mt-2 w-full text-center`}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Vet"
                keyboardType="default"
              />

              <Text style={tw`text-lg mt-4 text-center`}>Phone Number:</Text>
              <TextInput
                style={tw`border border-gray-300 text-xl pb-4 pt-2 mt-2 w-full text-center`}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="8186952764"
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={tw`rounded-xl bg-[#a457f0] p-2 px-8 mx-3`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white font-bold text-center text-lg`}>
                Submit
              </Text>
            </TouchableOpacity>

            {editIndex >= 0 && (
              <TouchableOpacity
                style={tw`rounded-xl bg-[#f08757] mt-5 p-2 px-8 mx-3`}
                onPress={handleDeleteContact}
              >
                <Text style={tw`text-white font-bold text-center text-lg`}>
                  Delete
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </Formik>
    );
  };

  return (
    <SafeAreaView style={tw`h-full`}>
      <TouchableWithoutFeedback
        onPress={() => {
          // Keyboard.dismiss
          setContactModalOpen(false);
        }}
      >
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-semibold pr-2 tracking-wide`}>
            Profile
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
                tw`self-center`,
              ]}
              source={
                currentPet!.uri
                  ? { uri: currentPet!.uri }
                  : currentPet!.avatar === 'dog'
                  ? dogImg
                  : catImg
              }
            />
            <Text style={tw`text-blue-600 self-center mt-1 mb-4`}>Add/Change Photo</Text>
          </TouchableOpacity>

          <View style={tw`flex items-center bg-white rounded-lg mt-3 px-4`}>
            {!editMode ? (
              <Text style={tw`text-2xl p-3 tracking-wide font-bold`}>
                {currentPet!.petName}
              </Text>
            ) : (
              <TextInput
                style={tw`text-2xl pt-2 pb-3 px-4 tracking-wide font-bold border border-2 border-gray-300 rounded-md`}
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
                  style={tw`text-lg border border-gray-300  rounded-md px-2`}
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
                  style={tw`text-lg border border-gray-300 rounded-md px-2`}
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
                  style={tw`text-lg border border-gray-300 rounded-md px-2`}
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
                  style={tw`text-lg border border-gray-300 rounded-md px-2`}
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
                  style={tw`text-lg border border-gray-300 rounded-md px-2`}
                  value={microchip}
                  onChangeText={setMicrochip}
                />
              )}
            </View>


          </View>
        </View>

        <View>
              <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
                <Text
                  style={tw`text-xl text-center font-bold p-1 pt-2 underline`}
                >
                  Important Contacts
                </Text>
                <View style={tw`w-full flex px-6 items-center`}>
                  {contacts.map((contact, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setEditContactInfo({
                          name: contact.name,
                          phoneNumber: contact.phoneNumber,
                        });
                        setEditIndex(index);
                        setCallOrEditModalOpen(true);
                      }}
                      key={index}
                      style={tw`flex flex-row justify-between items-center py-2`}
                    >
                      <Text style={tw`w-1/2 text-base`}>{contact.name}</Text>
                      <Text style={tw`w-1/2 text-base text-right`}>
                        {contact.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => {
                      setEditContactInfo({ name: '', phoneNumber: '' });
                      setEditIndex(-1);
                      toggleContactModalOpen();
                    }}
                    style={tw`flex-row justify-between bg-[#a457f0] rounded-lg py-2 mt-4`}
                  >
                    <Text
                      style={tw`text-lg font-bold text-white text-right w-full text-center p-1`}
                    >
                      Add New Contact
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={contactModalOpen}
                onRequestClose={toggleContactModalOpen}
              >
                <View style={tw`flex justify-center items-center mt-64`}>
                  <View
                    style={tw`bg-white border-2 border-[#a457f0] rounded-lg w-2/3 pt-10 pb-8 items-center shadow-lg elevation-5`}
                  >
                    <TouchableOpacity
                      style={tw`absolute right-4 top-2`}
                      onPress={toggleContactModalOpen}
                    >
                      <View>
                        <Icon
                          name="close"
                          type="font-awesome"
                          size={25}
                          color="#a457f0"
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={tw`text-center text-2xl mb-2 font-semibold text-slate-800`}
                    >
                      Add/Edit
                    </Text>

                    {renderForm()}
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={callOrEditModalOpen}
                onRequestClose={toggleCallOrEditModal}
              >
                <View style={tw`flex justify-center items-center mt-64`}>
                  <View
                    style={tw`bg-white border-2 border-[#a457f0] rounded-lg w-[89%] pt-10 pb-8 items-center shadow-lg elevation-5`}
                  >
                    <TouchableOpacity
                      style={tw`absolute right-4 top-2`}
                      onPress={toggleCallOrEditModal}
                    >
                      <View>
                        <Icon
                          name="close"
                          type="font-awesome"
                          size={25}
                          color="#a457f0"
                        />
                      </View>
                    </TouchableOpacity>

                    {<>
                      <TouchableOpacity
              style={tw`rounded-xl bg-[#a457f0] p-2 px-8 mx-3`}
              
            >
              <Text style={tw`text-white font-bold text-center text-lg`}>
                Call Now
              </Text>
            </TouchableOpacity>


                      <TouchableOpacity 
                        style={tw`rounded-xl bg-[#f08757] mt-5 p-2 px-8 mx-3`}
                        onPress={() => {
                          toggleCallOrEditModal();
                          toggleContactModalOpen();
                          console.log("values: ", editContactInfo)
                        }}
                      >
                        <Text style={tw`text-white font-bold text-center text-lg`}>Edit Contact</Text>
                      </TouchableOpacity>
                      </>}
                  </View>
                </View>
              </Modal>
            </View>

        {/* <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
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
        </View> */}

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-2xl text-center font-bold p-1`}>
            Activity Log
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Walk')}>
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
                  {/* <Text>Important Documents</Text>
          <Text>Keep  your important pet documents organized:</Text>
          <Text>Relevant Documents like vaccination proof, spay/neuter details, adoption records, etc.</Text> */}
      </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default DetailsScreen;
