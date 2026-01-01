import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import apiRequest from '../../scripts/requests';

const { width } = Dimensions.get('window');

export default function TourDetailsScreen({ route, navigation }) {
	const { tourId } = route.params;
	const { colors, isDark } = useTheme();
	const [tour, setTour] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [provinces, setProvinces] = useState([]);

	useEffect(() => {
		const fetchTourDetails = async () => {
			try {
				setLoading(true);
				const [tourResponse, provincesResponse] = await Promise.all([
					apiRequest(`/tours/${tourId}`),
					apiRequest('/provinces')
				]);

				if (tourResponse.success) {
					setTour(tourResponse.data);
				}
				if (provincesResponse.success) {
					setProvinces(provincesResponse.data);
				}
			} catch (error) {
				console.error('Error fetching tour details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchTourDetails();
	}, [tourId]);

	// Função para obter o nome da província pelo ID
	const getProvinceName = (locationId) => {
		const province = provinces.find(p => p.id === locationId);
		return province ? province.name : 'Localização não disponível';
	};

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

	if (!tour) {
		return (
			<View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background.primary }}>
				<Ionicons name="alert-circle-outline" size={64} color={colors.text.secondary} />
				<Text className="mt-4 text-lg font-bold" style={{ color: colors.text.primary }}>
					Passeio não encontrado
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

	const gallery = parseGallery(tour.galery);
	const allImages = [tour.image, ...gallery];

	return (
		<View className="flex-1" style={{ backgroundColor: colors.background.primary }}>
			{/* Header com botão de voltar */}
			<View
				className="absolute top-0 left-0 right-0 z-10 flex-row items-center justify-between px-5 pt-12 pb-4"
				style={{
					backgroundColor: 'transparent',
				}}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate('ToursList')}
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

			<ScrollView showsVerticalScrollIndicator={false}>
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

				{/* Conteúdo principal */}
				<View className="px-5 py-6">
					{/* Título e avaliação */}
					<View className="flex-row items-start justify-between mb-4">
						<View className="flex-1 mr-4">
							<Text className="text-3xl font-bold mb-2" style={{ color: colors.text.primary }}>
								{tour.name}
							</Text>
							<View className="flex-row items-center">
								<Ionicons name="location" size={18} color={colors.primary.vivid} />
								<Text className="ml-1 text-base" style={{ color: colors.text.secondary }}>
									{getProvinceName(tour.location)}
								</Text>
							</View>
						</View>
						{tour.eval && (
							<View
								className="flex-row items-center px-3 py-2 rounded-xl"
								style={{
									backgroundColor: isDark ? `${colors.primary.vivid}20` : `${colors.primary.vivid}15`,
								}}
							>
								<Ionicons name="star" size={18} color="#F59E0B" />
								<Text className="ml-1 font-bold text-base" style={{ color: colors.text.primary }}>
									{tour.eval}
								</Text>
							</View>
						)}
					</View>

					{/* Informações rápidas */}
					<View className="flex-row mb-6">
						<View
							className="flex-1 mr-2 p-4 rounded-2xl"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							}}
						>
							<Ionicons name="time-outline" size={24} color={colors.primary.vivid} />
							<Text className="mt-2 text-xs" style={{ color: colors.text.secondary }}>
								Duração
							</Text>
							<Text className="font-bold text-base" style={{ color: colors.text.primary }}>
								{tour.duration}
							</Text>
						</View>
						<View
							className="flex-1 ml-2 p-4 rounded-2xl"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							}}
						>
							<Ionicons name="cash-outline" size={24} color={colors.primary.vivid} />
							<Text className="mt-2 text-xs" style={{ color: colors.text.secondary }}>
								Preço
							</Text>
							<Text className="font-bold text-base" style={{ color: colors.text.primary }}>
								{formatPrice(tour.price)} Kz
							</Text>
							<Text className="text-xs" style={{ color: colors.text.secondary }}>
								{tour.price_modality}
							</Text>
						</View>
					</View>

					{/* Descrição */}
					<View className="mb-6">
						<Text className="text-xl font-bold mb-3" style={{ color: colors.text.primary }}>
							Sobre este passeio
						</Text>
						<Text className="text-base leading-6" style={{ color: colors.text.secondary }}>
							{tour.description}
						</Text>
					</View>

					{/* Destaques */}
					<View className="mb-6">
						<Text className="text-xl font-bold mb-3" style={{ color: colors.text.primary }}>
							Destaques
						</Text>
						<View className="space-y-3">
							<View className="flex-row items-center">
								<View
									className="w-10 h-10 rounded-full items-center justify-center"
									style={{
										backgroundColor: isDark ? `${colors.primary.vivid}20` : `${colors.primary.vivid}15`,
									}}
								>
									<Ionicons name="checkmark-circle" size={24} color={colors.primary.vivid} />
								</View>
								<Text className="ml-3 flex-1 text-base" style={{ color: colors.text.secondary }}>
									Guia turístico experiente
								</Text>
							</View>
							<View className="flex-row items-center mt-3">
								<View
									className="w-10 h-10 rounded-full items-center justify-center"
									style={{
										backgroundColor: isDark ? `${colors.primary.vivid}20` : `${colors.primary.vivid}15`,
									}}
								>
									<Ionicons name="checkmark-circle" size={24} color={colors.primary.vivid} />
								</View>
								<Text className="ml-3 flex-1 text-base" style={{ color: colors.text.secondary }}>
									Transporte incluído
								</Text>
							</View>
							<View className="flex-row items-center mt-3">
								<View
									className="w-10 h-10 rounded-full items-center justify-center"
									style={{
										backgroundColor: isDark ? `${colors.primary.vivid}20` : `${colors.primary.vivid}15`,
									}}
								>
									<Ionicons name="checkmark-circle" size={24} color={colors.primary.vivid} />
								</View>
								<Text className="ml-3 flex-1 text-base" style={{ color: colors.text.secondary }}>
									Cancelamento flexível
								</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Botão de reserva fixo no rodapé */}
			<View
				className="px-5 py-4"
				style={{
					backgroundColor: colors.surface.card,
					borderTopWidth: 1.5,
					borderTopColor: isDark ? `${colors.primary.vivid}15` : colors.border.light,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: -4 },
					shadowOpacity: 0.1,
					shadowRadius: 8,
					elevation: 8,
				}}
			>
				<View className="flex-row items-center justify-between">
					<View>
						<Text className="text-xs" style={{ color: colors.text.secondary }}>
							Preço total
						</Text>
						<Text className="text-2xl font-bold" style={{ color: colors.text.primary }}>
							{formatPrice(tour.price)} Kz
						</Text>
					</View>
					<TouchableOpacity
						className="px-8 py-4 rounded-2xl flex-row items-center"
						style={{
							backgroundColor: colors.primary.vivid,
							shadowColor: colors.primary.vivid,
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.3,
							shadowRadius: 8,
							elevation: 5,
						}}
					>
						<Text className="text-white font-bold text-lg mr-2">Reservar</Text>
						<Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
