import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const PlacesScreen = ({ navigation }: any) => {

  return (
    <SafeAreaView style={tw`h-full`}>
        {/* <ScrollView style={tw`w-[89%] mx-auto`}> */}
          <View
            style={tw`flex flex-row items-center justify-between mt-2 mb-5`}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" type="antdesign" size={25} style={tw``} />
            </TouchableOpacity>
            <Text style={tw`text-xl font-semibold pr-2`}>Info</Text>
            <Icon name="more-vertical" type="feather" size={25} style={tw``} />
          </View>

          <View style={tw`w-[89%] h-[69%] mx-auto pb-3 bg-white rounded-lg mb-5 `}>
            <Text
              style={tw`text-xl text-center font-bold p-1 pt-2 mb-4 underline`}
            >
              Find Dog-Friendly Spots
            </Text>
            <View style={tw`flex-1`}>
              <MapView 
                style={tw`h-full w-full`}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 32.9595,
                  longitude: -117.2653,
                  latitudeDelta: 0.0922, 
                  longitudeDelta: 0.0421, 
                }}
                showsUserLocation
                showsMyLocationButton
              />
            </View>
          </View>
        {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default PlacesScreen;
