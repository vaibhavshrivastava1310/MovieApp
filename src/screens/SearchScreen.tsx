import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import InputHeader from '../components/InputHeader';
import {searchMovies ,baseImagePath} from '../api/apicalls';
import SubMovieCard from '../components/SubMovieCard';

const {width, height} = Dimensions.get('screen');



const SearchScreen = ({navigation}:any) => {
  const [searchList, setSearchList] = useState([]);
  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      // console.log('RSSSSS',response)
      let json = await response.json();
      // console.log('JSSSSSS',json)
      setSearchList(json.results);
      // console.log('Searchg',searchList)
      // console.log('Name : ',name)
      // console.log('Function Calles')

    } catch (error) {
      console.error('Something went wrong in searchMovieListFunction', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#000000'} />
        <View>
          <FlatList
            data={searchList}
            keyExtractor={(item: any) => item.id}
            bounces={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListHeaderComponent={
              <View style={styles.InputHeaderContainer}>
                <InputHeader searchFunction={searchMoviesFunction} />
              </View>
            }
            scrollEnabled
            contentContainerStyle={styles.centerContainer}
            renderItem={({item, index}) => (
              <SubMovieCard
                shouldMarginatedAtEnd={false} // this property gives margin at end
                shouldMarginatedAround={true}
                cardFunction={() => {
                  navigation.push('MovieDetail', {movieid: item.id});
                }}
                cardWidth={width / 2 - 12 * 2}
                title={item.original_title}
                imagePath={baseImagePath('w342', item.poster_path)}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000000',
    flex: 1,
    width,
    alignItems: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: 36,
    marginVertical: 28,
    display:'flex',
  },
  centerContainer:{
    alignItems:'center',
  }
});
