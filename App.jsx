import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts';
import { SplashScreen, OnboardingScreen, AuthScreen } from './src/screens';
import { TabNavigator } from './src/navigation';

function MainApp() {
	const { colors, isDark } = useTheme();

	return (
		<NavigationContainer
			theme={{
				dark: isDark,
				colors: {
					primary: colors.primary.vivid,
					background: colors.background.primary,
					card: colors.surface.card,
					text: colors.text.primary,
					border: colors.border.light,
					notification: colors.status.error,
				},
				fonts: {
					regular: { fontFamily: 'System', fontWeight: '400' },
					medium: { fontFamily: 'System', fontWeight: '500' },
					bold: { fontFamily: 'System', fontWeight: '700' },
					heavy: { fontFamily: 'System', fontWeight: '900' },
				}
			}}
		>
			<StatusBar style={isDark ? 'light' : 'dark'} />
			<TabNavigator />
		</NavigationContainer>
	);
}

export default function App() {
	const [showSplash, setShowSplash] = useState(true);
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [showAuth, setShowAuth] = useState(false);

	function handleSplashFinish() {
		setShowOnboarding(true);
		setShowSplash(false);
	}

	function handleOnboardingDone() {
		setShowOnboarding(false);
		setShowAuth(true);
	}

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				{showSplash ? (
					<SplashScreen onFinish={handleSplashFinish} />
				) : showOnboarding ? (
					<OnboardingScreen onDone={handleOnboardingDone} />
				) : showAuth ? (
					<AuthScreen onAuthSuccess={() => setShowAuth(false)} />
				) : (
					<MainApp />
				)}
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
