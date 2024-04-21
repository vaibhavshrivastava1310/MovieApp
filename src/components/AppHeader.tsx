import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomIcons from './CustomIcons';
import { FONTFAMILY } from '../theme/Theme';

const AppHeader = (props:any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <CustomIcons name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
        <Text style={styles.headerText}>
            {props.header}
        </Text>
        <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  iconStyle: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  emptyContainer: {
    height: 40,
    width: 40,
  },
  iconBG: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ff5523',
  },
});
