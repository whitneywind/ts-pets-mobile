import { Icon } from '@rneui/base';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Formik } from 'formik';
import WeightChart from '../components/WeightChart';
import { PetData, WeightData } from '../typings';
import { setCurrentPet, updateOnePet } from '../slices/petsSlice';
import { RootState } from '../store';

type Props = {
  navigation: any;
};

const HealthScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const currentPet = useSelector((state: RootState) => state.pets.currentPet);
  const currentPetWeightData = { ...currentPet!.weightData };


  const lastFiveDates: string[] = ['', '', '', '', ''];
  const weightsFromLastFiveDates: number[] = [0, 0, 0, 0];

  const [weightModalOpen, setWeightModalOpen] = useState(false);

  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate());
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // update to get only if exist
  if (currentPetWeightData) {
    let dates = Object.keys(currentPetWeightData).sort().slice(-5);

    for (let date of dates) {
      lastFiveDates.shift();
      lastFiveDates.push(date);
      weightsFromLastFiveDates.push(Number(currentPetWeightData[date]));
    }
  }


  const handleSubmit = (values: any) => {
    console.log('values', values);
    currentPetWeightData[values.weightDate] = values.weight;


    // update state as well
    const petId = currentPet?.id;
    if (currentPetWeightData && petId) {
      // currentPetWeightData.set(values['weightDate'], values.weight);

      lastFiveDates.shift();
      lastFiveDates.push(values.weightDate)

      const updatedDetails = {
        weightData: currentPetWeightData,
        weight: values.weight,
      }
      dispatch(
        updateOnePet({
          petId,
          updatedDetails,
        })
      );
      dispatch(
        setCurrentPet({
          ...currentPet,
          ...updatedDetails,
        })
      );
    }
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          weightDate: formattedDate,
          weight: '',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
          setWeightModalOpen(!weightModalOpen);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={tw`text-lg mt-4 text-center`}>Weight (lbs)</Text>
            <View style={tw`flex-row items-center mb-6`}>
              <TextInput
                style={tw`border border-gray-300 text-xl pb-4 pt-2 mt-2 flex-1 text-center`}
                onChangeText={handleChange('weight')}
                onBlur={handleBlur('weight')}
                value={values.weight}
                placeholder="20"
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={tw`rounded-xl bg-[#a457f0] p-2 px-8`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white font-bold text-center text-lg`}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  };

  return (
    <SafeAreaView style={tw` h-full`}>
      <ScrollView style={tw`w-[89%] mx-auto`}>
        <View style={tw`flex flex-row items-center justify-between mt-2 mb-5`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
          </TouchableOpacity>
          <Text style={tw`text-xl font-semibold pr-2`}>Health</Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <Text style={tw`text-xl text-center font-bold p-1 pt-2 underline`}>
            Medical Details
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
          <View style={tw`flex items-center gap-y-2`}>
            <Text style={tw`text-xl text-center p-1 font-bold underline`}>
              Weight Details
            </Text>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Current Weight:</Text>
              <Text style={tw`text-lg p-1`}>{currentPet!.weight}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setWeightModalOpen(!weightModalOpen)}
              style={tw`flex-row justify-between w-5/6 bg-[#a457f0] rounded-lg py-2`}
            >
              <Text
                style={tw`text-lg font-bold text-white text-right w-full text-center p-1`}
              >
                Update Weight
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={weightModalOpen}
          onRequestClose={() => {
            //   Alert.alert("Modal has been closed.");
            setWeightModalOpen(!weightModalOpen);
          }}
        >
          {/* <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                onPressOut={() => setWalkModalOpen(false)}
              > */}
          <View style={tw`flex justify-center items-center mt-64`}>
            <View
              style={tw`bg-white border-2 border-[#a457f0] rounded-lg w-2/3 pt-10 pb-8 items-center shadow-lg elevation-5`}
            >
              <TouchableOpacity
                style={tw`absolute right-4 top-2`}
                onPress={() => setWeightModalOpen(false)}
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
                New Weight
              </Text>
              
              {renderForm()}
            </View>
          </View>
        </Modal>

        {currentPetWeightData !== undefined && (
          <View style={tw`w-full mx-auto bg-white rounded-lg mb-5`}>
            <WeightChart lastFiveDates={lastFiveDates} weightsFromLastFiveDates={weightsFromLastFiveDates}  />
          </View>
        )}

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-xl text-center font-bold p-1 mt-1`}>
            Back to Homepage
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={tw`bg-[#a85cf5] rounded-lg py-2 w-1/3 mt-1 mx-auto`}>
              <Icon
                name="arrow-right-circle"
                type="feather"
                size={25}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default HealthScreen;
