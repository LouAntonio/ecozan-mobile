import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export default function ToursScreen() {
	const { colors, isDark } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedDuration, setSelectedDuration] = useState('all');
	const [showFilters, setShowFilters] = useState(false);

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

	// Tours disponíveis
	const tours = [
		{
			id: 1,
			title: 'Ilha do Mussulo - Excursão',
			category: 'water',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			duration: 'full',
			durationText: 'Dia inteiro',
			price: '35000',
			rating: 4.9,
			reviews: 234,
			groupSize: '2-20',
			highlights: ['Praias', 'Almoço de marisco', 'Dunas'],
			description: 'Passeio de barco até a Ilha do Mussulo com tempo para praia e almoço',
			location: 'Ilha do Mussulo, Luanda',
			included: ['Barco', 'Almoço', 'Guia', 'Bebidas'],
		},
		{
			id: 2,
			title: 'Centro Histórico de Luanda',
			category: 'culture',
			image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
			duration: 'half',
			durationText: '4 horas',
			price: '15000',
			rating: 4.8,
			reviews: 189,
			groupSize: '1-12',
			highlights: ['Museus', 'Mercado do Kinaxixi', 'Forte de São Miguel'],
			description: 'Tour a pé pelo centro histórico de Luanda, museus e mercados tradicionais',
			location: 'Luanda',
			included: ['Guia', 'Entradas', 'Degustação'],
		},
		{
			id: 3,
			title: 'Cabo Ledo - Surf e Praia',
			category: 'nature',
			image: 'https://images.unsplash.com/photo-1596040033229-a0b44b7ff4e9?w=800',
			duration: 'full',
			durationText: 'Dia inteiro',
			price: '20000',
			rating: 4.7,
			reviews: 156,
			groupSize: '2-15',
			highlights: ['Praia', 'Surf', 'Trilhas'],
			description: 'Dia na costa do Lobito/Cabo Ledo com aulas de surf e tempo livre',
			location: 'Cabo Ledo / Lobito',
			included: ['Transporte', 'Aula de surf', 'Almoço'],
		},
		{
			id: 4,
			title: 'Observação de Golfinhos',
			category: 'water',
			image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800',
			duration: 'half',
			durationText: '3-4 horas',
			price: '18000',
			rating: 4.9,
			reviews: 312,
			groupSize: '2-12',
			highlights: ['Golfinhos', 'Snorkel', 'Praia'],
			description: 'Saída marítima para observação de golfinhos e snorkel na costa de Luanda',
			location: 'Barra do Dande / Luanda',
			included: ['Barco', 'Equipamento snorkel', 'Guia'],
		},
		{
			id: 5,
			title: 'Kissama National Park',
			category: 'nature',
			image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
			duration: 'full',
			durationText: 'Dia inteiro',
			price: '30000',
			rating: 4.6,
			reviews: 98,
			groupSize: '2-20',
			highlights: ['Vida selvagem', 'Safári', 'Trilhas'],
			description: 'Safari de dia inteiro no Parque Nacional Quiçama (Kissama)',
			location: 'Quiçama / Luanda',
			included: ['Transporte 4x4', 'Guia', 'Almoço'],
		},
		{
			id: 6,
			title: 'Ilha de Mussulo - Meio dia',
			category: 'adventure',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			duration: 'half',
			durationText: '3 horas',
			price: '12000',
			rating: 4.7,
			reviews: 145,
			groupSize: '2-20',
			highlights: ['Praia', 'Passeio de barco', 'Relax'],
			description: 'Meio dia na Ilha do Mussulo para banhos e atividades leves',
			location: 'Ilha do Mussulo',
			included: ['Barco', 'Entrada', 'Guia'],
		},
	];

	// Filtrar tours
	const filteredTours = tours.filter(tour => {
		const categoryMatch = selectedCategory === 'all' || tour.category === selectedCategory;
		const durationMatch = selectedDuration === 'all' || tour.duration === selectedDuration;
		return categoryMatch && durationMatch;
	});

	// Tours em destaque
	const featuredTours = tours.slice(0, 3);

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
											{tour.rating}
										</Text>
										<Text className="text-xs ml-0.5" style={{ color: '#6B7280' }}>
											({tour.reviews})
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
										{tour.title}
									</Text>
									<View className="flex-row items-center mb-3">
										<Ionicons name="location" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1 mr-2"
											style={{ color: colors.text.secondary }}
										>
											{tour.location}
										</Text>
										<Ionicons name="time" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1"
											style={{ color: colors.text.secondary }}
										>
											{tour.durationText}
										</Text>
									</View>

									<View className="flex-row justify-between items-center">
										<View>
											<Text
												className="text-xs mb-0.5"
												style={{ color: colors.text.secondary }}
											>
												A partir de
											</Text>
											<View className="flex-row items-baseline">
												<Text
													className="text-2xl font-bold"
													style={{ color: colors.primary.vivid }}
												>
													Kz {tour.price}
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
										{tour.rating}
									</Text>
								</View>
							</View>
						</View>

						<View className="flex-1 p-3">
							<Text
								className="text-base font-bold mb-1"
								style={{ color: colors.text.primary }}
							>
								{tour.title}
							</Text>
							
							<View className="flex-row items-center mb-2">
								<Ionicons name="location" size={12} color={colors.text.secondary} />
								<Text
									className="text-xs ml-1"
									style={{ color: colors.text.secondary }}
								>
									{tour.location}
								</Text>
							</View>

							<Text
								className="text-xs mb-2"
								style={{ color: colors.text.secondary }}
								numberOfLines={2}
							>
								{tour.description}
							</Text>

							<View className="flex-row flex-wrap gap-1 mb-2">
								{tour.highlights.slice(0, 2).map((highlight, idx) => (
									<View
										key={idx}
										className="px-2 py-1 rounded-lg flex-row items-center"
										style={{
											backgroundColor: isDark
												? `${colors.primary.vivid}10`
												: colors.background.primary,
										}}
									>
										<Ionicons name="checkmark-circle" size={12} color={colors.primary.vivid} />
										<Text
											className="text-[10px] ml-0.5 font-medium"
											style={{ color: colors.text.secondary }}
										>
											{highlight}
										</Text>
									</View>
								))}
							</View>

							<View className="flex-row items-center justify-between mt-auto">
									<View className="flex-row items-center">
										<Ionicons name="time-outline" size={14} color={colors.text.secondary} />
										<Text
											className="text-xs ml-1 mr-3"
											style={{ color: colors.text.secondary }}
										>
											{tour.durationText}
										</Text>
											<View className="flex-row items-baseline">
												<Text
													className="text-lg font-bold"
													style={{ color: colors.primary.vivid }}
												>
													Kz {tour.price}
												</Text>
												<Ionicons name="person" size={12} color={colors.text.secondary} style={{ marginLeft: 6 }} />
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