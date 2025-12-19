import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../contexts';

export default function TransportScreen() {
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
				Transporte
			</Text>
			<Text
				className="text-base mb-6"
				style={{ color: colors.text.secondary }}
			>
				Viaje com conforto e segurança
			</Text>

			<View
				className="rounded-2xl p-5 border items-center"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
			>
				<Text className="text-5xl mb-3">🚐</Text>
				<Text
					className="text-lg font-semibold mb-2"
					style={{ color: colors.text.primary }}
				>
					Transfers & Transportes
				</Text>
				<Text
					className="text-sm leading-6 text-center"
					style={{ color: colors.text.secondary }}
				>
					Do aeroporto ao hotel, entre cidades ou para seus passeios. Transporte confiável e pontual.
				</Text>
			</View>
		</ScrollView>
	);
}
