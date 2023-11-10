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

    // TO-DO: save breed data in redux so fetchAllBreeds will only run if that data doesn't yet exist

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


    return (
        <SafeAreaView>

                <Text style={tw`text-center `}>Dog Breed Info Powered by Stratonauts Dog API</Text>
        </SafeAreaView>
    )
};

export default InfoScreen;