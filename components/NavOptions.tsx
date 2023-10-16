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
    title: "Details",
    icon: "paw",
    iconType: "font-awesome-5",
    screen: "Details",
    color: "#10B981",
  },
  {
    id: "2",
    title: "Health",
    icon: "heartbeat",
    iconType: "font-awesome-5",
    screen: "Health",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Photos",
    icon: "camera",
    iconType: "font-awesome-5",
    screen: "Details",
    color: "#10B981",
  },
  {
    id: "4",
    title: "Social",
    icon: "dog",
    iconType: "font-awesome-5",
    screen: "Details",
    color: "#10B981",
  },
];

const NavOptions = ({ navigation }: any) => {

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`mb-8 w-[89%] mx-auto justify-between flex`}
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
          <Text style={tw`text-center mt-1 font-semibold`}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
export default NavOptions;

// alternative:
{
  /* <FlatList
data={navData}
keyExtractor={(item) => item.id}
contentContainerStyle={tw`mb-5 w-[89%] mx-auto flex items-center gap-5`}
numColumns={2}
renderItem={({ item }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate(item.screen)}
    style={tw`flex rounded-lg px-6`}
  >
    <View style={tw`py-6 px-8 bg-[${item.color}] rounded-lg`}>
      <Icon
        style={tw`rounded-full w-10 self-center text-white`}
        name={item.icon}
        color="white"
        type={item.iconType}
      />
    </View>
    <Text style={tw`text-center mt-1 font-semibold`}>{item.title}</Text>
  </TouchableOpacity>
)}
/>
);
}; */
}
