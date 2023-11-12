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
        contentContainerStyle={tw`rounded-lg mb-6`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`mr-5`}
            onPress={() => handleSwitchPet(item.id)}
          >
            <View style={tw`px-2 pt-3 bg-white w-40 rounded-lg shadow-sm`}>
              <Image
                style={[
                  {
                    width: 130,
                    height: 100,
                    resizeMode: "contain",
                    borderRadius: 6,
                  },
                  tw`self-center mt-3`,
                ]}
                source={
                  item.uri
                    ? { uri: item.uri }
                    : item.avatar === "dog"
                    ? dogImg
                    : catImg
                }
              />
              <Text style={tw`text-xl text-center pb-3 pt-2`}>
                {item.petName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={tw`mt-8`}
            onPress={() => navigation.navigate("GettingStarted")}
          >
            <Icon
              name="pluscircle"
              type="antdesign"
              size={50}
              color="#10B981"
            />
            <Text style={tw`text-slate-700 text-xl mt-2`}>Add New Pet</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default PetsList;
