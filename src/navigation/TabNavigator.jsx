import React from 'react';
import { View, Platform, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts';
import { Header } from '../components';

import { DiscoverScreen } from '../screens/discover';
import { ToursScreen, TourDetailsScreen } from '../screens/tours';
import { TransportScreen } from '../screens/transport';
import { BookingsScreen, HostDetailsScreen } from '../screens/bookings';
import { MenuScreen } from '../screens/menu';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabConfig = {
	discover: {
		name: 'Discover',
		label: 'Explorar',
		iconFocused: 'compass',
		iconUnfocused: 'compass-outline',
	},
	tours: {
		name: 'Tours',
		label: 'Tours',
		iconFocused: 'map',
		iconUnfocused: 'map-outline',
	},
	transport: {
		name: 'Transport',
		label: 'Transporte',
		iconFocused: 'car',
		iconUnfocused: 'car-outline',
	},
	bookings: {
		name: 'Bookings',
		label: 'Hospedagem',
		iconFocused: 'bed',
		iconUnfocused: 'bed-outline',
	},
	menu: {
		name: 'Menu',
		label: 'Menu',
		iconFocused: 'grid',
		iconUnfocused: 'grid-outline',
	},
};

function ScreenWrapper({ children }) {
	const { colors } = useTheme();

	return (
		<View className="flex-1" style={{ backgroundColor: colors.background.primary }}>
			<Header />
			{children}
		</View>
	);
}

function TabBarIcon({ focused, color, size, iconName, isDark }) {
	const translateY = React.useRef(new Animated.Value(0)).current;
	const scale = React.useRef(new Animated.Value(1)).current;
	const opacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.parallel([
			Animated.spring(translateY, {
				toValue: focused ? -4 : 0,
				friction: 7,
				tension: 100,
				useNativeDriver: true,
			}),
			Animated.spring(scale, {
				toValue: focused ? 1 : 0.94,
				friction: 7,
				tension: 100,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: focused ? 1 : 0,
				duration: 300,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}),
		]).start();
	}, [focused]);

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 4 }}>
			{/* Background indicator with shadow and border */}
			<Animated.View
				style={{
					position: 'absolute',
					width: 58,
					height: 42,
					borderRadius: 14,
					backgroundColor: isDark ? `${color}15` : `${color}12`,
					borderWidth: 1,
					borderColor: isDark ? `${color}30` : `${color}20`,
					opacity: opacity,
					transform: [{ scale }],
					shadowColor: color,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: isDark ? 0.4 : 0.25,
					shadowRadius: 10,
					elevation: 5,
				}}
			/>
			
			{/* Icon */}
			<Animated.View
				style={{
					transform: [{ translateY }],
				}}
			>
				<View
					style={{
						width: 50,
						height: 50,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Ionicons 
						name={iconName} 
						size={focused ? 28 : 24} 
						color={color} 
					/>
				</View>
			</Animated.View>

			{/* Active dot indicator on top */}
			<Animated.View
				style={{
					position: 'absolute',
					top: -3,
					width: 5,
					height: 5,
					borderRadius: 2.5,
					backgroundColor: color,
					opacity: opacity,
					shadowColor: color,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.8,
					shadowRadius: 6,
					elevation: 4,
				}}
			/>
		</View>
	);
}

function ToursStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ToursList" component={ToursScreen} />
			<Stack.Screen name="TourDetails" component={TourDetailsScreen} />
		</Stack.Navigator>
	);
}

function BookingsStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="BookingsList" component={BookingsScreen} />
			<Stack.Screen name="HostDetails" component={HostDetailsScreen} />
		</Stack.Navigator>
	);
}

export default function TabNavigator() {
	const { colors, isDark } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					const config = tabConfig[route.name.toLowerCase()];
					const iconName = focused ? config.iconFocused : config.iconUnfocused;
					return (
						<TabBarIcon 
							focused={focused}
							color={color}
							size={size}
							iconName={iconName}
							isDark={isDark}
						/>
					);
				},
				tabBarActiveTintColor: colors.primary.vivid,
				tabBarInactiveTintColor: colors.text.secondary,
				tabBarStyle: {
					position: 'absolute',
					backgroundColor: colors.surface.card,
					borderTopColor: isDark ? `${colors.primary.vivid}20` : `${colors.border?.light || '#E5E7EB'}30`,
					borderTopWidth: 1.5,
					paddingTop: 10,
					paddingBottom: Platform.OS === 'ios' ? 30 : 18,
					height: Platform.OS === 'ios' ? 92 : 78,
					borderTopLeftRadius: 28,
					borderTopRightRadius: 28,
					shadowColor: isDark ? colors.primary.vivid : '#000',
					shadowOffset: { width: 0, height: -6 },
					shadowOpacity: isDark ? 0.25 : 0.12,
					shadowRadius: 16,
					elevation: isDark ? 20 : 16,
				},
				tabBarItemStyle: {
					paddingTop: 6,
					marginHorizontal: 4,
				},
				tabBarLabelStyle: {
					fontSize: 11,
					fontWeight: '600',
					marginTop: 4,
					marginBottom: 0,
					letterSpacing: 0.3,
				},
				tabBarShowLabel: true,
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
						<ToursStackNavigator />
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
						<BookingsStackNavigator />
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