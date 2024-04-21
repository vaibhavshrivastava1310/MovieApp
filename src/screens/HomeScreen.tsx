import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';
import {useState} from 'react';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
const {width, height} = Dimensions.get('window');
const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    // console.log(json);
    // console.log(nowPlayingMovies);

    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getNowPlayingMoviesList function',
      error,
    );
  }
};
// Main Appp
const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    // console.log('fwfefewfdf',json)
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getUpcomingMoviesList function',
      error,
    );
  }
};
const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getPopularMoviesListList function',
      error,
    );
  }
};
const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  React.useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.results);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.results);
    })();
  }, []);
  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };
  // console.log('ZXXXXX',upcomingMoviesList)
  // console.log('YYYYYYYYYYYXXXXX',upcomingMoviesList.length)

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <StatusBar backgroundColor={'#000000'} />
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'#ff5523'} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.container} bounces={false}>
        <StatusBar backgroundColor={'black'} />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <CategoryHeader title={'Now Playing'} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          horizontal
          snapToInterval={width * 0.7 + 36}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          contentContainerStyle={styles.containerGap}
          renderItem={({item, index}) => {
            if (!item.original_title) {
              return (
                <View
                  style={{width: (width - (width * 0.7 + 36 * 2)) / 2}}></View>
              );
            }
            return (
              <MovieCard
                shouldMarginatedAtEnd={true} // this property gives margin at end
                cardFunction={() => {
                  navigation.push('MovieDetail', {movieid: item.id});
                }}
                cardWidth={width * 0.7} // 70% of total width
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.original_title}
                imagePath={baseImagePath('w780', item.poster_path)}
                genre={item.genre_ids.slice(1, 4)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }}
        />
        <CategoryHeader title={'Popular'} />
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true} // this property gives margin at end
              cardFunction={() => {
                navigation.push('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true} // this property gives margin at end
              cardFunction={() => {
                navigation.push('MovieDetail', {movieid: item.id});
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#000000',
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: 36,
    marginTop: 28,
  },
  containerGap: {
    gap: 36,
  },
});
