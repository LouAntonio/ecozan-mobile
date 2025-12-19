import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts';

export default function MenuScreen() {
	const { colors, isDark, toggleTheme } = useTheme();

	const menuItems = [
		{ icon: '👤', title: 'Meu Perfil', subtitle: 'Editar informações pessoais' },
		{ icon: '🏠', title: 'Hospedagens', subtitle: 'Nossas acomodações' },
		{ icon: '❤️', title: 'Favoritos', subtitle: 'Passeios salvos' },
		{ icon: '🔔', title: 'Notificações', subtitle: 'Configurar alertas' },
		{ icon: '🌍', title: 'Idioma', subtitle: 'Português (BR)' },
		{ icon: '❓', title: 'Ajuda', subtitle: 'FAQ e suporte' },
		{ icon: '📄', title: 'Termos de Uso', subtitle: 'Políticas e privacidade' },
	];

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			contentContainerClassName="p-5 pb-10"
		>
			<Text
				className="text-[28px] font-bold mb-2"
				style={{ color: colors.text.primary }}
			>
				Menu
			</Text>
			<Text
				className="text-base mb-6"
				style={{ color: colors.text.secondary }}
			>
				Configurações e preferências
			</Text>

			{/* Toggle de Tema */}
			<TouchableOpacity
				className="rounded-2xl p-4 border flex-row items-center justify-between mb-5"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
				onPress={toggleTheme}
				activeOpacity={0.7}
			>
				<View className="flex-row items-center">
					<Text className="text-2xl mr-3">{isDark ? '🌙' : '☀️'}</Text>
					<View>
						<Text
							className="text-base font-semibold"
							style={{ color: colors.text.primary }}
						>
							Tema
						</Text>
						<Text
							className="text-[13px] mt-0.5"
							style={{ color: colors.text.secondary }}
						>
							{isDark ? 'Modo Escuro' : 'Modo Claro'}
						</Text>
					</View>
				</View>
				<View
					className="w-[50px] h-7 rounded-full justify-center px-0.5"
					style={{ backgroundColor: isDark ? colors.primary.vivid : colors.border.light }}
				>
					<View
						className={`w-6 h-6 rounded-full bg-white ${isDark ? 'self-end' : ''}`}
					/>
				</View>
			</TouchableOpacity>

			{/* Menu Items */}
			<View
				className="rounded-2xl border overflow-hidden"
				style={{
					backgroundColor: colors.surface.card,
					borderColor: colors.border.light
				}}
			>
				{menuItems.map((item, index) => (
					<TouchableOpacity
						key={index}
						className="flex-row items-center p-4"
						style={{
							borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
							borderBottomColor: colors.border.light
						}}
						activeOpacity={0.7}
					>
						<Text className="text-2xl mr-3">{item.icon}</Text>
						<View className="flex-1">
							<Text
								className="text-base font-medium"
								style={{ color: colors.text.primary }}
							>
								{item.title}
							</Text>
							<Text
								className="text-[13px] mt-0.5"
								style={{ color: colors.text.secondary }}
							>
								{item.subtitle}
							</Text>
						</View>
						<Text
							className="text-2xl"
							style={{ color: colors.text.muted }}
						>
							›
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* App Version */}
			<Text
				className="text-center text-xs mt-6"
				style={{ color: colors.text.muted }}
			>
				Ecozan v1.0.0
			</Text>
		</ScrollView>
	);
}
