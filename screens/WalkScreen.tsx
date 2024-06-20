import { Icon } from '@rneui/base';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import tw from 'twrnc';
import LongDog from '../assets/images/longdog.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import WalkChart from '../components/WalkChart';
import { PetData } from '../typings';
import { Calendar } from 'react-native-calendars';
import { updateOnePet, setCurrentPet } from '../slices/petsSlice';
import { Picker } from '@react-native-picker/picker';
import { RootState } from '../store';

type Props = {
  navigation: any;
};

const WalkScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const currentPet = useSelector((state: RootState) => state.pets.currentPet);
  const currentPetWalkData = { ...currentPet!.walkData };

  const lastSevenDates: string[] = [];
  const dataFromLastSevenDates = [0, 0, 0, 0, 0, 0, 0];

  const [walkModalOpen, setWalkModalOpen] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');

  for (let i = 7, j = 0; i > 0; i--, j++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    lastSevenDates.push(formattedDate);

    // get data for this date if it exists
    if (!currentPetWalkData) {
      continue;
    } else if (currentPetWalkData[formattedDate]) {
      const walkingTime = parseInt(currentPetWalkData[formattedDate]);
      dataFromLastSevenDates[j] = walkingTime;
    }
  }

  let walkingAvg = Math.floor(
    dataFromLastSevenDates.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / 7
  );

  const getAvg = () => {
    let avg = dataFromLastSevenDates.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    walkingAvg = Math.floor(avg / 7);
  };

  useEffect(() => {
    getAvg();
  }, []);

  const handleSubmit = (values: any) => {
    // TO-DO: refactor to use for both modals
    const petId = currentPet!.id;
    let updatedDetails: any;

    if (updatingGoal) {
      // update for goal
      console.log('values: ', values);
      updatedDetails = {
        walkGoal: parseInt(values.walkGoal),
      };
      setUpdatingGoal(false);
    } else {
      let currentIndex = lastSevenDates.indexOf(values['walkDate']);
      if (currentIndex >= 0) {
        dataFromLastSevenDates[currentIndex] = parseInt(values.walkLength);
      }
      // update state as well
      const newWalkData = { ...currentPetWalkData };
      if (newWalkData && petId) {
        newWalkData[values['walkDate']] = values.walkLength;
        updatedDetails = {
          walkData: newWalkData,
        };
      }
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
    getAvg();
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          walkDate: selectedDate,
          walkLength: '',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
          setWalkModalOpen(!walkModalOpen);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                handleChange('walkDate')(day.dateString);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
            />
            <Text style={tw`text-lg mt-4 text-center`}>Duration (min)</Text>
            <View style={tw`flex-row items-center mb-6`}>
              <TextInput
                style={tw`border border-gray-300 text-xl pb-4 pt-2 mt-2 flex-1 text-center`}
                onChangeText={handleChange('walkLength')}
                onBlur={handleBlur('walkLength')}
                value={values.walkLength}
                placeholder="20"
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={tw`rounded-xl bg-[#53A2FF] px-3 py-2`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white font-bold text-center text-lg`}>
                Submit Walk
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  };

  const renderGoalForm = () => {
    return (
      <Formik
        initialValues={{
          walkGoal: currentPet!.walkGoal,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
          setGoalModalOpen(!goalModalOpen);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text style={tw`text-xl mt-4 text-center`}>
              Daily Goal (in minutes)
            </Text>
            <Picker
              style={tw`border border-gray-300 mt-2`}
              selectedValue={values.walkGoal.toString()}
              onValueChange={handleChange('walkGoal')}
            >
              {Array.from({ length: 30 }, (_, i) => (i + 1) * 5).map(
                (multiple) => (
                  <Picker.Item
                    key={multiple.toString()}
                    label={multiple.toString()}
                    value={multiple.toString()}
                  />
                )
              )}
            </Picker>
            <TouchableOpacity
              style={tw`rounded-xl bg-[#53A2FF] px-3 py-2`}
              onPress={() => handleSubmit()}
            >
              <Text style={tw`text-white font-bold text-center text-lg`}>
                Update Daily Goal
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
          <Text style={tw`text-xl font-semibold pr-2`}>Activity</Text>
          <Icon name="more-vertical" type="feather" size={25} style={tw``} />
        </View>

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg mb-5`}>
          <View style={tw`flex items-center gap-y-2`}>
            <Image
              source={LongDog}
              style={{
                width: 230,
                height: 100,
                resizeMode: 'cover',
              }}
            />
            <Text style={tw`text-2xl text-center p-1 font-bold underline`}>
              {currentPet!.petName}
            </Text>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-xl p-1`}>Daily Goal:</Text>
              <Text style={tw`text-xl p-1 font-bold`}>
                {currentPet && currentPet.walkGoal > 0
                  ? currentPet.walkGoal
                  : 0}
                <Text style={tw`font-normal`}> min</Text>
              </Text>

            </View>
            <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-xl p-1`}>Weekly Average:</Text>
              <Text style={tw`text-xl p-1 font-bold`}>
                {walkingAvg}
                <Text style={tw`font-normal`}> min</Text>
              </Text>
            </View>
            {/* {currentPet!.walkStreak > 0 && (
              <View style={tw`flex-row justify-between w-5/6`}>
                <Text style={tw`text-xl p-1 font-semibold`}>Current Streak:</Text>
                <Text style={tw`text-xl p-1 font-bold`}>
                  {currentPet && currentPet.walkStreak ? currentPet.walkStreak : 0}
                  <Text style={tw`font-normal`}> days</Text>
                  </Text>
              </View>
            )} */}

            <TouchableOpacity
              onPress={() => setWalkModalOpen(!walkModalOpen)}
              style={tw`flex-row justify-between w-5/6 bg-[#53A2FF] rounded-lg py-2 mt-4`}
            >
              <Text
                style={tw`text-lg font-bold text-white text-right w-full text-center p-1`}
              >
                Add Activity
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setGoalModalOpen(!goalModalOpen);
                setUpdatingGoal(true);
              }}
              style={tw`flex-row justify-between w-5/6 bg-[#9a9b9c] rounded-lg py-2 mt-2`}
            >
              <Text
                style={tw`text-lg font-semibold text-white text-right w-full text-center p-1`}
              >
                Edit Goal
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={walkModalOpen}
          onRequestClose={() => {
            setWalkModalOpen(!walkModalOpen);
          }}
        >
          {/* <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                onPressOut={() => setWalkModalOpen(false)}
              > */}
          <View style={tw`flex justify-center items-center mt-32`}>
            <View
              style={tw`bg-white border-2 border-[#53A2FF] rounded-lg w-2/3 py-8 items-center shadow-lg elevation-5`}
            >
              <TouchableOpacity
                style={tw`absolute right-4 top-2`}
                onPress={() => setWalkModalOpen(false)}
              >
                <View>
                  <Icon
                    name="close"
                    type="font-awesome"
                    size={25}
                    color="#53A2FF"
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={tw`text-center text-2xl font-semibold text-slate-800`}
              >
                New Walk
              </Text>

              {renderForm()}
            </View>
          </View>
          {/* </TouchableWithoutFeedback> */}
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={goalModalOpen}
          onRequestClose={() => {
            setGoalModalOpen(!goalModalOpen);
          }}
        >
          <View style={tw`flex justify-center items-center mt-32`}>
            <View
              style={tw`bg-white border-2 border-[#53A2FF] rounded-lg w-2/3 py-8 items-center shadow-lg elevation-5`}
            >
              <TouchableOpacity
                style={tw`absolute right-4 top-2`}
                onPress={() => setGoalModalOpen(false)}
              >
                <View>
                  <Icon
                    name="close"
                    type="font-awesome"
                    size={25}
                    color="#53A2FF"
                  />
                </View>
              </TouchableOpacity>
              {/* <Text
                style={tw`text-center text-2xl font-semibold text-slate-800`}
              >
                Set Daily Goal
              </Text> */}
              {renderGoalForm()}
            </View>
          </View>
        </Modal>

        {lastSevenDates !== undefined && (
          <View style={tw`w-full mx-auto bg-white rounded-lg mb-5`}>
            <WalkChart
              lastSevenDates={lastSevenDates}
              dataFromLastSevenDates={dataFromLastSevenDates}
            />
          </View>
        )}

        <View style={tw`w-full mx-auto pb-3 bg-white rounded-lg`}>
          <Text style={tw`text-xl text-center font-bold p-1 mt-1`}>
            Back to Homepage
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={tw`bg-[#53A2FF] rounded-lg py-2 w-1/3 mt-1 mx-auto`}>
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

export default WalkScreen;
