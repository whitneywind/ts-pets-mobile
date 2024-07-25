import { Icon } from "@rneui/themed";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const navData = [
  {
    id: "1",
    title: "Activity",
    icon: "paw",
    iconType: "font-awesome-5",
    screen: "Walk",
    color: "#10B981",
  },
  {
    id: "2",
    title: "Places",
    icon: "map-marker-alt",
    iconType: "font-awesome-5",
    screen: "Places",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Health",
    icon: "heartbeat",
    iconType: "font-awesome-5",
    screen: "Health",
    color: "#10B981",
  },
  {

    id: "4",
    title: "Profile",
    icon: "dog",
    iconType: "font-awesome-5",
    screen: "Profile",
    color: "#10B981",
  },
];

const NavOptions = ({ navigation }: any) => {

  return (
    <FlatList
    data={navData}
    horizontal
    keyExtractor={(item) => item.id}
    contentContainerStyle={tw`w-[89%] mx-auto justify-between flex mb-5`}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
        style={tw`w-18 flex rounded-lg`}
      >
        <View style={tw`py-3 bg-[${item.color}] flex rounded-lg`}>
          <Icon
            style={tw`p-2 rounded-full w-10 self-center text-white`}
            name={item.icon}
            color="white"
            type={item.iconType}
          />
        </View>
        <Text style={tw`text-center mt-2 font-semibold`}>{item.title}</Text>
      </TouchableOpacity>
    )}
  />
  );
};

export default NavOptions;