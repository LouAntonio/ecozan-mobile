import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import apiRequest from '../../scripts/requests';

const { width } = Dimensions.get('window');

export default function BnbDetailsScreen({ route, navigation }) {
	const { bnbId } = route.params;
	const { colors, isDark } = useTheme();
	const [bnb, setBnb] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	useEffect(() => {
		const fetchBnbDetails = async () => {
			try {
				setLoading(true);
				const response = await apiRequest(`/bnb/${bnbId}`);

				if (response.success) {
					setBnb(response.data);
				}
			} catch (error) {
				console.error('Error fetching bnb details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBnbDetails();
	}, [bnbId]);

	// Função para formatar preço
	const formatPrice = (price) => {
		return new Intl.NumberFormat('pt-AO').format(price);
	};

	// Função para parsear a galeria (string JSON)
	const parseGallery = (galleryString) => {
		try {
			return JSON.parse(galleryString);
		} catch {
			return [];
		}
	};

	// Função para renderizar estrelas de avaliação
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 0; i < fullStars; i++) {
			stars.push(<Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />);
		}
		if (hasHalfStar) {
			stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
		}
		const remainingStars = 5 - stars.length;
		for (let i = 0; i < remainingStars; i++) {
			stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />);
		}
		return stars;
	};

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background.primary }}>
				<ActivityIndicator size="large" color={colors.primary.vivid} />
				<Text className="mt-4 text-base" style={{ color: colors.text.secondary }}>
					Carregando detalhes...
				</Text>
			</View>
		);
	}

	if (!bnb) {
		return (
			<View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background.primary }}>
				<Ionicons name="alert-circle-outline" size={64} color={colors.text.secondary} />
				<Text className="mt-4 text-lg font-bold" style={{ color: colors.text.primary }}>
					Acomodação não encontrada
				</Text>
				<TouchableOpacity
					className="mt-4 px-6 py-3 rounded-2xl"
					style={{ backgroundColor: colors.primary.vivid }}
					onPress={() => navigation.goBack()}
				>
					<Text className="text-white font-bold">Voltar</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const gallery = parseGallery(bnb.gallery);
	const allImages = [bnb.image, ...gallery];

	return (
		<View className="flex-1 mb-16" style={{ backgroundColor: colors.background.primary }}>
			{/* Header com botão de voltar */}
			<View
				className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-5 pt-12 pb-4"
				style={{
					backgroundColor: 'transparent',
				}}
			>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="w-10 h-10 rounded-full items-center justify-center"
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
				>
					<Ionicons name="arrow-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>
				<TouchableOpacity
					className="w-10 h-10 rounded-full items-center justify-center"
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}
				>
					<Ionicons name="heart-outline" size={24} color="#FFFFFF" />
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} className="mb-16">
				{/* Galeria de imagens */}
				<View className="relative">
					<ScrollView
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={(event) => {
							const index = Math.round(event.nativeEvent.contentOffset.x / width);
							setSelectedImageIndex(index);
						}}
						scrollEventThrottle={16}
					>
						{allImages.map((image, index) => (
							<Image
								key={index}
								source={{ uri: image }}
								style={{ width, height: 400 }}
								resizeMode="cover"
							/>
						))}
					</ScrollView>

					{/* Indicador de páginas */}
					<View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
						{allImages.map((_, index) => (
							<View
								key={index}
								className="mx-1 rounded-full"
								style={{
									width: selectedImageIndex === index ? 24 : 8,
									height: 8,
									backgroundColor: selectedImageIndex === index ? colors.primary.vivid : 'rgba(255, 255, 255, 0.5)',
								}}
							/>
						))}
					</View>
				</View>

				{/* Conteúdo */}
				<View className="px-5 py-6">
					{/* Título e Avaliação */}
					<View className="mb-4">
						<Text className="text-3xl font-bold mb-2" style={{ color: colors.text.primary }}>
							{bnb.name}
						</Text>
						{bnb.evals && (
							<View className="flex-row items-center">
								{renderStars(bnb.evals)}
								<Text className="text-base ml-2 font-semibold" style={{ color: colors.text.primary }}>
									{bnb.evals.toFixed(1)}
								</Text>
								<Text className="text-sm ml-1" style={{ color: colors.text.secondary }}>
									/ 5.0
								</Text>
							</View>
						)}
					</View>

					{/* Preço */}
					<View
						className="p-5 rounded-3xl mb-4 flex-row items-center justify-between"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: colors.primary.vivid,
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.15,
							shadowRadius: 12,
							elevation: 4,
						}}
					>
						<View>
							<Text className="text-sm mb-1" style={{ color: colors.text.secondary }}>
								Preço
							</Text>
							<View className="flex-row items-baseline">
								<Text className="text-3xl font-bold" style={{ color: colors.primary.vivid }}>
									{formatPrice(bnb.price)}
								</Text>
								<Text className="text-lg ml-1 font-semibold" style={{ color: colors.primary.vivid }}>
									Kz
								</Text>
							</View>
							<Text className="text-sm mt-1" style={{ color: colors.text.secondary }}>
								{bnb.price_modality}
							</Text>
						</View>
						<View
							className="w-16 h-16 rounded-full items-center justify-center"
							style={{ backgroundColor: `${colors.primary.vivid}15` }}
						>
							<Ionicons name="wallet" size={32} color={colors.primary.vivid} />
						</View>
					</View>

					{/* Descrição */}
					<View
						className="p-5 rounded-3xl mb-4"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.05,
							shadowRadius: 8,
							elevation: 2,
						}}
					>
						<View className="flex-row items-center mb-3">
							<Ionicons name="information-circle" size={22} color={colors.primary.vivid} />
							<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
								Sobre a Acomodação
							</Text>
						</View>
						<Text className="text-base leading-6" style={{ color: colors.text.secondary }}>
							{bnb.description || 'Sem descrição disponível.'}
						</Text>
					</View>

					{/* Informações do Host */}
					{bnb.hosts && (
						<View
							className="p-5 rounded-3xl mb-4"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.05,
								shadowRadius: 8,
								elevation: 2,
							}}
						>
							<View className="flex-row items-center mb-4">
								<Ionicons name="person-circle" size={22} color={colors.primary.vivid} />
								<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
									Anfitrião
								</Text>
							</View>

							<View className="flex-row items-center mb-3">
								<View
									className="w-12 h-12 rounded-full items-center justify-center mr-3"
									style={{ backgroundColor: `${colors.primary.vivid}15` }}
								>
									<Ionicons name="home" size={24} color={colors.primary.vivid} />
								</View>
								<View className="flex-1">
									<Text className="text-lg font-bold" style={{ color: colors.text.primary }}>
										{bnb.hosts.name || bnb.host_name}
									</Text>
									{(bnb.host_email || bnb.host_phone) && (
										<Text className="text-sm mt-1" style={{ color: colors.text.secondary }}>
											{bnb.host_email || bnb.host_phone}
										</Text>
									)}
								</View>
							</View>

							<TouchableOpacity
								onPress={() => navigation.navigate('HostDetails', { hostId: bnb.host })}
								className="px-4 py-3 rounded-2xl flex-row items-center justify-center"
								style={{
									backgroundColor: colors.primary.vivid,
									shadowColor: colors.primary.vivid,
									shadowOffset: { width: 0, height: 3 },
									shadowOpacity: 0.3,
									shadowRadius: 6,
									elevation: 4,
								}}
							>
								<Ionicons name="arrow-forward-circle-outline" size={20} color="#FFFFFF" />
								<Text className="text-white font-bold ml-2">Ver Perfil do Anfitrião</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* Amenidades (se houver) */}
					{bnb.amenities && (
						<View
							className="p-5 rounded-3xl mb-6"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.05,
								shadowRadius: 8,
								elevation: 2,
							}}
						>
							<View className="flex-row items-center mb-3">
								<Ionicons name="checkmark-circle" size={22} color={colors.primary.vivid} />
								<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
									Comodidades
								</Text>
							</View>
							<Text className="text-base leading-6" style={{ color: colors.text.secondary }}>
								{bnb.amenities}
							</Text>
						</View>
					)}

					<TouchableOpacity
						className="px-6 py-4 rounded-2xl flex-row items-center justify-center"
						style={{
							backgroundColor: colors.primary.vivid,
							shadowColor: colors.primary.vivid,
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.4,
							shadowRadius: 12,
							elevation: 8,
						}}
					>
						<Ionicons name="calendar" size={24} color="#FFFFFF" />
						<Text className="text-white text-lg font-bold ml-2">Reservar Agora</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
