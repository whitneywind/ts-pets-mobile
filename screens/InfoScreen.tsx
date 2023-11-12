import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    Pressable,
    FlatList,
    TextInput,
} from 'react-native';
import tw from 'twrnc';

type ItemProps = { 
    name: string;
    description: string;
    [key: string]: any;
};


const InfoScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState<any>('');
    const [searchResult, setSearchResult] = useState<any>(null);
    const [allBreeds, setAllBreeds] = useState<Array<any>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // TO-DO!: save breed data in redux so fetchAllBreeds will only run if that data doesn't yet exist - saving a LOT of fetch calls

    const fetchAllBreeds = async () => {
        const breedList = [];
        let nextPage = `https://dogapi.dog/api/v2/breeds`;
    
        try {
          while (nextPage) {
            const response = await fetch(nextPage);
            const data = await response.json();
            const breeds = data.data;
    
            // Add breeds to the list
            breedList.push(...breeds);
    
            // Check if there is a next page
            nextPage = data.links.next;
          }
    
          // Store all the breeds in state
          setAllBreeds(breedList);
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(()  => {
        fetchAllBreeds();
    }, []);

    const searchBreed = () => {
        const breed = allBreeds.find((item) => item.attributes.name === searchQuery);
    
        if (breed) {
          setSearchResult(breed);
        } else {
          setSearchResult(null); // Breed not found
        }
      };

    return (
        <SafeAreaView>
            <View>
            <TextInput
                placeholder="Search for a dog breed"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Button title="Search" onPress={searchBreed} />
            {searchResult ? (
                <View>
                <Text>Name: {searchResult.attributes.name}</Text>
                <Text>Description: {searchResult.attributes.description}</Text>
                {/* Display other breed attributes as needed */}
                </View>
            ) : (
                <Text>Breed not found</Text>
            )}
            </View>
                <Text style={tw`text-center `}>Dog Breed Info Powered by Stratonauts Dog API</Text>
        </SafeAreaView>
    )
};

export default InfoScreen;