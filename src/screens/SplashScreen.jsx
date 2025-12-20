import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../contexts';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
	const { colors, isDark } = useTheme();

	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.3)).current;
	const logoRotate = useRef(new Animated.Value(0)).current;
	const slideUp = useRef(new Animated.Value(50)).current;
	const taglineOpacity = useRef(new Animated.Value(0)).current;
	const circleScale1 = useRef(new Animated.Value(0)).current;
	const circleScale2 = useRef(new Animated.Value(0)).current;
	const shimmer = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Sequência de animações
		Animated.sequence([
			// 1. Fade in geral e círculos de fundo
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 600,
					useNativeDriver: true,
				}),
				Animated.spring(circleScale1, {
					toValue: 1,
					friction: 5,
					tension: 40,
					useNativeDriver: true,
				}),
				Animated.spring(circleScale2, {
					toValue: 1,
					friction: 6,
					tension: 35,
					delay: 150,
					useNativeDriver: true,
				}),
			]),
			
			// 2. Logo com rotação suave e escala
			Animated.parallel([
				Animated.spring(scaleAnim, {
					toValue: 1,
					friction: 7,
					tension: 40,
					useNativeDriver: true,
				}),
				Animated.timing(logoRotate, {
					toValue: 1,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(slideUp, {
					toValue: 0,
					duration: 600,
					useNativeDriver: true,
				}),
			]),
			
			// 3. Tagline aparece
			Animated.timing(taglineOpacity, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start();

		// Efeito shimmer contínuo no texto
		Animated.loop(
			Animated.sequence([
				Animated.timing(shimmer, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(shimmer, {
					toValue: 0,
					duration: 2000,
					useNativeDriver: true,
				}),
			])
		).start();

		// Timer para finalizar splash com fade out suave
		const timer = setTimeout(() => {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 600,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1.2,
					duration: 600,
					useNativeDriver: true,
				}),
			]).start(() => {
				if (onFinish) onFinish();
			});
		}, 3500);

		return () => clearTimeout(timer);
	}, []);

	const logoRotation = logoRotate.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	const shimmerOpacity = shimmer.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [1, 0.7, 1],
	});

	return (
		<Animated.View
			className="flex-1 items-center justify-center"
			style={{ 
				opacity: fadeAnim,
				backgroundColor: colors.background.primary,
			}}
		>
			<StatusBar style={isDark ? 'light' : 'dark'} />

			{/* Elementos decorativos de fundo animados */}
			<View className="absolute inset-0 overflow-hidden">
				{/* Círculo superior direito */}
				<Animated.View
					className="absolute w-96 h-96 rounded-full -top-32 -right-32"
					style={{
						backgroundColor: colors.primary.vivid + '15',
						transform: [{ scale: circleScale1 }],
					}}
				/>
				
				{/* Círculo inferior esquerdo */}
				<Animated.View
					className="absolute w-80 h-80 rounded-full -bottom-24 -left-24"
					style={{
						backgroundColor: colors.primary.deep + '10',
						transform: [{ scale: circleScale2 }],
					}}
				/>
				
				{/* Círculo médio para profundidade */}
				<Animated.View
					className="absolute w-64 h-64 rounded-full"
					style={{
						backgroundColor: colors.primary.vivid + '08',
						top: height * 0.6,
						right: width * 0.1,
						transform: [{ scale: circleScale1 }],
					}}
				/>

				{/* Linhas decorativas */}
				<View className="absolute inset-0 items-center justify-center">
					<Animated.View
						className="absolute w-full h-px"
						style={{
							backgroundColor: colors.primary.vivid + '10',
							top: height * 0.3,
							transform: [{ scale: circleScale1 }],
						}}
					/>
					<Animated.View
						className="absolute w-full h-px"
						style={{
							backgroundColor: colors.primary.deep + '08',
							bottom: height * 0.25,
							transform: [{ scale: circleScale2 }],
						}}
					/>
				</View>
			</View>

			{/* Logo Container Principal */}
			<Animated.View
				className="items-center"
				style={{
					transform: [
						{ scale: scaleAnim },
						{ translateY: slideUp },
						{ rotate: logoRotation },
					],
				}}
			>
				{/* Container do ícone com brilho */}
				<View
					className="mb-6 rounded-full p-6"
					style={{
						backgroundColor: isDark 
							? colors.primary.vivid + '15' 
							: colors.primary.vivid + '10',
						shadowColor: colors.primary.vivid,
						shadowOffset: { width: 0, height: 8 },
						shadowOpacity: 0.3,
						shadowRadius: 20,
						elevation: 10,
					}}
				>
					<Image
						source={require('../../assets/iconBG.png')}
						className="w-32 h-32"
						resizeMode="contain"
					/>
				</View>
			</Animated.View>

			{/* Nome do App com efeito shimmer */}
			<Animated.View
				style={{
					opacity: shimmerOpacity,
					transform: [{ translateY: slideUp }],
				}}
			>
				<Text 
					className="text-6xl font-black tracking-wider mb-1"
					style={{ 
						color: colors.text.primary,
						textShadowColor: colors.primary.vivid + '30',
						textShadowOffset: { width: 0, height: 2 },
						textShadowRadius: 10,
					}}
				>
					ECOZAN
				</Text>
			</Animated.View>

			{/* Tagline com animação separada */}
			<Animated.View
				style={{
					opacity: taglineOpacity,
					transform: [
						{ 
							translateY: taglineOpacity.interpolate({
								inputRange: [0, 1],
								outputRange: [20, 0],
							})
						}
					],
				}}
			>
				<Text 
					className="text-base tracking-[6px] uppercase font-semibold"
					style={{ color: colors.primary.vivid }}
				>
					Turismo Sustentável
				</Text>

				{/* Linha decorativa animada */}
				<View className="flex-row items-center justify-center mt-6">
					<Animated.View
						className="h-0.5"
						style={{ 
							width: 40,
							backgroundColor: colors.primary.vivid,
							opacity: taglineOpacity,
						}}
					/>
					<Animated.View
						className="w-2.5 h-2.5 rounded-full mx-4"
						style={{ 
							backgroundColor: colors.primary.vivid,
							transform: [{ scale: taglineOpacity }],
						}}
					/>
					<Animated.View
						className="h-0.5"
						style={{ 
							width: 40,
							backgroundColor: colors.primary.vivid,
							opacity: taglineOpacity,
						}}
					/>
				</View>
			</Animated.View>

			{/* Informações adicionais */}
			<Animated.View 
				className="absolute bottom-16 items-center"
				style={{ opacity: taglineOpacity }}
			>
				{/* Loading indicator melhorado */}
				<View className="flex-row mb-3">
					<LoadingDot delay={0} color={colors.primary.vivid} />
					<LoadingDot delay={150} color={colors.primary.vivid} />
					<LoadingDot delay={300} color={colors.primary.vivid} />
				</View>
				
				<Text 
					className="text-sm tracking-wide"
					style={{ color: colors.text.muted }}
				>
					Conectando com a natureza...
				</Text>
			</Animated.View>

			{/* Versão do app (opcional) */}
			<Animated.View 
				className="absolute bottom-6"
				style={{ opacity: taglineOpacity }}
			>
				<Text 
					className="text-xs tracking-wider"
					style={{ color: colors.text.tertiary }}
				>
					v1.0.0
				</Text>
			</Animated.View>
		</Animated.View>
	);
}

// Componente de ponto de loading melhorado
function LoadingDot({ delay, color }) {
	const opacity = useRef(new Animated.Value(0.3)).current;
	const scale = useRef(new Animated.Value(0.8)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.delay(delay),
				Animated.parallel([
					Animated.timing(opacity, {
						toValue: 1,
						duration: 500,
						useNativeDriver: true,
					}),
					Animated.spring(scale, {
						toValue: 1.2,
						friction: 3,
						useNativeDriver: true,
					}),
				]),
				Animated.parallel([
					Animated.timing(opacity, {
						toValue: 0.3,
						duration: 500,
						useNativeDriver: true,
					}),
					Animated.spring(scale, {
						toValue: 0.8,
						friction: 3,
						useNativeDriver: true,
					}),
				]),
			])
		);
		animation.start();
		return () => animation.stop();
	}, [delay]);

	return (
		<Animated.View
			className="w-2.5 h-2.5 rounded-full mx-1.5"
			style={{
				opacity,
				backgroundColor: color,
				transform: [{ scale }],
				shadowColor: color,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.6,
				shadowRadius: 4,
				elevation: 3,
			}}
		/>
	);
}