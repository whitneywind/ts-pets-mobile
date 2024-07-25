import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import dogImg from "../assets/images/germanshepherd.png";
import catImg from "../assets/images/fluffycat.png";
import { setCurrentPet } from "../slices/petsSlice";
import { PetData } from "../typings";
import { RootState } from "../store";

const PetsList = ({ navigation }: any) => {
  const petData = useSelector((state: RootState) => state.pets.petsArray);
  const currPet = useSelector((state: RootState) => state.pets.currentPet);

  const dispatch = useDispatch();

  const handleSwitchPet = (id: string) => {
    if (currPet && currPet.id != id) {
      const newPetIndex = petData.findIndex((pet) => pet.id == id);
      dispatch(setCurrentPet(petData[newPetIndex]));
    }
  };

  return (
    <View style={tw`px-6`}>
      <FlatList
        data={petData}
        horizontal
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`rounded-lg mb-3`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`mr-6`}
            onPress={() => handleSwitchPet(item.id)}
          >
            <View style={tw`bg-white px-5 py-3 rounded-lg shadow-sm`}>
              <Image
                style={[
                  {
                    width: 80,
                    height: 60,
                    resizeMode: "contain",
                    borderRadius: 10,
                  },
                  tw`self-center`,
                ]}
                source={
                  item.uri
                    ? { uri: item.uri }
                    : item.avatar === "dog"
                    ? dogImg
                    : catImg
                }
              />
              <Text style={tw` text-center`}>
                {item.petName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={tw`mt-10 ml-4`}
            onPress={() => navigation.navigate("GettingStarted")}
          >
            <Icon
              name="pluscircle"
              type="antdesign"
              size={25}
              color="#64748ba1"
            />
            {/* <Text style={tw`text-gray-500 mt-1`}>Add Pet</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default PetsList;
