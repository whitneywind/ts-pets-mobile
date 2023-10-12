import tw from "twrnc";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";

const Reminders = ({ navigation }: any) => {

  return (
    <View style={[tw`w-[89%] mx-auto rounded-xl mb-10`]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("LandingScreen")}
        style={tw`flex flex-row justify-between bg-[#6FD5B3] rounded-xl items-center pl-3 pr-6 py-4 mb-4`}
      >
        <View style={tw`w-[70%]`}>
          <View style={tw`flex flex-row`}>
            <Icon name="pill" type="material-community" color="white" />
            <Text style={tw`text-white text-xl font-bold pb-1 pl-1`}>
              Yearly Checkup
            </Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Icon name="clock" type="feather" color="white" size={15} />
            <Text style={tw`text-white`}> 9:00 AM • 8/11/2023</Text>
          </View>
        </View>
        <Icon name="calendar" type="antdesign" color="white" size={45} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("ActivityScreen")}
        style={tw`flex flex-row justify-between bg-[#53A2FF] rounded-xl items-center pl-3 pr-6 py-4`}
      >
        <View style={tw`w-[70%]`}>
          <View style={tw`flex flex-row items-center`}>
            <Icon name="guide-dog" type="foundation" size={40} color="white" />
            <Text style={tw`text-white text-xl font-bold pl-2`}>
              Daily Goal:
            </Text>
            <Text style={tw`text-white text-xl font-bold pl-2`}>30 min</Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Icon name="star" type="feather" color="white" size={15} />
            <Text style={tw`text-white pr-1`}>
              {" "}
              <Text style={tw`font-bold`}>5</Text> day streak!
            </Text>
          </View>
        </View>
        <Icon
          name="checkbox-marked-outline"
          type="material-community"
          color="white"
          size={45}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Reminders;
const styles = StyleSheet.create({});
