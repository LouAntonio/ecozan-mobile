import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export default function DiscoverScreen() {
	const { colors, isDark } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('all');

	// Dados das categorias
	const categories = [
		{ id: 'all', label: 'Tudo', icon: 'globe-outline' },
		{ id: 'stays', label: 'Hospedagem', icon: 'bed-outline' },
		{ id: 'transport', label: 'Transporte', icon: 'car-outline' },
		{ id: 'tours', label: 'Passeios', icon: 'boat-outline' },
		{ id: 'packages', label: 'Pacotes', icon: 'gift-outline' },
	];

	// Pacotes especiais
	const packages = [
		{
			id: 1,
			title: 'Pacote Lua de Mel',
			description: '5 dias · Villa + Passeios + Transfer',
			image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
			price: '890',
			discount: '15%',
			features: ['Villa Privativa', 'Jantar Romântico', 'Spa Incluído'],
		},
		{
			id: 2,
			title: 'Aventura Completa',
			description: '7 dias · Hotel + Tours + Carro',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			price: '1.200',
			discount: '20%',
			features: ['Hotel 5 Estrelas', 'Carro Incluso', 'Guia Turístico'],
		},
	];

	// Experiências rápidas
	const experiences = [
		{ id: 1, title: 'Mergulho com Golfinhos', icon: 'fish', color: '#3B82F6' },
		{ id: 2, title: 'Safari Blue', icon: 'boat', color: '#10B981' },
		{ id: 3, title: 'Spice Tour', icon: 'leaf', color: '#F59E0B' },
		{ id: 4, title: 'Stone Town', icon: 'business', color: '#EC4899' },
	];

	// Itens em destaque
	const featured = [
		{
			id: 1,
			title: 'Villa Paradise Beach',
			type: 'Hospedagem',
			image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
			price: '150',
			rating: 4.9,
			location: 'Nungwi',
			amenities: ['Wi-Fi', 'Piscina', 'Vista Mar'],
		},
		{
			id: 2,
			title: 'Tour Ilha da Prisão',
			type: 'Passeio',
			image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
			price: '45',
			rating: 4.8,
			location: 'Stone Town',
			amenities: ['Guia Incluso', 'Almoço', 'Transporte'],
		},
		{
			id: 3,
			title: 'Transfer Aeroporto VIP',
			type: 'Transporte',
			image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
			price: '35',
			rating: 5.0,
			location: 'Zanzibar',
			amenities: ['Conforto', 'Pontual', 'Seguro'],
		},
	];

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
					Descubra Angola
				</Text>
				<Text
					className="text-base mb-5"
					style={{ color: colors.text.secondary }}
				>
					Paraíso esperando por você
				</Text>
			</View>

			{/* Categorias */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="py-5"
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

			{/* Pacotes Especiais */}
			<View className="mb-6">
				<View className="flex-row justify-between items-center mb-4 px-5">
					<View>
						<Text
							className="text-2xl font-bold"
							style={{ color: colors.text.primary }}
						>
							Pacotes Especiais
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.text.secondary }}
						>
							Ofertas exclusivas por tempo limitado
						</Text>
					</View>
					<TouchableOpacity className="flex-row items-center">
						<Text
							className="font-semibold mr-1"
							style={{ color: colors.primary.vivid }}
						>
							Ver todos
						</Text>
						<Ionicons name="arrow-forward" size={16} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
				>
					{packages.map((pkg) => (
						<TouchableOpacity
							key={pkg.id}
							activeOpacity={0.9}
							className="rounded-3xl overflow-hidden"
							style={{
								width: 320,
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
									source={{ uri: pkg.image }}
									className="w-full h-48"
								/>
								{/* Discount Badge */}
								<View
									className="absolute top-3 right-3 px-3 py-1.5 rounded-full flex-row items-center"
									style={{
										backgroundColor: '#EF4444',
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.3,
										shadowRadius: 4,
										elevation: 3,
									}}
								>
									<Ionicons name="pricetag" size={14} color="#FFFFFF" />
									<Text className="text-white font-bold text-xs ml-1">
										-{pkg.discount}
									</Text>
								</View>
								{/* Favorite Button */}
								<TouchableOpacity
									className="absolute top-3 left-3 w-10 h-10 rounded-full items-center justify-center"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.9)',
									}}
								>
									<Ionicons name="heart-outline" size={20} color="#EF4444" />
								</TouchableOpacity>
							</View>

							<View className="p-5">
								<Text
									className="text-xl font-bold mb-1"
									style={{ color: colors.text.primary }}
								>
									{pkg.title}
								</Text>
								<View className="flex-row items-center mb-3">
									<Ionicons name="time-outline" size={14} color={colors.text.secondary} />
									<Text
										className="text-sm ml-1"
										style={{ color: colors.text.secondary }}
									>
										{pkg.description}
									</Text>
								</View>

								{/* Features */}
								<View className="flex-row flex-wrap gap-2 mb-4">
									{pkg.features.map((feature, index) => (
										<View
											key={index}
											className="flex-row items-center px-2 py-1 rounded-lg"
											style={{ backgroundColor: `${colors.primary.vivid}10` }}
										>
											<Ionicons name="checkmark-circle" size={14} color={colors.primary.vivid} />
											<Text
												className="text-xs ml-1 font-medium"
												style={{ color: colors.primary.vivid }}
											>
												{feature}
											</Text>
										</View>
									))}
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
												className="text-3xl font-bold"
												style={{ color: colors.primary.vivid }}
											>
												${pkg.price}
											</Text>
											<Text
												className="text-sm ml-1"
												style={{ color: colors.text.secondary }}
											>
												/pessoa
											</Text>
										</View>
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
										<Text className="text-white font-bold mr-1">Reservar</Text>
										<Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{/* Experiências Populares */}
			<View className="px-5 mb-6">
				<Text
					className="text-2xl font-bold mb-1"
					style={{ color: colors.text.primary }}
				>
					Experiências Populares
				</Text>
				<Text
					className="text-sm mb-4"
					style={{ color: colors.text.secondary }}
				>
					Atividades imperdíveis em Angola
				</Text>
				<View className="flex-row flex-wrap gap-3">
					{experiences.map((exp) => (
						<TouchableOpacity
							key={exp.id}
							activeOpacity={0.7}
							className="rounded-2xl p-4 items-center"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${exp.color}30` : colors.border.light,
								width: '48%',
								shadowColor: exp.color,
								shadowOffset: { width: 0, height: 3 },
								shadowOpacity: isDark ? 0.3 : 0.1,
								shadowRadius: 6,
								elevation: 3,
							}}
						>
							<View
								className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
								style={{
									backgroundColor: `${exp.color}15`,
									borderWidth: 1.5,
									borderColor: `${exp.color}30`,
								}}
							>
								<Ionicons name={exp.icon} size={32} color={exp.color} />
							</View>
							<Text
								className="text-sm font-bold text-center"
								style={{ color: colors.text.primary }}
							>
								{exp.title}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Recomendados */}
			<View className="px-5 mb-6">
				<Text
					className="text-2xl font-bold mb-1"
					style={{ color: colors.text.primary }}
				>
					Recomendados para Você
				</Text>
				<Text
					className="text-sm mb-4"
					style={{ color: colors.text.secondary }}
				>
					Selecionados especialmente para você
				</Text>

				{featured.map((item) => (
					<TouchableOpacity
						key={item.id}
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
						<View className="relative">
							<Image
								source={{ uri: item.image }}
								className="w-full h-52"
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
									{item.rating}
								</Text>
							</View>
							{/* Type Badge */}
							<View
								className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full"
								style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
							>
								<Text className="text-white text-xs font-semibold">
									{item.type}
								</Text>
							</View>
						</View>

						<View className="p-5">
							<View className="mb-3">
								<Text
									className="text-xl font-bold mb-2"
									style={{ color: colors.text.primary }}
								>
									{item.title}
								</Text>
								<View className="flex-row items-center">
									<Ionicons name="location" size={16} color={colors.primary.vivid} />
									<Text
										className="text-sm ml-1"
										style={{ color: colors.text.secondary }}
									>
										{item.location}
									</Text>
								</View>
							</View>

							{/* Amenities */}
							<View className="flex-row flex-wrap gap-2 mb-4">
								{item.amenities.map((amenity, index) => (
									<View
										key={index}
										className="flex-row items-center px-3 py-1.5 rounded-full"
										style={{
											backgroundColor: isDark ? `${colors.primary.vivid}10` : `${colors.primary.vivid}08`,
											borderWidth: 1,
											borderColor: `${colors.primary.vivid}20`,
										}}
									>
										<Ionicons name="checkmark-circle" size={14} color={colors.primary.vivid} />
										<Text
											className="text-xs ml-1 font-medium"
											style={{ color: colors.text.primary }}
										>
											{amenity}
										</Text>
									</View>
								))}
							</View>

							<View
								className="flex-row justify-between items-center pt-4 border-t"
								style={{ borderColor: isDark ? `${colors.primary.vivid}15` : colors.border.light }}
							>
								<View>
									<Text
										className="text-xs mb-1"
										style={{ color: colors.text.secondary }}
									>
										A partir de
									</Text>
									<View className="flex-row items-baseline">
										<Text
											className="text-3xl font-bold"
											style={{ color: colors.primary.vivid }}
										>
											${item.price}
										</Text>
										<Text
											className="text-sm ml-1"
											style={{ color: colors.text.secondary }}
										>
											/dia
										</Text>
									</View>
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
									<Text className="text-white font-bold mr-1">Ver Mais</Text>
									<Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
								</TouchableOpacity>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>

			{/* Call to Action */}
			<View
				className="mx-5 mb-24 rounded-3xl p-6 overflow-hidden"
				style={{
					backgroundColor: colors.primary.vivid,
					shadowColor: colors.primary.vivid,
					shadowOffset: { width: 0, height: 6 },
					shadowOpacity: 0.4,
					shadowRadius: 12,
					elevation: 8,
				}}
			>
				<View className="flex-row items-center mb-2">
					<Ionicons name="gift" size={28} color="#FFFFFF" />
					<Text className="text-2xl font-bold text-white ml-2">
						Primeira viagem?
					</Text>
				</View>
				<Text className="text-white mb-4 text-base opacity-90">
					Ganhe 20% de desconto no seu primeiro pacote completo
				</Text>
				<TouchableOpacity
					className="px-6 py-3.5 rounded-2xl self-start flex-row items-center"
					style={{
						backgroundColor: '#FFFFFF',
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.2,
						shadowRadius: 4,
						elevation: 3,
					}}
				>
					<Text
						className="font-bold text-base mr-1"
						style={{ color: colors.primary.vivid }}
					>
						Aproveitar Oferta
					</Text>
					<Ionicons name="arrow-forward" size={18} color={colors.primary.vivid} />
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}