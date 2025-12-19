import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../contexts';

export default function BookingsScreen() {
	const { colors } = useTheme();

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			contentContainerClassName="p-5"
		>
			<Text
				className="text-[28px] font-bold mb-2"
				style={{ color: colors.text.primary }}
			>
				Reservas
			</Text>
			<Text
				className="text-base mb-6"
				style={{ color: colors.text.secondary }}
			>
				Suas reservas e hospedagens
			</Text>

			<View
				className="rounded-2xl p-5 border items-center mb-5"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
			>
				<Text className="text-5xl mb-3">🏠</Text>
				<Text
					className="text-lg font-semibold mb-2"
					style={{ color: colors.text.primary }}
				>
					Minhas Reservas
				</Text>
				<Text
					className="text-sm leading-6 text-center"
					style={{ color: colors.text.secondary }}
				>
					Gerencie suas reservas de passeios, transportes e hospedagens em um só lugar.
				</Text>
			</View>

			<View className="items-center py-10">
				<Text className="text-6xl mb-4">📋</Text>
				<Text
					className="text-base font-semibold mb-2"
					style={{ color: colors.text.primary }}
				>
					Você ainda não tem reservas
				</Text>
				<Text
					className="text-sm text-center"
					style={{ color: colors.text.muted }}
				>
					Explore nossos passeios e faça sua primeira reserva!
				</Text>
			</View>
		</ScrollView>
	);
}
