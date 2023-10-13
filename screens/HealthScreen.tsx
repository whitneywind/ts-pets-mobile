import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  import tw from "twrnc";

  type Props = {
    navigation: any;
  }
  
  const HealthScreen = ({ navigation }: Props) => {

    return (
        <SafeAreaView>
            <Text>Health</Text>
        </SafeAreaView>
    );
  };
  export default HealthScreen;