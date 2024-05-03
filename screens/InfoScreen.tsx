import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import { Contact } from '../typings';
import { Formik } from 'formik';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllGeneralInfo,
  setContactInfo,
  deleteContact,
} from '../slices/generalInfoSlice';

const InfoScreen = ({ navigation }: any) => {
  const contactArray = useSelector(
    (state: RootState) => state.petInfo.contactList
  );
  const dispatch = useDispatch();
  // dispatch(clearAllGeneralInfo())

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editContactInfo, setEditContactInfo] = useState<Contact>({
    name: '',
    phoneNumber: '',
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    setContacts([...contactArray]);
  }, []);

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

    if (!contactModalOpen) {
      setEditContactInfo({ name: '', phoneNumber: '' });
      setEditIndex(-1);
    }
  };

  const handleDelete = () => {
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
          console.log('valuees; ', values);
          handleAddEditContact(values.name, values.phoneNumber);
          toggleContactModalOpen();
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
                onPress={handleDelete}
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
    <SafeAreaView style={tw` h-full`}>
      <TouchableWithoutFeedback
        onPress={() => {
          // Keyboard.dismiss
          setContactModalOpen(false);
        }}
      >
        <ScrollView style={tw`w-[89%] mx-auto`}>
          <View
            style={tw`flex flex-row items-center justify-between mt-2 mb-5`}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
            </TouchableOpacity>
            <Text style={tw`text-xl font-semibold pr-2`}>Info</Text>
            <Icon name="more-vertical" type="feather" size={25} style={tw``} />
          </View>
          <View>
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
                        setContactModalOpen(true);
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
                    onPress={toggleContactModalOpen}
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
            </View>

            {/* upcoming appointments */}

            {/* TODO: upload info or docs */}
            {/* <Text>Important Documents</Text>
          <Text>Keep  your important pet documents organized:</Text>
          <Text>Relevant Documents like vaccination proof, spay/neuter details, adoption records, etc.</Text> */}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default InfoScreen;
