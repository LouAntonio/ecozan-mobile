import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../contexts';

export default function DiscoverScreen() {
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
				Descubra
			</Text>
			<Text
				className="text-base mb-6"
				style={{ color: colors.text.secondary }}
			>
				Explore as melhores experiências em Zanzibar
			</Text>

			<View
				className="rounded-2xl p-5 border"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
			>
				<Text
					className="text-lg font-semibold mb-2"
					style={{ color: colors.text.primary }}
				>
					🌴 Bem-vindo ao Ecozan
				</Text>
				<Text
					className="text-sm leading-6"
					style={{ color: colors.text.secondary }}
				>
					Descubra passeios incríveis, transporte confortável e hospedagens únicas em Zanzibar.
				</Text>
			</View>
		</ScrollView>
	);
}
