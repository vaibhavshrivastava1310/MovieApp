import React from 'react';
import UserAccountScreen from '../screens/UserAccountScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import HomeScreen from '../screens/HomeScreen';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcons from '../components/CustomIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true, // whenever we type tab bar will hide
        headerShown: false, // for hidden of header tab
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 100,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false, // to block tab bar label
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {backgroundColor: '#ff5523'} : {},
                ]}>
                <CustomIcons
                  name="video"
                  color={'#ffffff'}
                  size={30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false, // to block tab bar label
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={[
                styles.activeTabBackground,
                focused ? {backgroundColor: '#ff5523'} : {},
              ]}>
                <CustomIcons
                  name="search"
                  color={'#ffffff'}
                  size={30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false, // to block tab bar label
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={[
                styles.activeTabBackground,
                focused ? {backgroundColor: '#ff5523'} : {},
              ]}>
                <CustomIcons
                  name="ticket"
                  color={'#ffffff'}
                  size={30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false, // to block tab bar label
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={[
                styles.activeTabBackground,
                focused ? {backgroundColor: '#ff5523'} : {},
              ]}>
                <CustomIcons
                  name="user"
                  color={'#ffffff'}
                  size={30}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: '#000000',
    padding: 18,
    borderRadius: 180,
  },
});
export default TabNavigator;
