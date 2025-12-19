import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts';

export default function SplashScreen({ onFinish }) {
	const { colors, isDark } = useTheme();
	
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.8)).current;
	const slideAnim = useRef(new Animated.Value(30)).current;
	const leafRotate = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Animação de entrada
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start();

		// Animação da folha girando suavemente
		Animated.loop(
			Animated.sequence([
				Animated.timing(leafRotate, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(leafRotate, {
					toValue: 0,
					duration: 2000,
					useNativeDriver: true,
				}),
			])
		).start();

		// Timer para finalizar splash
		const timer = setTimeout(() => {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start(() => {
				if (onFinish) onFinish();
			});
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const leafRotation = leafRotate.interpolate({
		inputRange: [0, 1],
		outputRange: ['-10deg', '10deg'],
	});

	const styles = createStyles(colors);

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			<StatusBar style={isDark ? 'light' : 'dark'} />

			{/* Elementos decorativos de fundo */}
			<View style={styles.backgroundElements}>
				<View style={[styles.circleTopRight, { backgroundColor: colors.primary.deep + '20' }]} />
				<View style={[styles.circleBottomLeft, { backgroundColor: colors.primary.vivid + '10' }]} />
			</View>

			{/* Logo Container */}
			<Animated.View
				style={[styles.logoContainer, {
					transform: [
						{ scale: scaleAnim },
						{ translateY: slideAnim },
					],
				}]}
			>
				{/* icone do app */}
				<Image source={require('../../assets/iconBG.png')} style={{ width: 120, height: 120 }} />
				{/* Nome do App */}
				<Text style={[styles.appName, { color: colors.text.primary }]}>
					ECOZAN
				</Text>

				{/* Tagline */}
				<Animated.View
					style={{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }],
					}}
				>
					<Text style={[styles.tagline, { color: colors.primary.vivid }]}>
						Turismo Sustentável
					</Text>
				</Animated.View>

				{/* Linha decorativa */}
				<View style={styles.decorativeLine}>
					<View style={[styles.line, { backgroundColor: colors.primary.deep }]} />
					<View style={[styles.dot, { backgroundColor: colors.primary.vivid }]} />
					<View style={[styles.line, { backgroundColor: colors.primary.deep }]} />
				</View>
			</Animated.View>

			{/* Loading indicator */}
			<View style={styles.loadingContainer}>
				<Animated.View style={[styles.loadingContent, { opacity: fadeAnim }]}>
					<View style={styles.dotsContainer}>
						<LoadingDot delay={0} color={colors.primary.vivid} />
						<LoadingDot delay={200} color={colors.primary.vivid} />
						<LoadingDot delay={400} color={colors.primary.vivid} />
					</View>
					<Text style={[styles.loadingText, { color: colors.text.muted }]}>
						Conectando com a natureza...
					</Text>
				</Animated.View>
			</View>
		</Animated.View>
	);
}

// Componente de ponto de loading animado
function LoadingDot({ delay, color }) {
	const opacity = useRef(new Animated.Value(0.3)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.delay(delay),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 400,
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0.3,
					duration: 400,
					useNativeDriver: true,
				}),
			])
		);
		animation.start();
		return () => animation.stop();
	}, [delay]);

	return (
		<Animated.View
			style={{
				opacity,
				width: 8,
				height: 8,
				borderRadius: 4,
				backgroundColor: color,
				marginHorizontal: 4,
			}}
		/>
	);
}

const createStyles = (colors) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backgroundElements: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: 'hidden',
	},
	circleTopRight: {
		position: 'absolute',
		width: 320,
		height: 320,
		borderRadius: 160,
		top: -100,
		right: -100,
	},
	circleBottomLeft: {
		position: 'absolute',
		width: 240,
		height: 240,
		borderRadius: 120,
		bottom: -50,
		left: -80,
	},
	logoContainer: {
		alignItems: 'center',
	},
	leafWrapper: {
		marginBottom: 24,
	},
	leafContainer: {
		width: 96,
		height: 96,
		borderRadius: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},
	leafEmoji: {
		fontSize: 48,
	},
	appName: {
		fontSize: 48,
		fontWeight: 'bold',
		letterSpacing: 4,
	},
	tagline: {
		fontSize: 18,
		marginTop: 12,
		letterSpacing: 4,
		textTransform: 'uppercase',
	},
	decorativeLine: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 32,
	},
	line: {
		width: 48,
		height: 2,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 12,
	},
	loadingContainer: {
		position: 'absolute',
		bottom: 80,
	},
	loadingContent: {
		alignItems: 'center',
	},
	dotsContainer: {
		flexDirection: 'row',
	},
	loadingText: {
		fontSize: 14,
		marginTop: 16,
	},
});
