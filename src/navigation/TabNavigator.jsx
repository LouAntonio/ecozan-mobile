import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts';
import { Header } from '../components';

import { DiscoverScreen } from '../screens/discover';
import { ToursScreen } from '../screens/tours';
import { TransportScreen } from '../screens/transport';
import { BookingsScreen } from '../screens/bookings';
import { MenuScreen } from '../screens/menu';

const Tab = createBottomTabNavigator();

const tabConfig = {
  discover: {
    name: 'Discover',
    label: 'Descobrir',
    iconFocused: 'compass',
    iconUnfocused: 'compass-outline',
  },
  tours: {
    name: 'Tours',
    label: 'Passeios',
    iconFocused: 'boat',
    iconUnfocused: 'boat-outline',
  },
  transport: {
    name: 'Transport',
    label: 'Transporte',
    iconFocused: 'car',
    iconUnfocused: 'car-outline',
  },
  bookings: {
    name: 'Bookings',
    label: 'Reservas',
    iconFocused: 'calendar',
    iconUnfocused: 'calendar-outline',
  },
  menu: {
    name: 'Menu',
    label: 'Menu',
    iconFocused: 'menu',
    iconUnfocused: 'menu-outline',
  },
};

function ScreenWrapper({ children }) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background.primary }]}>
      <Header />
      {children}
    </View>
  );
}

export default function TabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const config = tabConfig[route.name.toLowerCase()];
          const iconName = focused ? config.iconFocused : config.iconUnfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.vivid,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.surface.card,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Discover" 
        options={{ tabBarLabel: tabConfig.discover.label }}
      >
        {() => (
          <ScreenWrapper>
            <DiscoverScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Tours" 
        options={{ tabBarLabel: tabConfig.tours.label }}
      >
        {() => (
          <ScreenWrapper>
            <ToursScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Transport" 
        options={{ tabBarLabel: tabConfig.transport.label }}
      >
        {() => (
          <ScreenWrapper>
            <TransportScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Bookings" 
        options={{ tabBarLabel: tabConfig.bookings.label }}
      >
        {() => (
          <ScreenWrapper>
            <BookingsScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Menu" 
        options={{ tabBarLabel: tabConfig.menu.label }}
      >
        {() => (
          <ScreenWrapper>
            <MenuScreen />
          </ScreenWrapper>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
