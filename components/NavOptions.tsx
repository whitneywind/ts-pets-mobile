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
    title: "About",
    icon: "paw",
    iconType: "font-awesome-5",
    screen: "Details",
    color: "#10B981",
  },
  {
    id: "2",
    title: "Activity",
    icon: "dog",
    iconType: "font-awesome-5",
    screen: "Walk",
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
    title: "Info",
    icon: "book",
    iconType: "font-awesome-5",
    screen: "Info",
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
  //   <FlatList
  //     data={navData}
  //     scrollEnabled={false}
  //     numColumns={2}
  //     keyExtractor={(item) => item.id}
  //     contentContainerStyle={tw`mb-6 w-[89%] mx-auto items-center gap-8 flex`}
  //     renderItem={({ item }) => (
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate(item.screen)}
  //         style={tw`w-28 mx-6 flex rounded-lg`}
  //       >
  //         <View style={tw`py-5 bg-[${item.color}] flex rounded-lg`}>
  //           <Icon
  //             style={tw`p-2 rounded-full w-10 self-center text-white`}
  //             name={item.icon}
  //             color="white"
  //             type={item.iconType}
  //           />
  //         </View>
  //         <Text style={tw`text-center mt-1 font-semibold`}>{item.title}</Text>
  //       </TouchableOpacity>
  //     )}
  //   />
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
