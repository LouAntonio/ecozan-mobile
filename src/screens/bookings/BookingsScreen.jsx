import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export default function BookingsScreen() {
	const { colors, isDark } = useTheme();
	const [selectedProvince, setSelectedProvince] = useState('all');
	const [selectedMunicipality, setSelectedMunicipality] = useState('all');
	const [priceRange, setPriceRange] = useState('all');
	const [showFilters, setShowFilters] = useState(false);
	const [priceMin, setPriceMin] = useState('');
	const [priceMax, setPriceMax] = useState('');

	// Províncias e Municípios de Angola
	const provinces = [
		{ id: 'all', name: 'Todas', municipalities: [] },
		{ 
			id: 'luanda', 
			name: 'Luanda',
			municipalities: ['Todos', 'Luanda', 'Belas', 'Viana', 'Cacuaco', 'Icolo e Bengo']
		},
		{ 
			id: 'benguela', 
			name: 'Benguela',
			municipalities: ['Todos', 'Benguela', 'Lobito', 'Catumbela', 'Baía Farta']
		},
		{ 
			id: 'huila', 
			name: 'Huíla',
			municipalities: ['Todos', 'Lubango', 'Chibia', 'Humpata', 'Quilengues']
		},
		{ 
			id: 'huambo', 
			name: 'Huambo',
			municipalities: ['Todos', 'Huambo', 'Caála', 'Longonjo', 'Bailundo']
		},
		{ 
			id: 'namibe', 
			name: 'Namibe',
			municipalities: ['Todos', 'Namibe', 'Moçâmedes', 'Tombua', 'Virei']
		},
	];

	const priceRanges = [
		{ id: 'all', label: 'Qualquer preço', min: 0, max: 999999999 },
		{ id: 'budget', label: 'Até Kz 50.000', min: 0, max: 50000 },
		{ id: 'mid', label: 'Kz 50.000 - Kz 150.000', min: 50000, max: 150000 },
		{ id: 'luxury', label: 'Kz 150.000+', min: 150000, max: 999999999 },
	];

	// Hospedagens disponíveis
	const properties = [
		{
			id: 1,
			title: 'Apartamento Moderno na Ilha',
			province: 'luanda',
			municipality: 'Luanda',
			image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
			price: 85000,
			rating: 4.9,
			reviews: 127,
			type: 'Apartamento',
			guests: 4,
			bedrooms: 2,
			bathrooms: 2,
			amenities: ['Wi-Fi', 'Ar Condicionado', 'Piscina', 'Estacionamento'],
			host: 'Maria Silva',
			superhost: true,
		},
		{
			id: 2,
			title: 'Villa Luxuosa com Vista Mar',
			province: 'luanda',
			municipality: 'Belas',
			image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
			price: 250000,
			rating: 5.0,
			reviews: 89,
			type: 'Villa',
			guests: 8,
			bedrooms: 4,
			bathrooms: 3,
			amenities: ['Wi-Fi', 'Piscina Privada', 'Churrasqueira', 'Vista Mar'],
			host: 'João Costa',
			superhost: true,
		},
		{
			id: 3,
			title: 'Casa Aconchegante em Talatona',
			province: 'luanda',
			municipality: 'Belas',
			image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
			price: 120000,
			rating: 4.8,
			reviews: 64,
			type: 'Casa',
			guests: 6,
			bedrooms: 3,
			bathrooms: 2,
			amenities: ['Wi-Fi', 'Jardim', 'Estacionamento', 'Cozinha Completa'],
			host: 'Ana Ferreira',
			superhost: false,
		},
		{
			id: 4,
			title: 'Apartamento Económico Centro',
			province: 'luanda',
			municipality: 'Luanda',
			image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
			price: 45000,
			rating: 4.6,
			reviews: 156,
			type: 'Apartamento',
			guests: 2,
			bedrooms: 1,
			bathrooms: 1,
			amenities: ['Wi-Fi', 'Ar Condicionado', 'Netflix'],
			host: 'Pedro Santos',
			superhost: false,
		},
		{
			id: 5,
			title: 'Hotel Boutique Praia Morena',
			province: 'benguela',
			municipality: 'Lobito',
			image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
			price: 95000,
			rating: 4.9,
			reviews: 203,
			type: 'Hotel',
			guests: 2,
			bedrooms: 1,
			bathrooms: 1,
			amenities: ['Wi-Fi', 'Café da Manhã', 'Praia', 'Restaurante'],
			host: 'Hotel Morena',
			superhost: true,
		},
		{
			id: 6,
			title: 'Chalé Rústico Serra da Leba',
			province: 'huila',
			municipality: 'Lubango',
			image: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800',
			price: 70000,
			rating: 4.7,
			reviews: 45,
			type: 'Chalé',
			guests: 4,
			bedrooms: 2,
			bathrooms: 1,
			amenities: ['Lareira', 'Vista Montanha', 'Trilhas', 'Natureza'],
			host: 'Carlos Manuel',
			superhost: false,
		},
	];

	// Filtrar propriedades
	const currentMunicipalities = provinces.find(p => p.id === selectedProvince)?.municipalities || [];
	
	const filteredProperties = properties.filter(property => {
		const provinceMatch = selectedProvince === 'all' || property.province === selectedProvince;
		const municipalityMatch = selectedMunicipality === 'all' || selectedMunicipality === 'Todos' || property.municipality === selectedMunicipality;
		const priceRangeData = priceRanges.find(pr => pr.id === priceRange);
		const min = priceMin !== '' ? Number(priceMin) : priceRangeData.min;
		const max = priceMax !== '' ? Number(priceMax) : priceRangeData.max;
		const priceMatch = property.price >= min && property.price <= max;
		return provinceMatch && municipalityMatch && priceMatch;
	});

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
					Hospedagens
				</Text>
				<Text
					className="text-base mb-5"
					style={{ color: colors.text.secondary }}
				>
					Encontre o lugar perfeito para ficar
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
						placeholder="Buscar por localização ou nome..."
						placeholderTextColor={colors.text.secondary}
						className="flex-1 ml-3 text-base"
						style={{ color: colors.text.primary }}
					/>
					<TouchableOpacity onPress={() => setShowFilters(true)}>
						<Ionicons name="options-outline" size={22} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>

				{/* Modal de Filtros */}
				<Modal visible={showFilters} animationType="slide" transparent>
					<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 }}>
						<View className="rounded-2xl p-4" style={{ backgroundColor: colors.surface.card }}>
							<View className="flex-row justify-between items-center mb-3">
								<Text className="text-lg font-bold" style={{ color: colors.text.primary }}>Filtros</Text>
								<TouchableOpacity onPress={() => setShowFilters(false)}>
									<Ionicons name="close" size={22} color={colors.text.secondary} />
								</TouchableOpacity>
							</View>

							<Text className="text-sm font-semibold mb-2" style={{ color: colors.text.secondary }}>Província</Text>
							<View className="flex-row flex-wrap mb-3">
								{provinces.map((province) => {
									const isSelected = selectedProvince === province.id;
									return (
										<TouchableOpacity
											key={province.id}
											onPress={() => { setSelectedProvince(province.id); setSelectedMunicipality('all'); }}
											activeOpacity={0.8}
											className="px-4 py-2 rounded-xl mr-2 mb-2"
											style={{ backgroundColor: isSelected ? colors.primary.vivid : colors.surface.card, borderWidth: 1.5, borderColor: isSelected ? colors.primary.vivid : colors.border.light }}
										>
											<Text style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{province.name}</Text>
										</TouchableOpacity>
									);
								})}
							</View>

							{selectedProvince !== 'all' && (
								<>
									<Text className="text-sm font-semibold mb-2" style={{ color: colors.text.secondary }}>Município</Text>
									<View className="flex-row flex-wrap mb-3">
										{(provinces.find(p => p.id === selectedProvince)?.municipalities || []).map((municipality, index) => {
											const municipalityId = index === 0 ? 'all' : municipality;
											const isSelected = selectedMunicipality === municipalityId || (index === 0 && selectedMunicipality === 'all');
											return (
												<TouchableOpacity key={municipality} onPress={() => setSelectedMunicipality(municipalityId)} activeOpacity={0.8} className="px-4 py-2 rounded-xl mr-2 mb-2" style={{ backgroundColor: isSelected ? colors.primary.vivid : colors.surface.card, borderWidth: 1.5, borderColor: isSelected ? colors.primary.vivid : colors.border.light }}>
												<Text style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{municipality}</Text>
											</TouchableOpacity>
											);
										})}
									</View>
								</>
							)}

							<Text className="text-sm font-semibold mb-2" style={{ color: colors.text.secondary }}>Faixa de Preço</Text>
							<View className="flex-row flex-wrap mb-3">
								{priceRanges.map((range) => {
									const isSelected = priceRange === range.id;
									return (
										<TouchableOpacity key={range.id} onPress={() => setPriceRange(range.id)} activeOpacity={0.8} className="px-4 py-2 rounded-xl mr-2 mb-2" style={{ backgroundColor: isSelected ? colors.primary.vivid : colors.surface.card, borderWidth: 1.5, borderColor: isSelected ? colors.primary.vivid : colors.border.light }}>
										<Text style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{range.label}</Text>
									</TouchableOpacity>
									);
								})}
							</View>

								{/* Filtro manual de preço */}
								<View className="flex-row items-center gap-2 mb-3">
									<TextInput
										placeholder="Kz mínima"
										placeholderTextColor={colors.text.secondary}
										className="flex-1 px-3 py-2 rounded-xl"
										style={{ backgroundColor: colors.surface.card, color: colors.text.primary }}
										keyboardType="numeric"
										value={priceMin}
										onChangeText={setPriceMin}
									/>
									<TextInput
										placeholder="Kz máxima"
										placeholderTextColor={colors.text.secondary}
										className="flex-1 px-3 py-2 rounded-xl"
										style={{ backgroundColor: colors.surface.card, color: colors.text.primary }}
										keyboardType="numeric"
										value={priceMax}
										onChangeText={setPriceMax}
									/>
								</View>

							<View className="flex-row justify-end mt-4">
								<TouchableOpacity onPress={() => { setSelectedProvince('all'); setSelectedMunicipality('all'); setPriceRange('all'); }}>
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

			{/* Filtros Rápidos - Stats */}
			<View className="px-5 py-5">
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 12 }}
				>
					<View
						className="px-4 py-3 rounded-2xl flex-row items-center"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="home" size={18} color={colors.primary.vivid} />
						<Text className="font-semibold ml-2" style={{ color: colors.text.primary }}>
							{filteredProperties.length} propriedades
						</Text>
					</View>

					<TouchableOpacity
						className="px-4 py-3 rounded-2xl flex-row items-center"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="map" size={18} color={colors.primary.vivid} />
						<Text className="font-semibold ml-2" style={{ color: colors.text.primary }}>
							Ver Mapa
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="px-4 py-3 rounded-2xl flex-row items-center"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="heart-outline" size={18} color={colors.primary.vivid} />
						<Text className="font-semibold ml-2" style={{ color: colors.text.primary }}>
							Favoritos
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>



			{/* Lista de Propriedades */}
			<View className="px-5 pb-24">
				<View className="flex-row items-center justify-between mb-4">
					<Text className="text-xl font-bold" style={{ color: colors.text.primary }}>
						{filteredProperties.length} {filteredProperties.length === 1 ? 'Propriedade' : 'Propriedades'}
					</Text>
				</View>

				{filteredProperties.length > 0 ? (
					filteredProperties.map((property) => (
						<TouchableOpacity
							key={property.id}
							activeOpacity={0.9}
							className="rounded-3xl mb-4 overflow-hidden"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.08,
								shadowRadius: 12,
								elevation: 4,
							}}
						>
							{/* Image */}
							<View className="relative">
								<Image source={{ uri: property.image }} className="w-full h-56" />
								
								{/* Favorite Button */}
								<TouchableOpacity
									className="absolute top-3 right-3 w-10 h-10 rounded-full items-center justify-center"
									style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
								>
									<Ionicons name="heart-outline" size={20} color="#EF4444" />
								</TouchableOpacity>

								{/* Type Badge */}
								<View
									className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full flex-row items-center"
									style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
								>
									<Ionicons name="home" size={14} color="#FFFFFF" />
									<Text className="text-white text-xs font-semibold ml-1">
										{property.type}
									</Text>
								</View>

								{/* Superhost Badge */}
								{property.superhost && (
									<View
										className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex-row items-center"
										style={{ backgroundColor: '#EF4444' }}
									>
										<Ionicons name="star" size={12} color="#FFFFFF" />
										<Text className="text-white text-xs font-bold ml-1">
											Superhost
										</Text>
									</View>
								)}
							</View>

							{/* Content */}
							<View className="p-4">
								<View className="flex-row items-start justify-between mb-2">
									<View className="flex-1">
										<Text
											className="text-lg font-bold mb-1"
											style={{ color: colors.text.primary }}
										>
											{property.title}
										</Text>
										<View className="flex-row items-center">
											<Ionicons name="location" size={14} color={colors.text.secondary} />
											<Text className="text-sm ml-1" style={{ color: colors.text.secondary }}>
												{property.municipality}, {provinces.find(p => p.id === property.province)?.name}
											</Text>
										</View>
									</View>
									<View
										className="px-2 py-1 rounded-lg flex-row items-center"
										style={{
											backgroundColor: isDark
												? 'rgba(251, 191, 36, 0.15)'
												: 'rgba(251, 191, 36, 0.1)',
										}}
									>
										<Ionicons name="star" size={14} color="#F59E0B" />
										<Text className="font-bold text-sm ml-1" style={{ color: colors.text.primary }}>
											{property.rating}
										</Text>
										<Text className="text-xs ml-0.5" style={{ color: colors.text.secondary }}>
											({property.reviews})
										</Text>
									</View>
								</View>

								{/* Property Details */}
								<View className="flex-row items-center mb-3">
									<View className="flex-row items-center mr-4">
										<Ionicons name="people-outline" size={16} color={colors.text.secondary} />
										<Text className="text-xs ml-1" style={{ color: colors.text.secondary }}>
											{property.guests} hóspedes
										</Text>
									</View>
									<View className="flex-row items-center mr-4">
										<Ionicons name="bed-outline" size={16} color={colors.text.secondary} />
										<Text className="text-xs ml-1" style={{ color: colors.text.secondary }}>
											{property.bedrooms} quartos
										</Text>
									</View>
									<View className="flex-row items-center">
										<Ionicons name="water-outline" size={16} color={colors.text.secondary} />
										<Text className="text-xs ml-1" style={{ color: colors.text.secondary }}>
											{property.bathrooms} banheiros
										</Text>
									</View>
								</View>

								{/* Amenities */}
								<View className="flex-row flex-wrap gap-2 mb-4">
									{property.amenities.slice(0, 3).map((amenity, index) => (
										<View
											key={index}
											className="px-2 py-1 rounded-lg flex-row items-center"
											style={{
												backgroundColor: isDark
													? `${colors.primary.vivid}10`
													: colors.background.primary,
											}}
										>
											<Ionicons name="checkmark-circle" size={12} color={colors.primary.vivid} />
											<Text
												className="text-[10px] ml-1 font-medium"
												style={{ color: colors.text.secondary }}
											>
												{amenity}
											</Text>
										</View>
									))}
									{property.amenities.length > 3 && (
										<View
											className="px-2 py-1 rounded-lg"
											style={{ backgroundColor: colors.background.primary }}
										>
											<Text
												className="text-[10px] font-medium"
												style={{ color: colors.text.secondary }}
											>
												+{property.amenities.length - 3} mais
											</Text>
										</View>
									)}
								</View>

								{/* Footer */}
								<View
									className="flex-row items-center justify-between pt-3 border-t"
									style={{ borderColor: isDark ? `${colors.primary.vivid}15` : colors.border.light }}
								>
									<View>
											<View className="flex-row items-baseline">
												<Text
													className="text-2xl font-bold"
													style={{ color: colors.primary.vivid }}
												>
													Kz {property.price}
												</Text>
												<Text className="text-sm ml-1" style={{ color: colors.text.secondary }}>
													/noite
												</Text>
											</View>
										<Text className="text-xs mt-0.5" style={{ color: colors.text.secondary }}>
											Hospedado por {property.host}
										</Text>
									</View>
									<TouchableOpacity
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
										<Ionicons name="information-circle" size={16} color="#FFFFFF" />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					))
				) : (
					// Empty State
					<View className="items-center py-16">
						<View
							className="w-24 h-24 rounded-full items-center justify-center mb-4"
							style={{ backgroundColor: `${colors.primary.vivid}10` }}
						>
							<Ionicons name="search" size={48} color={colors.primary.vivid} />
						</View>
						<Text className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
							Nenhuma propriedade encontrada
						</Text>
						<Text
							className="text-sm text-center mb-6 px-8"
							style={{ color: colors.text.secondary }}
						>
							Tente ajustar os filtros ou buscar em outra província
						</Text>
						<TouchableOpacity
							className="px-6 py-3 rounded-2xl"
							style={{ backgroundColor: colors.primary.vivid }}
							onPress={() => {
								setSelectedProvince('all');
								setSelectedMunicipality('all');
								setPriceRange('all');
							}}
						>
							<Text className="text-white font-bold">Limpar Filtros</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</ScrollView>
	);
}