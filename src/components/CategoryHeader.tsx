import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FONTFAMILY } from '../theme/Theme';

const CategoryHeader = (props: any) => {
  return (
    <Text style={styles.text}>{props.title}</Text>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  text: {
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:20,
    color:'#ffff',
    paddingHorizontal:36,
    paddingVertical:28
  }
});
