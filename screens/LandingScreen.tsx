import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Corgo from '../assets/images/corgo.png';
import { Icon } from '@rneui/base';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { PetData } from '../typings';
import { setCurrentPet } from '../slices/petsSlice';
import { useEffect } from 'react';
import { RootState } from '../store';

type Props = {
  navigation: any;
};

const LandingScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const pets = useSelector((state: RootState) => state.pets);
  const currentPet = pets.currentPet;
  // console.log('curr', currentPet);
  const petsArray = pets.petsArray;
  console.log('len', petsArray.length);
  // const dogFacts = useSelector((state: RootState) => state.dogFacts);
  // console.log('pets array?: ', pets.petsArray);
  // console.log('dog facts?: ', dogFacts.dogFacts);

  useEffect(() => {
    if (petsArray && petsArray.length > 0) {
      dispatch(setCurrentPet(petsArray[petsArray.length - 1]));
    }
  }, []);

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`pt-1 mb-16 w-full`}>
        <Icon name="dog" type="material-community" size={40} />
        <Text style={tw`text-center text-xl`}>Pet Place</Text>
      </View>
      <View>
        <Image
          source={Corgo}
          resizeMode="contain"
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
          }}
        />
        <Text style={tw`text-center text-3xl mx-8 mt-2 leading-normal`}>
          Helping you care for your pet one day at a time
        </Text>
        <Text
          style={tw`text-center text-lg mx-8 tracking-wide mt-3 text-gray-600`}
        >
          All pets deserve care and love
        </Text>
        <TouchableOpacity
          style={tw`rounded-lg w-3/5 mx-auto rounded-full bg-emerald-500 py-3 mt-12`}
          onPress={() => {
            if (petsArray && petsArray.length > 0) {
              navigation.navigate('Home');
            } else {
              navigation.navigate('GettingStarted');
            }
          }}
        >
          <Text style={tw`text-center text-2xl text-white font-bold`}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
