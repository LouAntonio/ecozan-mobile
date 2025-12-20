import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export default function ToursScreen() {
	const { colors, isDark } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedDuration, setSelectedDuration] = useState('all');

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
			title: 'Safari Blue',
			category: 'water',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			duration: 'full',
			durationText: 'Dia inteiro',
			price: '65',
			rating: 4.9,
			reviews: 234,
			groupSize: '2-15',
			highlights: ['Mergulho', 'Almoço incluso', 'Praia paradisíaca'],
			description: 'Explore as águas cristalinas do arquipélago de Menai Bay',
			location: 'Fumba',
			included: ['Guia', 'Equipamento', 'Almoço', 'Frutas'],
		},
		{
			id: 2,
			title: 'Stone Town Heritage Tour',
			category: 'culture',
			image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
			duration: 'half',
			durationText: '4 horas',
			price: '30',
			rating: 4.8,
			reviews: 189,
			groupSize: '1-10',
			highlights: ['Guia local', 'Mercado', 'Arquitetura histórica'],
			description: 'Descubra a rica história e cultura de Stone Town',
			location: 'Stone Town',
			included: ['Guia especializado', 'Entrada museus', 'Degustação'],
		},
		{
			id: 3,
			title: 'Spice Farm Tour',
			category: 'nature',
			image: 'https://images.unsplash.com/photo-1596040033229-a0b44b7ff4e9?w=800',
			duration: 'half',
			durationText: '3-4 horas',
			price: '35',
			rating: 4.7,
			reviews: 156,
			groupSize: '2-12',
			highlights: ['Especiarias', 'Frutas tropicais', 'Almoço local'],
			description: 'Conheça as famosas plantações de especiarias de Zanzibar',
			location: 'Zona Rural',
			included: ['Transporte', 'Guia', 'Degustação', 'Almoço'],
		},
		{
			id: 4,
			title: 'Mergulho com Golfinhos',
			category: 'water',
			image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=800',
			duration: 'half',
			durationText: '3-4 horas',
			price: '55',
			rating: 4.9,
			reviews: 312,
			groupSize: '2-8',
			highlights: ['Golfinhos', 'Snorkel', 'Praia'],
			description: 'Nade com golfinhos selvagens no oceano Índico',
			location: 'Kizimkazi',
			included: ['Barco', 'Equipamento snorkel', 'Guia', 'Frutas'],
		},
		{
			id: 5,
			title: 'Jozani Forest',
			category: 'nature',
			image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
			duration: 'half',
			durationText: '3 horas',
			price: '40',
			rating: 4.6,
			reviews: 98,
			groupSize: '2-15',
			highlights: ['Macacos raros', 'Natureza', 'Trilhas'],
			description: 'Explore a única floresta nativa de Zanzibar',
			location: 'Jozani',
			included: ['Entrada parque', 'Guia', 'Transporte'],
		},
		{
			id: 6,
			title: 'Prison Island Tour',
			category: 'adventure',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			duration: 'half',
			durationText: '3 horas',
			price: '45',
			rating: 4.7,
			reviews: 145,
			groupSize: '2-20',
			highlights: ['Tartarugas gigantes', 'História', 'Snorkel'],
			description: 'Visite a histórica Ilha da Prisão e suas tartarugas',
			location: 'Changuu Island',
			included: ['Barco', 'Entrada', 'Guia', 'Snorkel'],
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
					<TouchableOpacity>
						<Ionicons name="options-outline" size={22} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>
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

			{/* Categorias */}
			<View className="mb-5">
				<View className="px-5 mb-3">
					<Text
						className="text-xl font-bold"
						style={{ color: colors.text.primary }}
					>
						Categorias
					</Text>
				</View>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
				>
					{categories.map((cat) => {
						const isSelected = selectedCategory === cat.id;
						return (
							<TouchableOpacity
								key={cat.id}
								onPress={() => setSelectedCategory(cat.id)}
								activeOpacity={0.7}
								className="px-5 py-3 rounded-2xl flex-row items-center"
								style={{
									backgroundColor: isSelected
										? colors.primary.vivid
										: colors.surface.card,
									borderWidth: 1.5,
									borderColor: isSelected
										? colors.primary.vivid
										: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									shadowColor: isSelected ? colors.primary.vivid : 'transparent',
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.3,
									shadowRadius: 4,
									elevation: isSelected ? 3 : 0,
								}}
							>
								<Ionicons
									name={cat.icon}
									size={18}
									color={isSelected ? '#FFFFFF' : colors.text.primary}
								/>
								<Text
									className="font-semibold ml-2"
									style={{
										color: isSelected ? '#FFFFFF' : colors.text.primary
									}}
								>
									{cat.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>

			{/* Filtro de duração */}
			<View className="px-5 mb-6">
				<Text
					className="text-sm font-bold mb-3"
					style={{ color: colors.text.secondary }}
				>
					Duração do Passeio
				</Text>
				<View className="flex-row flex-wrap gap-2">
					{durations.map((dur) => {
						const isSelected = selectedDuration === dur.id;
						return (
							<TouchableOpacity
								key={dur.id}
								onPress={() => setSelectedDuration(dur.id)}
								activeOpacity={0.7}
								className="px-4 py-2.5 rounded-xl flex-row items-center"
								style={{
									borderWidth: 1.5,
									borderColor: isSelected
										? colors.primary.vivid
										: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									backgroundColor: isSelected
										? `${colors.primary.vivid}15`
										: colors.surface.card,
								}}
							>
								<Ionicons
									name={dur.icon}
									size={16}
									color={isSelected ? colors.primary.vivid : colors.text.secondary}
								/>
								<Text
									className="text-sm font-medium ml-1.5"
									style={{
										color: isSelected
											? colors.primary.vivid
											: colors.text.secondary,
									}}
								>
									{dur.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
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
						<TouchableOpacity className="flex-row items-center">
							<Text
								className="font-semibold text-sm mr-1"
								style={{ color: colors.primary.vivid }}
							>
								Ver todos
							</Text>
							<Ionicons name="arrow-forward" size={14} color={colors.primary.vivid} />
						</TouchableOpacity>
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
													${tour.price}
												</Text>
												<Text
													className="text-xs ml-1"
													style={{ color: colors.text.secondary }}
												>
													/pessoa
												</Text>
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
											<Text className="text-white font-bold text-sm mr-1">
												Ver Mais
											</Text>
											<Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
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
					<TouchableOpacity className="flex-row items-center">
						<Ionicons name="funnel-outline" size={18} color={colors.primary.vivid} />
						<Text
							className="font-semibold text-sm ml-1"
							style={{ color: colors.primary.vivid }}
						>
							Filtrar
						</Text>
					</TouchableOpacity>
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
												${tour.price}
											</Text>
											<Text
												className="text-[10px] ml-0.5"
												style={{ color: colors.text.secondary }}
											>
												/pessoa
											</Text>
										</View>
									</View>
									<TouchableOpacity
									className="px-4 py-2 rounded-xl"
									style={{ backgroundColor: colors.primary.vivid }}
								>
									<Text className="text-white font-bold text-xs">
										Reservar
									</Text>
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