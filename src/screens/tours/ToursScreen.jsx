import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { useNavigation } from '@react-navigation/native';
import apiRequest from '../../scripts/requests';

export default function ToursScreen() {
	const { colors, isDark } = useTheme();
	const navigation = useNavigation();
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedDuration, setSelectedDuration] = useState('all');
	const [showFilters, setShowFilters] = useState(false);
	const [tours, setTours] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [loading, setLoading] = useState(true);

	// Buscar tours e províncias da API
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [toursResponse, provincesResponse] = await Promise.all([
					apiRequest('/tours'),
					apiRequest('/provinces')
				]);

				if (toursResponse.success) {
					setTours(toursResponse.data);
				}
				if (provincesResponse.success) {
					setProvinces(provincesResponse.data);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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

	// Categorias de tours
	const categories = [
		{ id: 'all', label: 'Todos', icon: 'globe-outline' },
		{ id: 'water', label: 'Aquáticos', icon: 'water-outline' },
		{ id: 'culture', label: 'Cultural', icon: 'library-outline' },
		{ id: 'adventure', label: 'Aventura', icon: 'compass-outline' },
		{ id: 'nature', label: 'Natureza', icon: 'leaf-outline' },
	];

	// Filtros de duração
	const durations = [
		{ id: 'all', label: 'Qualquer', icon: 'infinite-outline' },
		{ id: 'half', label: 'Meio dia', icon: 'time-outline' },
		{ id: 'full', label: 'Dia inteiro', icon: 'sunny-outline' },
		{ id: 'multi', label: 'Vários dias', icon: 'calendar-outline' },
	];

	// Filtrar tours - simplificado já que não temos categorias e durações específicas na API
	const filteredTours = tours.filter(tour => {
		// Por enquanto, mantemos apenas o filtro básico
		// Você pode adicionar lógica de filtro mais tarde quando tiver essas informações
		return true;
	});

	// Tours em destaque (featured = 1)
	const featuredTours = tours.filter(tour => tour.featured === 1);

	// Mostrar loading state
	if (loading) {
		return (
			<View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background.primary }}>
				<ActivityIndicator size="large" color={colors.primary.vivid} />
				<Text className="mt-4 text-base" style={{ color: colors.text.secondary }}>
					Carregando passeios...
				</Text>
			</View>
		);
	}

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			showsVerticalScrollIndicator={false}
		>
			{/* Header com busca */}
			<View
				className="px-5 pt-8 pb-6"
				style={{
					backgroundColor: colors.surface.card,
					borderBottomWidth: 1.5,
					borderBottomColor: isDark ? `${colors.primary.vivid}15` : `${colors.border.light}50`,
					shadowColor: isDark ? colors.primary.vivid : '#000',
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: isDark ? 0.2 : 0.05,
					shadowRadius: 8,
					elevation: 3,
				}}
			>
				<Text
					className="text-[32px] font-bold mb-1"
					style={{ color: colors.text.primary }}
				>
					Passeios em Angola
				</Text>
				<Text
					className="text-base mb-5"
					style={{ color: colors.text.secondary }}
				>
					Experiências únicas e inesquecíveis
				</Text>

				{/* Search Bar */}
				<View
					className="flex-row items-center px-4 py-3 rounded-2xl"
					style={{
						backgroundColor: colors.background.primary,
						borderWidth: 1.5,
						borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
					}}
				>
					<Ionicons name="search" size={20} color={colors.text.secondary} />
					<TextInput
						placeholder="Buscar passeios..."
						placeholderTextColor={colors.text.secondary}
						className="flex-1 ml-3 text-base"
						style={{ color: colors.text.primary }}
					/>
					<TouchableOpacity onPress={() => setShowFilters(true)}>
						<Ionicons name="options-outline" size={22} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>

				{/* Modal de Filtros (acessível pelo botão de opções) */}
				<Modal visible={showFilters} animationType="slide" transparent>
					<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 }}>
						<View className="rounded-2xl p-4" style={{ backgroundColor: colors.surface.card }}>
							<View className="flex-row justify-between items-center mb-3">
								<Text className="text-lg font-bold" style={{ color: colors.text.primary }}>Filtros</Text>
								<TouchableOpacity onPress={() => setShowFilters(false)}>
									<Ionicons name="close" size={22} color={colors.text.secondary} />
								</TouchableOpacity>
							</View>
							<Text className="text-sm font-semibold mb-2" style={{ color: colors.text.secondary }}>Categorias</Text>
							<View className="flex-row flex-wrap mb-3">
								{categories.map((cat) => {
									const isSelected = selectedCategory === cat.id;
									return (
										<TouchableOpacity
											key={cat.id}
											onPress={() => setSelectedCategory(cat.id)}
											activeOpacity={0.8}
											className="px-4 py-2 rounded-xl mr-2 mb-2 flex-row items-center"
											style={{ backgroundColor: isSelected ? colors.primary.vivid : colors.surface.card, borderWidth: 1.5, borderColor: isSelected ? colors.primary.vivid : colors.border.light }}
										>
											<Ionicons name={cat.icon} size={16} color={isSelected ? '#FFFFFF' : colors.text.primary} />
											<Text className="ml-2" style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{cat.label}</Text>
										</TouchableOpacity>
									);
								})}
							</View>

							<Text className="text-sm font-semibold mb-2" style={{ color: colors.text.secondary }}>Duração</Text>
							<View className="flex-row flex-wrap">
								{durations.map((dur) => {
									const isSelected = selectedDuration === dur.id;
									return (
										<TouchableOpacity
											key={dur.id}
											onPress={() => setSelectedDuration(dur.id)}
											activeOpacity={0.8}
											className="px-4 py-2 rounded-xl mr-2 mb-2"
											style={{ backgroundColor: isSelected ? colors.primary.vivid : colors.surface.card, borderWidth: 1.5, borderColor: isSelected ? colors.primary.vivid : colors.border.light }}
										>
											<Text style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{dur.label}</Text>
										</TouchableOpacity>
									);
								})}
							</View>

							<View className="flex-row justify-end mt-4">
								<TouchableOpacity onPress={() => { setSelectedCategory('all'); setSelectedDuration('all'); }}>
									<Text style={{ color: colors.text.secondary }}>Limpar</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => setShowFilters(false)} className="ml-4 px-4 py-2 rounded-2xl" style={{ backgroundColor: colors.primary.vivid }}>
									<Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Aplicar</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>

			{/* Banner promocional */}
			<View className="px-5 pt-6 pb-4">
				<TouchableOpacity
					activeOpacity={0.9}
					className="rounded-3xl p-6 overflow-hidden"
					style={{
						backgroundColor: colors.primary.vivid,
						shadowColor: colors.primary.vivid,
						shadowOffset: { width: 0, height: 6 },
						shadowOpacity: 0.4,
						shadowRadius: 12,
						elevation: 8,
					}}
				>
					<View className="flex-row items-center justify-between">
						<View className="flex-1">
							<View className="flex-row items-center mb-2">
								<Ionicons name="pricetag" size={18} color="#FFFFFF" />
								<Text className="text-sm text-white font-bold ml-1">
									OFERTA ESPECIAL
								</Text>
							</View>
							<Text className="text-3xl font-bold text-white mb-2">
								20% OFF
							</Text>
							<Text className="text-sm text-white opacity-90 mb-3">
								Reserve 2 ou mais passeios
							</Text>
							<View className="flex-row items-center">
								<Text className="text-white font-semibold mr-1">Ver ofertas</Text>
								<Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
							</View>
						</View>
						<View
							className="w-20 h-20 rounded-full items-center justify-center"
							style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
						>
							<Ionicons name="gift" size={40} color="#FFFFFF" />
						</View>
					</View>
				</TouchableOpacity>
			</View>



			{/* Tours em destaque */}
			{selectedCategory === 'all' && selectedDuration === 'all' && (
				<View className="mb-6">
					<View className="flex-row justify-between items-center mb-4 px-5">
						<View className="flex-row items-center">
							<Ionicons name="flame" size={24} color="#F59E0B" />
							<Text
								className="text-xl font-bold ml-2"
								style={{ color: colors.text.primary }}
							>
								Mais Populares
							</Text>
						</View>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
					>
						{featuredTours.map((tour) => (
							<TouchableOpacity
								key={tour.id}
								activeOpacity={0.9}
								className="rounded-3xl overflow-hidden"
								onPress={() => navigation.navigate('TourDetails', { tourId: tour.id })}
								style={{
									width: 280,
									backgroundColor: colors.surface.card,
									borderWidth: 1.5,
									borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									shadowColor: '#000',
									shadowOffset: { width: 0, height: 4 },
									shadowOpacity: 0.1,
									shadowRadius: 12,
									elevation: 5,
								}}
							>
								<View className="relative">
									<Image
										source={{ uri: tour.image }}
										className="w-full h-44"
									/>
									{/* Rating Badge */}
									<View
										className="absolute top-3 right-3 px-3 py-1.5 rounded-full flex-row items-center"
										style={{
											backgroundColor: 'rgba(255, 255, 255, 0.95)',
											shadowColor: '#000',
											shadowOffset: { width: 0, height: 2 },
											shadowOpacity: 0.2,
											shadowRadius: 4,
											elevation: 3,
										}}
									>
										<Ionicons name="star" size={14} color="#F59E0B" />
										<Text className="font-bold text-sm ml-1" style={{ color: '#1F2937' }}>
											{tour.eval}
										</Text>
									</View>
									{/* Favorite */}
									<TouchableOpacity
										className="absolute top-3 left-3 w-9 h-9 rounded-full items-center justify-center"
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
									>
										<Ionicons name="heart-outline" size={18} color="#EF4444" />
									</TouchableOpacity>
								</View>

								<View className="p-4">
									<Text
										className="text-lg font-bold mb-1"
										style={{ color: colors.text.primary }}
									>
										{tour.name}
									</Text>
									<View className="flex-row items-center mb-3">
										<Ionicons name="location" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1 mr-2"
											style={{ color: colors.text.secondary }}
										>
											{getProvinceName(tour.location)}
										</Text>
										<Ionicons name="time" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1"
											style={{ color: colors.text.secondary }}
										>
											{tour.duration}
										</Text>
									</View>

									<View className="flex-row justify-between items-center">
										<View>
											<Text
												className="text-xs mb-0.5"
												style={{ color: colors.text.secondary }}
											>
												{tour.price_modality}
											</Text>
											<View className="flex-row items-baseline">
												<Text
													className="text-2xl font-bold"
													style={{ color: colors.primary.vivid }}
												>
													Kz {formatPrice(tour.price)}
												</Text>
												<Ionicons name="person" size={14} color={colors.text.secondary} style={{ marginLeft: 6 }} />
											</View>
										</View>
										<TouchableOpacity
											className="px-5 py-2.5 rounded-xl flex-row items-center"
											style={{
												backgroundColor: colors.primary.vivid,
												shadowColor: colors.primary.vivid,
												shadowOffset: { width: 0, height: 3 },
												shadowOpacity: 0.3,
												shadowRadius: 6,
												elevation: 4,
											}}
										>
											<Ionicons name="information-circle" size={18} color="#FFFFFF" />
										</TouchableOpacity>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			)}

			{/* Lista de todos os tours */}
			<View className="px-5 pb-6">
					<View className="flex-row items-center justify-between mb-4">
					<Text
						className="text-xl font-bold"
						style={{ color: colors.text.primary }}
					>
						{filteredTours.length === 1
							? '1 Passeio Disponível'
							: `${filteredTours.length} Passeios Disponíveis`}
					</Text>
				</View>

				{filteredTours.map((tour) => (
					<TouchableOpacity
						key={tour.id}
						activeOpacity={0.9}
						className="rounded-3xl mb-4 overflow-hidden flex-row"
						onPress={() => navigation.navigate('TourDetails', { tourId: tour.id })}
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.08,
							shadowRadius: 8,
							elevation: 3,
							minHeight: 112,
						}}
					>
						<View className="relative">
							<Image
								source={{ uri: tour.image }}
								style={{ width: 112, height: 112 }}
								className="rounded-l-2xl"
							/>
							<View
								className="absolute bottom-2 left-2 px-2 py-1 rounded-lg"
								style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
							>
								<View className="flex-row items-center">
									<Ionicons name="star" size={12} color="#F59E0B" />
									<Text className="text-white text-xs font-bold ml-1">
										{tour.eval}
									</Text>
								</View>
							</View>
						</View>

						<View className="flex-1 p-3">
							<Text
								className="text-base font-bold mb-1"
								style={{ color: colors.text.primary }}
							>
								{tour.name}
							</Text>
							
							<View className="flex-row items-center mb-2">
								<Ionicons name="location" size={12} color={colors.text.secondary} />
								<Text
									className="text-xs ml-1"
									style={{ color: colors.text.secondary }}
								>
									{getProvinceName(tour.location)}
								</Text>
							</View>

							<Text
								className="text-xs mb-2"
								style={{ color: colors.text.secondary }}
								numberOfLines={2}
							>
								{tour.description}
							</Text>

							<View className="flex-row items-center justify-between mt-auto">
									<View className="flex-row items-center">
										<Ionicons name="time-outline" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1 mr-3"
											style={{ color: colors.text.secondary }}
										>
											{tour.duration}
										</Text>
											<View className="flex-row items-baseline">
												<Text
													className="text-lg font-bold"
													style={{ color: colors.primary.vivid }}
												>
													Kz {formatPrice(tour.price)}
												</Text>
											</View>
									</View>
									<TouchableOpacity
									className="px-4 py-2 rounded-xl"
									style={{ backgroundColor: colors.primary.vivid }}
								>
									<Ionicons name="information-circle" size={16} color="#FFFFFF" />
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>

			{/* Call to action */}
			<View className="px-5 pb-24">
				<TouchableOpacity
					activeOpacity={0.9}
					className="rounded-3xl p-6"
					style={{
						backgroundColor: colors.surface.card,
						borderWidth: 2,
						borderColor: isDark ? `${colors.primary.vivid}30` : colors.border.light,
						borderStyle: 'dashed',
					}}
				>
					<View className="items-center">
						<View
							className="w-16 h-16 rounded-full items-center justify-center mb-3"
							style={{ backgroundColor: `${colors.primary.vivid}15` }}
						>
							<Ionicons name="create-outline" size={32} color={colors.primary.vivid} />
						</View>
						<Text
							className="text-xl font-bold mb-2 text-center"
							style={{ color: colors.text.primary }}
						>
							Não achou o que procura?
						</Text>
						<Text
							className="text-sm text-center mb-4"
							style={{ color: colors.text.secondary }}
						>
							Entre em contato e criaremos um passeio personalizado para você
						</Text>
						<View
							className="px-6 py-3 rounded-2xl flex-row items-center"
							style={{
								backgroundColor: colors.primary.vivid,
								shadowColor: colors.primary.vivid,
								shadowOffset: { width: 0, height: 3 },
								shadowOpacity: 0.3,
								shadowRadius: 6,
								elevation: 4,
							}}
						>
							<Ionicons name="chatbubbles" size={18} color="#FFFFFF" />
							<Text className="text-white font-bold ml-2">
								Solicitar Tour Personalizado
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}