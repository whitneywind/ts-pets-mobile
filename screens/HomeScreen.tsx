import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { PetData } from '../typings';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import tw from 'twrnc';
import dogImg from '../assets/images/germanshepherd.png';
import catImg from '../assets/images/fluffycat.png';
import NavOptions from '../components/NavOptions';
import Reminders from '../components/Reminders';
import PetsList from '../components/PetsList';
import { RootState } from '../store';

type Props = {
  navigation: any;
};

function HomeScreen({ navigation }: Props) {
  const petsArray = useSelector((state: RootState) => state.pets.petsArray);
  let currentPet = useSelector((state: RootState) => state.pets.currentPet);
  // console.log('petsArray on homescreen: ', JSON.stringify(petsArray[petsArray.length - 1], null, 2));
  // console.log('current pet', currentPet)
  // console.log('curr pet on home', currentPet?.petName)

  React.useEffect(() => {
    // if upgrading to React Navigation 7.0 or higher, "any" below can be replaced by "NavigationRemoveEvent"
    navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });

    if (petsArray.length === 0) {
      navigation.navigate("GettingStarted");
    }
  }, [navigation]);

  if (!petsArray) {
    return (
      <SafeAreaView>
        <View style={tw`mx-auto w-1/2`}>
          <View style={tw`pt-1 mb-5 w-full`}>
            <Icon name="dog" type="material-community" size={40} />
          </View>
          <Text style={tw`text-4xl text-center mt-16`}>Add a pet now</Text>
          <TouchableOpacity
            style={tw`mt-8`}
            onPress={() => navigation.navigate('GettingStarted')}
          >
            <Icon name="pluscircle" type="antdesign" size={70} color="gray" />
            <Text style={tw`text-white text-lg pt-4`}>Add New Pet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`h-full`}>
      <View style={tw`pt-1 mb-3 w-full`}>
        <Icon name="dog" type="material-community" size={40} color={'black'} />
      </View>
      <View
        style={tw`flex flex-row w-full items-center justify-around px-4 mb-3`}
      >
        <View style={tw`w-[60%]`}>
          <Text style={tw`text-3xl pb-4`}>Welcome back</Text>
          <Text style={tw`text-xl text-gray-500`}>
            How is
            <Text style={tw`font-bold text-black`}>
              {' '}
              {currentPet ? currentPet.petName : 'your pet'}{' '}
            </Text>
            today?
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Details')}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              borderRadius: 50,
            }}
            source={
              currentPet && currentPet.uri
                ? { uri: currentPet.uri }
                : currentPet!.petType === 'dog'
                ? dogImg
                : catImg
            }
          />
        </TouchableOpacity>
      </View>
      <View>
        <NavOptions navigation={navigation} />
      </View>
      <View>
        <Reminders navigation={navigation} currentPet={currentPet} />
      </View>
      <PetsList navigation={navigation} />
      <TouchableOpacity
        style={tw`bg-[#10B981] w-[89%] mx-auto rounded-xl py-2`}
        onPress={() => navigation.navigate('GettingStarted')}
      >
        <Text style={tw`text-white text-lg text-center font-semibold`}>
          Add Pet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
