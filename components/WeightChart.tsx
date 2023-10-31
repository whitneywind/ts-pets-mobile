import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import tw from "twrnc";

const WeightChart = ({ navigation, currentPetWeightData }: any) => {
  // data will consist of the last 7 entries (walkTimes only for now)
  
  return (
    <View style={tw`bg-[#a457f0] rounded-lg py-2`}>
      <Text style={tw`py-1 text-lg font-semibold text-center text-white`}>
        Weight Log:
      </Text>
      <LineChart
        data={{
          labels: ["M", "T", "W", "Th", "F", "S", "Su"],
          datasets: [
            {
              data: [0, 0, 0, 0, 0, 0, 0],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        yAxisSuffix="m"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          //   backgroundColor: "#f7f0fd",
          backgroundGradientFrom: "#C084FC",
          backgroundGradientTo: "#eadcf7",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            // borderRadius: 16,
            // yAxisLabel: { width: 10 },
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#C084FC",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          //   borderRadius: 16,
          marginLeft: -20,
        }}
      />
    </View>
  );
};
export default WeightChart;
