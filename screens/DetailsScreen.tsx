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
  
  const DetailsScreen = ({ navigation }: Props) => {

    return (
        <SafeAreaView>
            <Text>Details</Text>
        </SafeAreaView>
    );
  };
  export default DetailsScreen;