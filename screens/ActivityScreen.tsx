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
  
  const ActivityScreen = ({ navigation }: Props) => {

    return (
        <SafeAreaView>
            <Text>Activities and Such</Text>
        </SafeAreaView>
    );
  };
  export default ActivityScreen;