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
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import LongDog from '../assets/images/longdog.png';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import WalkChart from '../components/WalkChart';
import { PetData } from '../typings';
import { Calendar } from 'react-native-calendars';

type Props = {
  navigation: any;
};

const WalkScreen = ({ navigation }: Props) => {
  const currentPet = useSelector((state: PetData) => state.currentPet);

  const [walkModalOpen, setWalkModalOpen] = useState(false);

  const [walkData, setWalkData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [selectedDate, setSelectedDate] = useState('');


  const handleSubmit = async (values: any) => {
    console.log('entry values: ', values)
  };

  const renderForm = () => {
    return (
      <Formik
        initialValues={{
          walkDate: selectedDate,
          walkLength: '0',
        }}
        onSubmit={(values) => {
          handleSubmit(values);
          setWalkModalOpen(!walkModalOpen);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={tw`text-lg mt-4 text-center`}>Select a Date</Text>
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
            {/* <View style={tw`flex-row justify-between w-5/6`}>
              <Text style={tw`text-lg p-1`}>Walk Goal:</Text>
              <Text style={tw`text-lg p-1`}>30 min</Text>
              // this week's average walking time
            </View> */}

            <TouchableOpacity
              onPress={() => setWalkModalOpen(!walkModalOpen)}
              style={tw`flex-row justify-between w-5/6 bg-[#53A2FF] rounded-lg py-2`}
            >
              <Text
                style={tw`text-lg font-bold text-white text-right w-full text-center p-1`}
              >
                Add New Walk
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={walkModalOpen}
          onRequestClose={() => {
            //   Alert.alert("Modal has been closed.");
            setWalkModalOpen(!walkModalOpen);
          }}
        >
          {/* <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                onPressOut={() => setWalkModalOpen(false)}
              > */}
          <View style={tw`flex justify-center items-center mt-40`}>
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
                    color="gray"
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

        {walkData !== undefined && (
          <View style={tw`w-full mx-auto bg-white rounded-lg mb-5`}>
            <WalkChart walkData={walkData} />
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
