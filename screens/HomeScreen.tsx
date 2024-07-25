import { useEffect, useState } from 'react';
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
  const [imgUri, setImgUri] = useState<string | null>(currentPet?.uri || null);
  // console.log('petsArray on homescreen: ', JSON.stringify(petsArray[petsArray.length - 1], null, 2));
  // console.log('current pet', currentPet)
  // console.log('curr pet on home', currentPet?.petName)

  useEffect(() => {
    // when upgrading to React Navigation 7.0 or higher, "any" below can be replaced by "NavigationRemoveEvent"
    navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
    });

    if (petsArray.length === 0) {
      navigation.navigate('GettingStarted');
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
    <SafeAreaView style={tw`h-full flex gap-2`}>
      <View style={tw`pt-1 w-full`}>
        <Icon name="dog" type="material-community" size={34} color={'black'} />
      </View>
      <View
        style={tw`flex flex-row w-full items-center justify-around px-4 mt-3 mb-5`}
      >
        <View style={tw`w-[100%] flex items-center`}>
          {/* <Text style={tw`text-xl pb-4`}>Welcome back</Text> */}
          <Text style={tw`text-2xl text-gray-500`}>
            How is
            <Text style={tw`font-bold text-[#10B981]`}>
              {' '}
              {currentPet ? currentPet.petName : 'your pet'}{' '}
            </Text>
            today?
          </Text>
        </View>

      </View>
      <View>
        <NavOptions navigation={navigation} />
      </View>
      <View>
        <Reminders navigation={navigation} currentPet={currentPet} />
      </View>

      <View style={tw`w-full flex items-center`}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
            style={{
              width: petsArray.length === 1 ? 300 : 200,
              height: petsArray.length === 1 ? 300 : 170,
              resizeMode: 'contain',
              borderRadius: 30,
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

      {/* only show list if multiple pets */}
      {petsArray.length > 1 && (
        <PetsList navigation={navigation} />
      )}

      {/* {petsArray.length === 1 && (
        <TouchableOpacity
          style={tw`bg-[#6FD5B3] w-[89%] mx-auto rounded-xl py-2`}
          onPress={() => navigation.navigate('GettingStarted')}
        >
          <Text style={tw`text-white text-lg text-center font-semibold`}>
            Add Pet
          </Text>
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );
}

export default HomeScreen;
