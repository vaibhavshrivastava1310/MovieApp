import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import {movieCastDetails, movieDetails, baseImagePath} from '../api/apicalls';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from '../components/CustomIcons';
import {FONTFAMILY} from '../theme/Theme';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const getMovieDetails = async (movieId: number) => {
  // console.log(movieDetails(movieId))
  try {
    // console.log('qqqqqqq',movieId)
    let response = await fetch(movieDetails(movieId));
    let json = await response.json();
    // console.log('ewfefewfefef',json)
    return json;
  } catch (error) {
    console.error('Something went wrong in getMovieDetail Function', error);
  }
};

const getMovieCastDetails = async (movieId: number) => {
  try {
    // console.log('fdwedffewf',movieCastDetails(movieId))
    let response = await fetch(movieCastDetails(movieId));
    let json = await response.json();
    // console.log('ewfefewfefef',json)
    return json;
  } catch (error) {
    console.error('Something went wrong in getMovieDetail Function', error);
  }
};

const MovieDetailScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);
  // console.log('XXXXXXXXXXXXXXX',movieData)
  // console.log('yyyyyyyyyyyyy',movieCastData)

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={'Movie Detail'}
              action={() => navigation.goBack()}
            />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'orange'} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'black'} />
        <ImageBackground
          source={{uri: baseImagePath('w780', movieData?.backdrop_path)}}
          style={styles.imageBG}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', '#0000']}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader name="close" header={movieData?.original_title} action={() => navigation.goBack()}/>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBG}>
          <Image
            source={{uri: baseImagePath('w342', movieData?.poster_path)}}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.timeContainer}>
          <CustomIcons name="clock" style={styles.clockIcon} />
          <Text style={styles.runTimeText}>
            {Math.floor(movieData?.runtime / 60)}h{' '}
            {Math.floor(movieData?.runtime % 60)}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>{movieData?.original_title}</Text>
          <View style={styles.genreContainer}>
            {movieData?.genres.map((item: any) => {
              return (
                <View style={styles.genreBox} key={item.id}>
                  <Text style={styles.genreText}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.tagline}>{movieData?.tagline}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.rateContainer}>
            <CustomIcons name="star" style={styles.starIcon} />
            <Text style={styles.runTimeText}>
              {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
            </Text>
            <Text style={styles.runTimeText}>
              {movieData?.release_date.substring(8, 10)}{' '}
              {new Date(movieData?.release_date).toLocaleString('default', {
                month: 'long',
              })}{' '}
              {movieData?.release_date.substring(0, 4)}
            </Text>
          </View>
          <Text style={styles.descriptionText}>{movieData?.overview}</Text>
        </View>
        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            data={movieCastData}
            keyExtractor={(item: any) => item.id}
            horizontal
            contentContainerStyle={styles.containerGap}
            renderItem={({item, index}) => (
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index == 0 ? true : false}
                isLast={index == movieCastData?.length - 1 ? true : false}
                imagePath={baseImagePath('w185', item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
              />
            )}
          />
          <View>
            <TouchableOpacity style={styles.buttonBG} onPress={()=>{
              navigation.push('SeatBooking',{
                BgImage:baseImagePath('w780',movieData.backdrop_path),
                posterImage:baseImagePath('original',movieData.poster_path)
              })
            }}>
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: 25,
    marginTop: 40,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.50)',
    marginRight: 8,
  },
  runTimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: '#ffffff',
    fontSize: 14,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
    marginHorizontal: 36,
    marginVertical: 15,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: 'rgba(255,255,255,0.50)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ffffff',
    marginHorizontal: 36,
    marginVertical: 15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: 24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 20,
    color: 'yellow',
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 14,
    color: '#ffffff',
  },
  containerGap: {
    gap: 24,
  },
  buttonBG:{
    alignItems:'center',
    marginVertical:24,
  },
  buttonText:{
    borderRadius:50,
    paddingHorizontal:24,
    paddingVertical:10,
    backgroundColor:'#FF5524',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:14,
    color:'#ffffff'
  }
});
