import tw from "twrnc";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";

const Reminders = ({ navigation, currentPet }: any) => {

  return (
    <View style={[tw`w-[89%] mx-auto rounded-xl`]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Health")}
        style={tw`flex flex-row justify-between bg-[#6FD5B3] rounded-xl items-center pl-3 pr-6 py-5 mb-6`}
      >
        <View style={tw`w-[70%]`}>
          <View style={tw`flex flex-row`}>
            <Icon name="clock" type="feather" color="white" />
            <Text style={tw`text-white text-xl font-bold pb-1 pl-1`}>
              Yearly Checkup
            </Text>
          </View>
          <View style={tw`flex flex-row`}>
            <Text style={tw`text-white`}> 9:00 AM • 2/12/2024</Text>
          </View>
        </View>
        <Icon name="calendar" type="antdesign" color="white" size={45} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Walk")}
        style={tw`flex flex-row justify-between bg-[#53A2FF] rounded-xl items-center pl-3 pr-6 py-5`}
      >
        <View style={tw`w-[70%]`}>
          <View style={tw`flex flex-row items-center mb-1`}>
            <Icon name="paw" type="font-awesome-5" size={20} color="white" />
            <Text style={tw`text-white text-xl font-bold pl-2`}>
              Daily Goal:
            </Text>
            <Text style={tw`text-white text-xl font-bold pl-2`}>{currentPet.walkGoal} min</Text>
          </View>

             {currentPet.walkGoalMet ? (
                <View style={tw`flex flex-row`}>
                  <Icon name="check" type="feather" color="white" size={15} />
                  <Text style={tw`text-white pr-1`}> You reached today's goal!
                  </Text>
                </View>
              ) : (
                <View style={tw`flex flex-row`}>
                  <Text style={tw`text-white`}> Enter today's walk!
                  </Text>
                </View>
              )
              }
        </View>
        <Icon
          name={currentPet.walkGoalMet ? "square" : "check-square"}
          type="feather"
          color="white"
          size={45}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Reminders;
const styles = StyleSheet.create({});
