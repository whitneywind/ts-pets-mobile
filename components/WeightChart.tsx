import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import tw from "twrnc";

const WeightChart = ({ navigation, weightData }: any) => {
  // data will consist of the last 7 entries (walkTimes only for now)
  
  return (
    <View style={tw`bg-[#53A2FF] rounded-lg py-2`}>
      <Text style={tw`py-1 text-lg font-semibold text-center text-white`}>
        Weight Log:
      </Text>
      <LineChart
        data={{
          labels: ["M", "T", "W", "Th", "F", "S", "Su"],
          datasets: [
            {
              data: weightData,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        yAxisSuffix="m"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          //   backgroundColor: "#C084FC",
          backgroundGradientFrom: "#53a2ff",
          backgroundGradientTo: "#daeaff",
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
            stroke: "#1f63f1",
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
