import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {
  FONTFAMILY,
} from '../theme/Theme';
import CustomIcons from './CustomIcons';

const InputHeader = (props: any) => {
  const [searchText, setsearchText] = useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setsearchText(textInput)} // inside box koi bhi text hoga to wo useState me save ho jaaega
        placeholder='Search Your Movies'
        placeholderTextColor={'#ffff'}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={() => props.searchFunction(searchText)}>
        <CustomIcons name="search" color={'#ff5523'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: '#ffffff',
  },
  searchIcon:{
    alignItems:'center',
    justifyContent:'center',
    padding:10,
  }
});
