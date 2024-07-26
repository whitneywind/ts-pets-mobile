import { Icon } from '@rneui/base';
import { useRef, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import MapView, { Marker, Region } from 'react-native-maps';

const markers = [
{
    latitude: 32.7713,
    longitude: -117.2160,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
    name: 'FiestaIsland'
  },
  {
    latitude: 32.8025,
    longitude: -117.2415,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'North Beach Dog Run'
  },
  {
    latitude: 32.9595,
    longitude: -117.2653,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Del Mar Dog Beach'
  },
  {
    latitude: 32.7123,
    longitude: -117.1542,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Grape Street Dog Park'
  },
  {
    latitude: 32.7345,
    longitude: -117.1234,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Morley Field Dog Park'
  },
  {
    latitude: 32.7890,
    longitude: -117.2345,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: "Nate's Point"
  },
  {
    latitude: 32.8234,
    longitude: -117.1876,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Capehart Dog Park'
  },
  {
    latitude: 32.7827,
    longitude: -117.2471,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    name: "Ocean Beach"
  },
  {
    latitude: 32.7567,
    longitude: -117.1987,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Doyle Recreation Center'
  },
  {
    latitude: 32.8567,
    longitude: -117.1456,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Kearny Mesa Community Park'
  },
  {
    latitude: 32.9123,
    longitude: -117.2543,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    name: 'Torrey Highlands Dog Park'
  }
]


const PlacesScreen = ({ navigation }: any) => {
  const mapRef = useRef<MapView | any>();

  const SanDiego = {
    latitude: 32.9595,
    longitude: -117.2653,
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421, 
  };
  

  const focusMap = (marker?: any) => {
    if (marker) {
      mapRef.current?.animateCamera({ center: marker, altitude: 7000, zoom: 10 }, { duration: 1200})
    } else {
      mapRef.current?.animateToRegion(markers[0]);
    }
  };

  const onRegionChange = (region: Region) => {
    console.log(region)
  }

  const onMarkerSelected = (marker: any) => {
    focusMap(marker);
    // console.log(JSON.stringify(marker, null, 2));
    // if (mapRef.current) {
    //   const newRegion = {
    //     latitude: marker.latitude,
    //     longitude: marker.longitude,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01, 
    //   };
    //   mapRef.current?.animateCamera(newRegion, { duration: 1200 });
    // } else {
    //   console.error('Map ref is not ready');
    // }
  }

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
            <TouchableOpacity onPress={() => focusMap()}>
              <View style={{ padding: 10 }}>
                <Text>Focus</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`w-[89%] h-[69%] mx-auto pb-3 bg-white rounded-lg mb-5 `}>
            <Text style={tw`text-xl text-center font-bold p-1 pt-2 mb-4 underline`}>
              Find Dog-Friendly Spots
            </Text>
            <View style={tw`flex-1`}>
              <MapView 
                style={tw`h-full w-full`}
                initialRegion={SanDiego}
                showsUserLocation
                showsMyLocationButton
                ref={mapRef}
                onRegionChangeComplete={onRegionChange}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    id={index + "id"}
                    title={marker.name}
                    description='A place!'
                    coordinate={marker} 
                    onPress={() => onMarkerSelected(marker)}
                  />
                ))}
              </MapView>
            </View>
          </View>
        {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default PlacesScreen;
