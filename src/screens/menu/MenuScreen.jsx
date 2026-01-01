import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../scripts/requests';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';

export default function MenuScreen() {
	const { colors, isDark, toggleTheme } = useTheme();

	// Dados do usuário (carregados do AsyncStorage se disponível)
	const [user, setUser] = useState({
		name: 'João Silva',
		email: 'joao.silva@email.com',
		avatar: 'https://avatars.dicebear.com/api/identicon/default.png',
		memberSince: 'Membro desde 2024',
		completedBookings: 5,
		completedStays: 12,
		completedTransports: 7,
		verified: true,
	});

	useEffect(() => {
		const loadUser = async () => {
			try {
				const stored = await AsyncStorage.getItem('user');
				if (stored) {
					const u = JSON.parse(stored);
					setUser(prev => ({
						...prev,
						name: u.name ? (u.surname ? `${u.name} ${u.surname}` : u.name) : prev.name,
						email: u.email || prev.email,
						avatar: u.avatar || `https://avatars.dicebear.com/api/identicon/${encodeURIComponent(u.email || 'default')}.png`,
						memberSince: u.registered ? `Membro desde ${new Date(u.registered).getFullYear()}` : prev.memberSince,
					}));
				}
			} catch (err) {
				console.warn('Erro ao carregar usuário:', err);
			}
		};

		loadUser();
	}, []);

	function confirmLogout() {
		Alert.alert(
			'Encerrar sessão',
			'Deseja realmente encerrar a sessão?',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{ text: 'Sair', onPress: () => { handleLogout(); } },
			],
			{ cancelable: true }
		);
	}

	async function handleLogout() {
		try {
			// Call backend logout
			await apiRequest('/users/logout', 'POST');
		} catch (err) {
			console.warn('Logout API error:', err);
		}

		try {
			await AsyncStorage.removeItem('token');
			await AsyncStorage.removeItem('user');
			// O App.jsx detectará automaticamente a ausência do token
		} catch (err) {
			console.warn('Erro ao limpar AsyncStorage:', err);
		}
	}

	const menuSections = [
		{
			title: 'Conta',
			items: [
				{ 
					icon: 'person-outline', 
					title: 'Meu Perfil', 
					subtitle: 'Editar informações pessoais', 
					badge: null,
					color: '#3B82F6',
				},
				{ 
					icon: 'shield-checkmark-outline', 
					title: 'Segurança', 
					subtitle: 'Senha e autenticação', 
					badge: null,
					color: '#10B981',
				},
				{ 
					icon: 'card-outline', 
					title: 'Pagamentos', 
					subtitle: 'Métodos de pagamento', 
					badge: '2',
					color: '#F59E0B',
				},
			],
		},
		{
			title: 'Preferências',
			items: [
				{ 
					icon: 'heart-outline', 
					title: 'Favoritos', 
					subtitle: 'Passeios e hospedagens salvos', 
					badge: '8',
					color: '#EF4444',
				},
				{ 
					icon: 'notifications-outline', 
					title: 'Notificações', 
					subtitle: 'Configurar alertas', 
					badge: null,
					color: '#06B6D4',
				},
				{ 
					icon: 'globe-outline', 
					title: 'Idioma', 
					subtitle: 'Português (PT)', 
					badge: null,
					color: '#EC4899',
				},
			],
		},
		{
			title: 'Suporte',
			items: [
				{ 
					icon: 'chatbubbles-outline', 
					title: 'Chat ao Vivo', 
					subtitle: 'Fale com nosso time', 
					badge: null,
					color: '#10B981',
				},
				{ 
					icon: 'help-circle-outline', 
					title: 'Central de Ajuda', 
					subtitle: 'FAQ e suporte', 
					badge: null,
					color: '#3B82F6',
				},
				{ 
					icon: 'star-outline', 
					title: 'Avaliar App', 
					subtitle: 'Deixe sua opinião', 
					badge: null,
					color: '#F59E0B',
				},
				{ 
					icon: 'mail-outline', 
					title: 'Feedback', 
					subtitle: 'Envie sugestões', 
					badge: null,
					color: '#8B5CF6',
				},
			],
		},
		{
			title: 'Legal',
			items: [
				{ 
					icon: 'document-text-outline', 
					title: 'Termos de Uso', 
					subtitle: 'Políticas e condições', 
					badge: null,
					color: '#6B7280',
				},
				{ 
					icon: 'lock-closed-outline', 
					title: 'Privacidade', 
					subtitle: 'Política de privacidade', 
					badge: null,
					color: '#6B7280',
				},
				{ 
					icon: 'log-out-outline', 
					title: 'Sair da Conta', 
					subtitle: 'Fazer logout', 
					badge: null, 
					danger: true,
					color: '#EF4444',
				},
			],
		},
	];

	return (
		<ScrollView
			className="flex-1"
			style={{ backgroundColor: colors.background.primary }}
			showsVerticalScrollIndicator={false}
		>
			{/* Header com perfil */}
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
				<View className="flex-row items-center mb-5">
					<View className="relative">
						<Image
							source={{ uri: user.avatar }}
							className="w-20 h-20 rounded-full"
							style={{
								borderWidth: 3,
								borderColor: colors.primary.vivid,
							}}
						/>
						{user.verified && (
							<View
								className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full items-center justify-center"
								style={{
									backgroundColor: colors.primary.vivid,
									borderWidth: 2,
									borderColor: colors.surface.card,
								}}
							>
								<Ionicons name="checkmark" size={16} color="#FFFFFF" />
							</View>
						)}
					</View>

					<View className="flex-1 ml-4">
						<View className="mb-1">
							<View className="flex-row items-center">
								<Text
									className="text-2xl font-bold"
									style={{ color: colors.text.primary }}
								>
									{user.name}
								</Text>
							</View>
							<Text
								className="text-sm mb-2"
								style={{ color: colors.text.secondary }}
							>
								{user.email}
							</Text>
						</View>

						<View className="flex-row items-center">
							<Ionicons name="calendar-outline" size={12} color={colors.text.secondary} />
							<Text
								className="text-xs ml-1"
								style={{ color: colors.text.secondary }}
							>
								{user.memberSince}
							</Text>
						</View>
					</View>

					<TouchableOpacity
						className="w-10 h-10 rounded-full items-center justify-center"
						style={{
							backgroundColor: isDark ? `${colors.primary.vivid}15` : colors.background.primary,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}30` : colors.border.light,
						}}
					>
						<Ionicons name="create-outline" size={20} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>

				{/* Stats rápidas: Viagens, Hospedagens, Transportes */}
				<View className="flex-row gap-3">
					<View
						className="flex-1 rounded-2xl p-4"
						style={{
							backgroundColor: colors.background.primary,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="calendar" size={20} color={colors.primary.vivid} style={{ marginBottom: 4 }} />
						<Text
							className="text-2xl font-bold mb-0.5"
							style={{ color: colors.text.primary }}
						>
							{user.completedBookings}
						</Text>
						<Text
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							Viagens
						</Text>
					</View>

					<View
						className="flex-1 rounded-2xl p-4"
						style={{
							backgroundColor: colors.background.primary,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="home" size={20} color={colors.primary.vivid} style={{ marginBottom: 4 }} />
						<Text
							className="text-2xl font-bold mb-0.5"
							style={{ color: colors.text.primary }}
						>
							{user.completedStays}
						</Text>
						<Text
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							Hospedagens
						</Text>
					</View>

					<View
						className="flex-1 rounded-2xl p-4"
						style={{
							backgroundColor: colors.background.primary,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						}}
					>
						<Ionicons name="car" size={20} color={colors.primary.vivid} style={{ marginBottom: 4 }} />
						<Text
							className="text-2xl font-bold mb-0.5"
							style={{ color: colors.text.primary }}
						>
							{user.completedTransports}
						</Text>
						<Text
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							Transportes
						</Text>
					</View>
				</View>
			</View>

			<View className="px-5 py-6">
				{/* Toggle de Tema */}
				<TouchableOpacity
					className="rounded-2xl p-4 flex-row items-center justify-between mb-6"
					style={{
						backgroundColor: colors.surface.card,
						borderWidth: 1.5,
						borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
						shadowColor: isDark ? colors.primary.vivid : '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: isDark ? 0.2 : 0.05,
						shadowRadius: 6,
						elevation: 2,
					}}
					onPress={toggleTheme}
					activeOpacity={0.7}
				>
					<View className="flex-row items-center">
						<View
							className="w-12 h-12 rounded-full items-center justify-center mr-3"
							style={{
								backgroundColor: isDark ? `${colors.primary.vivid}15` : colors.background.primary,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}30` : colors.border.light,
							}}
						>
							<Ionicons 
								name={isDark ? 'moon' : 'sunny'} 
								size={24} 
								color={colors.primary.vivid} 
							/>
						</View>
						<View>
							<Text
								className="text-base font-bold"
								style={{ color: colors.text.primary }}
							>
								Tema
							</Text>
							<Text
								className="text-sm mt-0.5"
								style={{ color: colors.text.secondary }}
							>
								{isDark ? 'Modo Escuro' : 'Modo Claro'}
							</Text>
						</View>
					</View>
					<View
						className="w-14 h-8 rounded-full justify-center px-1"
						style={{
							backgroundColor: isDark ? colors.primary.vivid : `${colors.border.light}80`,
						}}
					>
						<View
							className={`w-6 h-6 rounded-full bg-white shadow ${isDark ? 'self-end' : ''}`}
							style={{
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.2,
								shadowRadius: 3,
								elevation: 3,
							}}
						/>
					</View>
				</TouchableOpacity>

				{/* Seções do menu */}
				{menuSections.map((section, sectionIndex) => (
					<View key={sectionIndex} className="mb-6">
						<Text
							className="text-xs font-bold mb-3 px-2"
							style={{ color: colors.text.secondary }}
						>
							{section.title.toUpperCase()}
						</Text>

						<View
							className="rounded-2xl overflow-hidden"
							style={{
								backgroundColor: colors.surface.card,
								borderWidth: 1.5,
								borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							}}
						>
							{section.items.map((item, itemIndex) => (
								<TouchableOpacity
									key={itemIndex}
									className="flex-row items-center p-4"
									onPress={() => {
										if (item.danger) {
											confirmLogout();
										}
									}}
									style={{
										borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0,
										borderBottomColor: isDark ? `${colors.primary.vivid}10` : colors.border.light,
									}}
									activeOpacity={0.7}
								>
									<View
										className="w-11 h-11 rounded-full items-center justify-center mr-3"
										style={{
											backgroundColor: item.danger
												? '#FEE2E2'
												: isDark
												? `${item.color}15`
												: `${item.color}10`,
											borderWidth: 1.5,
											borderColor: item.danger
												? '#FCA5A5'
												: `${item.color}30`,
										}}
									>
										<Ionicons 
											name={item.icon} 
											size={22} 
											color={item.danger ? '#EF4444' : item.color} 
										/>
									</View>

									<View className="flex-1">
										<Text
											className="text-base font-semibold"
											style={{
												color: item.danger
													? '#EF4444'
													: colors.text.primary
											}}
										>
											{item.title}
										</Text>
										<Text
											className="text-sm mt-0.5"
											style={{ color: colors.text.secondary }}
										>
											{item.subtitle}
										</Text>
									</View>

									{item.badge && (
										<View
											className="px-2.5 py-1 rounded-full mr-2"
											style={{
												backgroundColor: item.badge === 'Novo'
													? colors.primary.vivid
													: isDark
													? `${colors.primary.vivid}20`
													: colors.background.primary,
												borderWidth: item.badge === 'Novo' ? 0 : 1,
												borderColor: colors.border.light,
											}}
										>
											<Text
												className="text-xs font-bold"
												style={{
													color: item.badge === 'Novo'
														? '#FFFFFF'
														: colors.text.primary,
												}}
											>
												{item.badge}
											</Text>
										</View>
									)}

									<Ionicons 
										name="chevron-forward" 
										size={20} 
										color={colors.text.secondary} 
									/>
								</TouchableOpacity>
							))}
						</View>
					</View>
				))}
				{/* Redes sociais */}
				<View className="items-center mb-6">
					<Text
						className="text-sm font-bold mb-4"
						style={{ color: colors.text.secondary }}
					>
						Siga-nos
					</Text>
					<View className="flex-row gap-3">
						{[
							{ icon: 'logo-facebook', color: '#1877F2' },
							{ icon: 'logo-instagram', color: '#E4405F' },
							{ icon: 'logo-twitter', color: '#1DA1F2' },
						].map((social, index) => (
							<TouchableOpacity
								key={index}
								className="w-12 h-12 rounded-full items-center justify-center"
								style={{
									backgroundColor: isDark ? `${social.color}15` : colors.surface.card,
									borderWidth: 1.5,
									borderColor: isDark ? `${social.color}30` : colors.border.light,
								}}
								activeOpacity={0.7}
							>
								<Ionicons name={social.icon} size={24} color={social.color} />
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* App Version */}
				<View className="items-center pb-24">
					<Text
						className="text-xs font-semibold"
						style={{ color: colors.text.secondary }}
					>
						Ecozan v1.0.0
					</Text>
					<View className="flex-row items-center mt-2">
						<Text
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							Feito com
						</Text>
						<Ionicons name="heart" size={12} color="#EF4444" style={{ marginHorizontal: 4 }} />
						<Text
							className="text-xs"
							style={{ color: colors.text.secondary }}
						>
							em Angola
						</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
