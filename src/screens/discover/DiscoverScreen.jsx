import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export default function DiscoverScreen() {
	const { colors, isDark } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('all');

	// Dados das categorias (removido 'tours')
	const categories = [
		{ id: 'all', label: 'Tudo', icon: 'globe-outline' },
		{ id: 'stays', label: 'Hospedagem', icon: 'bed-outline' },
		{ id: 'transport', label: 'Transporte', icon: 'car-outline' },
		{ id: 'packages', label: 'Pacotes', icon: 'gift-outline' },
	];

	// Hospedagens
	const stays = [
		{
			id: 1,
			category: 'stays',
			title: 'Villa Paradise Beach',
			image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
			price: '150',
			rating: 4.9,
			location: 'Nungwi',
			amenities: ['Wi-Fi', 'Piscina', 'Vista Mar'],
		},
		{
			id: 2,
			category: 'stays',
			title: 'Resort Tropical Bay',
			image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
			price: '220',
			rating: 4.8,
			location: 'Kendwa',
			amenities: ['All Inclusive', 'Spa', 'Praia Privada'],
		},
		{
			id: 3,
			category: 'stays',
			title: 'Boutique Hotel Stone Town',
			image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
			price: '95',
			rating: 4.7,
			location: 'Stone Town',
			amenities: ['Centro Histórico', 'Café da Manhã', 'Terraço'],
		},
	];

	// Transportes
	const transports = [
		{
			id: 1,
			category: 'transport',
			title: 'Transfer Aeroporto VIP',
			image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
			price: '35',
			rating: 5.0,
			location: 'Aeroporto',
			amenities: ['Conforto', 'Pontual', 'Seguro'],
		},
		{
			id: 2,
			category: 'transport',
			title: 'Aluguel de Carro SUV',
			image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
			price: '80',
			rating: 4.8,
			location: 'Zanzibar',
			amenities: ['4x4', 'GPS', 'Seguro Total'],
		},
		{
			id: 3,
			category: 'transport',
			title: 'Motorista Privado - Dia Completo',
			image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
			price: '90',
			rating: 4.9,
			location: 'Toda Ilha',
			amenities: ['Guia Local', 'Flexível', 'Wi-Fi'],
		},
	];

	// Pacotes
	const packages = [
		{
			id: 1,
			category: 'packages',
			title: 'Pacote Lua de Mel',
			description: '5 dias · Villa + Passeios + Transfer',
			image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
			price: '890',
			discount: '15%',
			rating: 5.0,
			location: 'Nungwi Beach',
			features: ['Villa Privativa', 'Jantar Romântico', 'Spa Incluído'],
		},
		{
			id: 2,
			category: 'packages',
			title: 'Aventura Completa',
			description: '7 dias · Hotel + Tours + Carro',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			price: '1200',
			discount: '20%',
			rating: 4.9,
			location: 'Zanzibar',
			features: ['Hotel 5 Estrelas', 'Carro Incluso', 'Guia Turístico'],
		},
		{
			id: 3,
			category: 'packages',
			title: 'Família & Diversão',
			description: '6 dias · Resort + Atividades + Meals',
			image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
			price: '1450',
			discount: '18%',
			rating: 4.8,
			location: 'Kendwa',
			features: ['All Inclusive', 'Kids Club', 'Atividades Aquáticas'],
		},
	];

	// Experiências populares (linhas) — agora com imagem lateral
	const experiences = [
		{ id: 1, title: 'Mergulho com Golfinhos', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', color: '#3B82F6', description: 'Nado com golfinhos selvagens' },
		{ id: 2, title: 'Safari Blue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', color: '#10B981', description: 'Aventura no oceano Índico' },
		{ id: 3, title: 'Spice Tour', image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800', color: '#F59E0B', description: 'Plantações de especiarias' },
		{ id: 4, title: 'Stone Town Heritage', image: 'https://images.unsplash.com/photo-1505765053656-6bca3b0a1b3b?w=800', color: '#EC4899', description: 'História e cultura local' },
		{ id: 5, title: 'Jozani Forest', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', color: '#8B5CF6', description: 'Floresta tropical e macacos' },
		{ id: 6, title: 'Prison Island', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800', color: '#06B6D4', description: 'Tartarugas gigantes' },
	];

	// Função para filtrar itens
	const getFilteredItems = () => {
		if (selectedCategory === 'all') {
			// Mostrar 1 de cada categoria
			return [
				stays[0],
				transports[0],
				packages[0],
			];
		} else if (selectedCategory === 'stays') {
			return stays;
		} else if (selectedCategory === 'transport') {
			return transports;
		} else if (selectedCategory === 'packages') {
			return packages;
		}
		return [];
	};

	const filteredItems = getFilteredItems();

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
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
					className="text-base mb-0"
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

			{/* Resultados Filtrados - Horizontal ScrollView */}
			<View className="mb-6">
				<View className="flex-row justify-between items-center mb-4 px-5">
					<View>
						<Text
							className="text-2xl font-bold"
							style={{ color: colors.text.primary }}
						>
							{selectedCategory === 'all' && 'Destaques'}
							{selectedCategory === 'stays' && 'Hospedagens'}
							{selectedCategory === 'transport' && 'Transportes'}
							{selectedCategory === 'packages' && 'Pacotes'}
						</Text>
						<Text
							className="text-sm mt-1"
							style={{ color: colors.text.secondary }}
						>
							{filteredItems.length} {selectedCategory === 'all' ? 'itens selecionados' : 'opções disponíveis'}
						</Text>
					</View>
				</View>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
				>
					{filteredItems.map((item) => (
						<TouchableOpacity
							key={`${item.category}-${item.id}`}
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
									source={{ uri: item.image }}
									className="w-full h-48"
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
								{/* Discount Badge (apenas para pacotes) */}
								{item.discount && (
									<View
										className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex-row items-center"
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
											-{item.discount}
										</Text>
									</View>
								)}
							</View>

							<View className="p-5">
								<Text
									className="text-xl font-bold mb-1"
									style={{ color: colors.text.primary }}
								>
									{item.title}
								</Text>
								<View className="flex-row items-center mb-3">
									<Ionicons name="location" size={14} color={colors.text.secondary} />
									<Text
										className="text-sm ml-1"
										style={{ color: colors.text.secondary }}
									>
										{item.location}
										{item.description && ` · ${item.description}`}
									</Text>
								</View>

								{/* Amenities ou Features */}
								<View className="flex-row flex-wrap gap-2 mb-4">
									{(item.amenities || item.features || []).slice(0, 3).map((feature, index) => (
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
												${item.price}
											</Text>
											<Text
												className="text-sm ml-1"
												style={{ color: colors.text.secondary }}
											>
												{item.category === 'packages' ? '/pessoa' : '/dia'}
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

			{/* Seção de Publicidade 1 */}
			<View className="px-5 mb-6">
				<TouchableOpacity
					activeOpacity={0.9}
					className="rounded-3xl overflow-hidden"
					style={{
						backgroundColor: '#6366F1',
						shadowColor: '#6366F1',
						shadowOffset: { width: 0, height: 6 },
						shadowOpacity: 0.4,
						shadowRadius: 12,
						elevation: 8,
					}}
				>
					<View className="flex-row items-center p-6">
						<View className="flex-1">
							<View className="flex-row items-center mb-2">
								<Ionicons name="flash" size={24} color="#FFFFFF" />
								<Text className="text-sm font-bold text-white ml-2 opacity-90">
									OFERTA RELÂMPAGO
								</Text>
							</View>
							<Text className="text-2xl font-bold text-white mb-2">
								Até 40% OFF
							</Text>
							<Text className="text-white text-base opacity-90 mb-3">
								Em hospedagens selecionadas
							</Text>
							<View
								className="self-start px-4 py-2 rounded-full"
								style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
							>
								<Text className="text-white font-bold text-sm">
									Ver Ofertas →
								</Text>
							</View>
						</View>
						<Text className="text-7xl">🏖️</Text>
					</View>
				</TouchableOpacity>
			</View>

			{/* Experiências Populares - Linhas */}
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

				{experiences.map((exp) => (
					<TouchableOpacity
						key={exp.id}
						activeOpacity={0.7}
						className="rounded-2xl p-4 mb-3 flex-row items-center"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${exp.color}30` : colors.border.light,
							shadowColor: exp.color,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: isDark ? 0.2 : 0.08,
							shadowRadius: 6,
							elevation: 2,
						}}
					>
						<View className="w-14 h-14 rounded-2xl overflow-hidden mr-4" style={{ backgroundColor: `${exp.color}15`, borderWidth: 1.5, borderColor: `${exp.color}30` }}>
							<Image source={{ uri: exp.image }} className="w-full h-full" />
						</View>
						<View className="flex-1">
							<Text
								className="text-base font-bold mb-1"
								style={{ color: colors.text.primary }}
							>
								{exp.title}
							</Text>
							<Text
								className="text-sm"
								style={{ color: colors.text.secondary }}
							>
								{exp.description}
							</Text>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
					</TouchableOpacity>
				))}
			</View>

			{/* Seção de Publicidade 2 */}
			<View className="px-5 mb-6">
				<TouchableOpacity
					activeOpacity={0.9}
					className="rounded-3xl overflow-hidden"
					style={{
						backgroundColor: colors.primary.vivid,
						shadowColor: colors.primary.vivid,
						shadowOffset: { width: 0, height: 6 },
						shadowOpacity: 0.4,
						shadowRadius: 12,
						elevation: 8,
					}}
				>
					<View className="p-6">
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
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}