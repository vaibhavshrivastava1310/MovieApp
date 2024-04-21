import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTFAMILY} from '../theme/Theme';
import CustomIcons from './CustomIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family ',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.isFirst
              ? {marginLeft: 36}
              : props.isLast
              ? {marginRight: 36}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: 12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
          resizeMode="contain"
        />
        <View>
          <View style={styles.rateContainer}>
            <CustomIcons name='star' style={styles.starIcon}/>
            <Text style={styles.voteText}>{props.vote_average} ({props.vote_count})</Text>
          </View>
          <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
          <View style={styles.genreContainer}>
            {
              props.genre.map((item:any)=>{
                return(
                  <View key={item} style={styles.genreBox}>
                    <Text style={styles.genreText}>{genres[item]}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#0000',
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 10,
  },
  rateContainer:{
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  starIcon:{
    fontSize:20,
    color:'yellow'
  },
  voteText:{
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:14,
    color:'#ffff'
  },
  genreContainer:{
    flex:1,
    flexDirection:'row',
    gap:20,
    flexWrap:'wrap',
    justifyContent:'center',
  },
  genreBox:{
    borderColor:COLORS.WhiteRGBA50,
    paddingVertical:4,
    borderWidth:1,
    paddingHorizontal:10,
    borderRadius:25,
    color:'#ffff'
  },
  genreText:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:10,
    color:'rgba(255,255,255,0.75)',
  }
});
export default SubMovieCard;
