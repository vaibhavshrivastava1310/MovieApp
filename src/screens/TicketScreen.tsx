import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import {useState, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from '../components/CustomIcons';
import {FONTFAMILY} from '../theme/Theme';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Tickets'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#000000'} />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Ticket'}
            action={() => navigation.goBack()}
          />
        </View>

        <View style={styles.ticketContainer}>
          <ImageBackground
            source={{uri: ticketData?.ticketImage}}
            style={styles.ticketBGImage}>
            <LinearGradient
              colors={['rgba(255,85,36,0)', '#ff5523']}
              style={styles.linearGradient}>
              <View
                style={[
                  styles.blackCircle,
                  {position: 'absolute', bottom: -40, left: -40},
                ]}></View>
              <View
                style={[
                  styles.blackCircle,
                  {position: 'absolute', bottom: -40, right: -40},
                ]}></View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.linear}></View>

          <View style={styles.ticketFooter}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', top: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', top: -40, right: -40},
              ]}></View>
            <View style={styles.ticketDateContainer}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
                <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <CustomIcons name="clock" style={styles.clockIcon} />
                <Text style={styles.subtitle}>{ticketData?.time}</Text>
              </View>
            </View>
            <View style={styles.ticketSeatContainer}>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Hall</Text>
                <Text style={styles.subtitle}>02</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Row</Text>
                <Text style={styles.subtitle}>04</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subheading}>Seats</Text>
                <Text style={styles.subtitle}>
                  {ticketData?.seatArray
                    .slice(0, 3)
                    .map((item: any, index: number, arr: any) => {
                      return item + (index == arr.length - 1 ? '' : ', ');
                    })}
                </Text>
              </View>
            </View>
            <Image
              source={require('../assets/image/barcode.png')}
              style={styles.barcodeImage}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000000',
  },
  appHeaderContainer: {
    marginHorizontal: 36,
    marginTop: 24,
    marginBottom:30
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: '#000000',
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: '#ff5523',
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: '#ff5523',
    width: 300,
    alignItems: 'center',
    paddingBottom: 36,
    alignSelf: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 24,
    color: '#ffffff',
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 14,
    color: '#ffffff',
  },
  subheading: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 18,
    color: '#ffffff',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 24,
    color: '#ffffff',
    paddingBottom: 10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: '#000000',
  },
});

export default TicketScreen;
