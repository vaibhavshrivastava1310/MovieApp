import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { FONTFAMILY } from '../theme/Theme';

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
            props.shouldMarginatedAround ?{margin:12}:{},
            {maxWidth:props.cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
          resizeMode='contain'
        />
        <Text numberOfLines={1} style={styles.textTitle}>{props.title}</Text>
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
  cardImage:{
    aspectRatio: 2/3, 
    borderRadius: 20,
  },
  textTitle:{
    fontFamily:FONTFAMILY.poppins_regular,
    fontSize:14,
    color:'#ffffff',
    textAlign:'center',
    paddingVertical:10
  }
});
export default SubMovieCard;
