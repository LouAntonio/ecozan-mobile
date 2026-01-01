import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/contexts';
import { SplashScreen, OnboardingScreen, AuthScreen } from './src/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

	useEffect(() => {
		async function checkAuth() {
			try {
				const token = await AsyncStorage.getItem('token');
				if (!token) {
					// Sem token, forçar auth após splash/onboarding
					if (!showSplash && !showOnboarding) {
						setShowAuth(true);
					}
				}
			} catch (err) {
				console.warn('Erro ao verificar token:', err);
			}
		}
		checkAuth();
		
		// Listener para mudanças no AsyncStorage (logout)
		const interval = setInterval(checkAuth, 1000);
		return () => clearInterval(interval);
	}, [showSplash, showOnboarding]);

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
