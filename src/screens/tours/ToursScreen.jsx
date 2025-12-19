import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../contexts';

export default function ToursScreen() {
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
				Passeios
			</Text>
			<Text
				className="text-base mb-6"
				style={{ color: colors.text.secondary }}
			>
				Tours exclusivos pela ilha
			</Text>

			<View
				className="rounded-2xl p-5 border items-center"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
			>
				<Text className="text-5xl mb-3">🚤</Text>
				<Text
					className="text-lg font-semibold mb-2"
					style={{ color: colors.text.primary }}
				>
					Tours Disponíveis
				</Text>
				<Text
					className="text-sm leading-6 text-center"
					style={{ color: colors.text.secondary }}
				>
					Explore praias paradisíacas, mergulhe em águas cristalinas e conheça a cultura local.
				</Text>
			</View>
		</ScrollView>
	);
}
