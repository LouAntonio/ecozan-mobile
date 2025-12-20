import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const transportOptions = [
	{
		id: 'airport',
		icon: 'airplane',
		title: 'Transfer Aeroporto',
		description: 'Traslado confortável do aeroporto ao hotel',
		color: '#3B82F6',
	},
	{
		id: 'city',
		icon: 'car-sport',
		title: 'Transporte Urbano',
		description: 'Deslocamentos pela cidade com motorista',
		color: '#10B981',
	},
	{
		id: 'tour',
		icon: 'bus',
		title: 'Excursões',
		description: 'Transporte para passeios e atrações',
		color: '#F59E0B',
	},
	{
		id: 'premium',
		icon: 'diamond',
		title: 'Serviço Premium',
		description: 'Veículos executivos para maior conforto',
		color: '#8B5CF6',
	},
];

const features = [
	{ icon: 'shield-checkmark', text: 'Seguro e confiável' },
	{ icon: 'time', text: 'Pontualidade garantida' },
	{ icon: 'star', text: 'Motoristas qualificados' },
	{ icon: 'card', text: 'Pagamento facilitado' },
];

export default function TransportScreen() {
	const { colors, isDark } = useTheme();

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View className="mb-6">
				<Text
					className="text-[32px] font-bold mb-2"
					style={{ color: colors.text.primary }}
				>
					Transporte
				</Text>
				<Text
					className="text-base leading-6"
					style={{ color: colors.text.secondary }}
				>
					Viaje com conforto, segurança e pontualidade para qualquer destino
				</Text>
			</View>

			{/* Transport Options Grid */}
			<View className="mb-6">
				{transportOptions.map((option, index) => (
					<TouchableOpacity
						key={option.id}
						activeOpacity={0.7}
						className="rounded-2xl p-5 mb-4"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${option.color}30` : `${colors.border.light}`,
							shadowColor: option.color,
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: isDark ? 0.3 : 0.1,
							shadowRadius: 8,
							elevation: 3,
						}}
					>
						<View className="flex-row items-center">
							{/* Icon Circle */}
							<View
								className="w-14 h-14 rounded-full items-center justify-center mr-4"
								style={{
									backgroundColor: `${option.color}15`,
									borderWidth: 1.5,
									borderColor: `${option.color}30`,
								}}
							>
								<Ionicons name={option.icon} size={28} color={option.color} />
							</View>

							{/* Content */}
							<View className="flex-1">
								<Text
									className="text-lg font-bold mb-1"
									style={{ color: colors.text.primary }}
								>
									{option.title}
								</Text>
								<Text
									className="text-sm leading-5"
									style={{ color: colors.text.secondary }}
								>
									{option.description}
								</Text>
							</View>

							{/* Arrow */}
							<Ionicons 
								name="chevron-forward" 
								size={20} 
								color={colors.text.secondary} 
							/>
						</View>
					</TouchableOpacity>
				))}
			</View>

			{/* Features Section */}
			<View
				className="rounded-2xl p-5 mb-6"
				style={{
					backgroundColor: isDark ? `${colors.primary.vivid}10` : `${colors.primary.vivid}08`,
					borderWidth: 1.5,
					borderColor: isDark ? `${colors.primary.vivid}25` : `${colors.primary.vivid}15`,
				}}
			>
				<Text
					className="text-lg font-bold mb-4"
					style={{ color: colors.text.primary }}
				>
					Por que escolher nosso transporte?
				</Text>

				<View className="gap-3">
					{features.map((feature, index) => (
						<View key={index} className="flex-row items-center">
							<View
								className="w-9 h-9 rounded-full items-center justify-center mr-3"
								style={{ backgroundColor: `${colors.primary.vivid}15` }}
							>
								<Ionicons 
									name={feature.icon} 
									size={18} 
									color={colors.primary.vivid} 
								/>
							</View>
							<Text
								className="text-base font-medium flex-1"
								style={{ color: colors.text.primary }}
							>
								{feature.text}
							</Text>
						</View>
					))}
				</View>
			</View>

			{/* CTA Button */}
			<TouchableOpacity
				activeOpacity={0.8}
				className="rounded-2xl py-4 items-center"
				style={{
					backgroundColor: colors.primary.vivid,
					shadowColor: colors.primary.vivid,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.3,
					shadowRadius: 8,
					elevation: 5,
				}}
			>
				<View className="flex-row items-center">
					<Ionicons name="calendar" size={20} color="#FFFFFF" />
					<Text className="text-white text-base font-bold ml-2">
						Solicitar Transporte
					</Text>
				</View>
			</TouchableOpacity>
		</ScrollView>
	);
}