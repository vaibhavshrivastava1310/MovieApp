import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { FONTFAMILY } from '../theme/Theme';

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: 24}
            : props.isLast
            ? {marginRight: 24}
            : {}
          : {},
          {maxWidth:props.cardWidth}
      ]}>
      <Image source={{uri: props.imagePath}} style={[styles.cardImage,{width:props.cardWidth}]} />
      <Text style={styles.title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.subTitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage:{
    aspectRatio:1920/2880,
    borderRadius:100,
  },
  title:{
    alignSelf:'stretch',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:12,
    color:'#ffffff',
  },
  subTitle:{
    alignSelf:'center',
    fontFamily:FONTFAMILY.poppins_medium,
    fontSize:10,
    color:'#ffffff'
  }
});

export default CastCard;
