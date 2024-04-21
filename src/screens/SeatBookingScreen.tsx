import * as React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomIcons from '../components/CustomIcons';
import LinearGradient from 'react-native-linear-gradient';
import {FONTFAMILY} from '../theme/Theme';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];

const generateDate = () => {
  const date = new Date();
  let weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekDays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekDay[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekDays.push(tempDate);

    // console.log('XXXXXXXXXXXXXXXX',tempDate.date)
  }
  // console.log('XXXXXXXXXXXXXXXX',weekDays)
  return weekDays;
};

const generateSeates = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start, // key id
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachNine) {
      numColumn += 2;
    } else {
      (reachNine = true), (numColumn -= 2);
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeates());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subIndex: number, num: number) => {
    if (!twoDSeatArray[index][subIndex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subIndex].selected = !temp[index][subIndex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 350.0);
      setTwoDSeatArray(temp);
    }
  };

  const bookSeats = async () => {
    if (
      selectedSeatArray.length != 0 &&
      timeArray[selectedTimeIndex] != undefined &&
      dateArray[selectedDateIndex] != undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.posterImage,
          }),
        );
      } catch (error) {
        console.log(
          'Something went wrong while storing BookSeats function',
          error,
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.posterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  // console.log('TTTTTTTTTTTTTT',JSON.stringify(twoDSeatArray,null,2))
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'#000000'} />
        <View>
          <ImageBackground
            source={{uri: route.params?.BgImage}}
            style={styles.ImageBG}>
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', '#000000']}
              style={styles.linearGradient}></LinearGradient>
          </ImageBackground>
          <Text style={styles.screenText}>Screen This Side</Text>
        </View>
        <View style={styles.seatContainer}>
          <View style={styles.containerGap}>
            {twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        key={subItem.number}
                        onPress={() => {
                          selectSeat(index, subIndex, subItem.number);
                        }}>
                        <CustomIcons
                          name="seat"
                          style={[
                            styles.seatIcon,
                            subItem.taken ? {color: '#333333'} : {},
                            subItem.selected ? {color: '#FF5524'} : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <View style={styles.seatRadioContainer}>
            <View style={styles.radioContainer}>
              <CustomIcons
                name="radio"
                style={[styles.radioIcon, {color: '#ffffff'}]}
              />
              <Text style={styles.radioText}>Available</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcons
                name="radio"
                style={[styles.radioIcon, {color: '#333333'}]}
              />
              <Text style={styles.radioText}>Taken</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcons
                name="radio"
                style={[styles.radioIcon, {color: '#FF5524'}]}
              />
              <Text style={styles.radioText}>Selected</Text>
            </View>
          </View>
          <View>
            <FlatList
              data={dateArray}
              keyExtractor={item => item.date}
              horizontal
              bounces={false}
              contentContainerStyle={styles.containerGap24}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                    <View
                      style={[
                        styles.dateContainer,
                        index == 0
                          ? {marginLeft: 24}
                          : index == dateArray.length - 1
                          ? {marginRight: 24}
                          : {},
                        index == selectedDateIndex
                          ? {backgroundColor: '#ff5524'}
                          : {},
                      ]}>
                      <Text style={styles.dateText}>{item.date}</Text>
                      <Text style={styles.dayText}>{item.day}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.outterContainer}>
            <FlatList
              data={timeArray}
              keyExtractor={item => item}
              horizontal
              bounces={false}
              contentContainerStyle={styles.containerGap24}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                    <View
                      style={[
                        styles.timeContainer,
                        index == 0
                          ? {marginLeft: 24}
                          : index == dateArray.length - 1
                          ? {marginRight: 24}
                          : {},
                        index == selectedTimeIndex
                          ? {backgroundColor: '#ff5524'}
                          : {},
                      ]}>
                      <Text style={styles.timeText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>Rs.{price}</Text>
          </View>
          <TouchableOpacity onPress={bookSeats}>
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000000',
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 15,
    color: 'rgba(255,255,255,0.50)',
  },
  seatContainer: {
    marginVertical: 20,
  },
  containerGap: {
    gap: 20, // gap betweeen each row
  },
  seatRow: {
    flexDirection: 'row',
    gap: 20, // gap between each seat
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  seatRadioContainer: {
    marginTop: 35,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 12,
    color: '#ffffff',
  },
  containerGap24: {
    gap: 24,
  },
  dateContainer: {
    width: 70,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 24,
    color: '#ffffff',
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
    color: '#ffffff',
  },
  timeContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.50)',
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#0b0b0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: '#ffffff',
  },
  outterContainer: {
    marginVertical: 24,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: '#333333',
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 24,
    color: '#ffffff',
  },
  buttonText: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#ff5524',
  },
});
