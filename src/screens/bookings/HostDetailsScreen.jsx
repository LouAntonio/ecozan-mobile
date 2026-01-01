import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import apiRequest from '../../scripts/requests';

const { width } = Dimensions.get('window');

export default function HostDetailsScreen({ route, navigation }) {
	const { hostId } = route.params;
	const { colors, isDark } = useTheme();
	const [host, setHost] = useState(null);
	const [bnbs, setBnbs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [provinces, setProvinces] = useState([]);

	useEffect(() => {
		const fetchHostDetails = async () => {
			try {
				setLoading(true);
				const [hostResponse, bnbsResponse, provincesResponse] = await Promise.all([
					apiRequest(`/hosts/${hostId}`),
					apiRequest(`/bnb/host/${hostId}`),
					apiRequest('/provinces')
				]);

				if (hostResponse.success) {
					setHost(hostResponse.data);
				}
				if (bnbsResponse.success) {
					setBnbs(bnbsResponse.data);
				}
				if (provincesResponse.success) {
					setProvinces(provincesResponse.data);
				}
			} catch (error) {
				console.error('Error fetching host details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchHostDetails();
	}, [hostId]);

	// Função para obter o nome da província pelo ID
	const getProvinceName = (locationId) => {
		const province = provinces.find(p => p.id === locationId);
		return province ? province.name : 'Localização não disponível';
	};

	// Função para formatar preço
	const formatPrice = (price) => {
		return new Intl.NumberFormat('pt-AO').format(price);
	};

	// Função para renderizar estrelas de avaliação
	const renderStars = (rating) => {
		const stars = [];
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		for (let i = 0; i < fullStars; i++) {
			stars.push(<Ionicons key={`full-${i}`} name="star" size={14} color="#FFD700" />);
		}
		if (hasHalfStar) {
			stars.push(<Ionicons key="half" name="star-half" size={14} color="#FFD700" />);
		}
		const remainingStars = 5 - stars.length;
		for (let i = 0; i < remainingStars; i++) {
			stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#FFD700" />);
		}
		return stars;
	};

	if (loading) {
		return (
			<View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background.primary }}>
				<ActivityIndicator size="large" color={colors.primary.vivid} />
				<Text className="mt-4 text-base" style={{ color: colors.text.secondary }}>
					Carregando detalhes...
				</Text>
			</View>
		);
	}

	if (!host) {
		return (
			<View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background.primary }}>
				<Ionicons name="alert-circle" size={64} color={colors.primary.vivid} />
				<Text className="mt-4 text-lg font-bold" style={{ color: colors.text.primary }}>
					Anfitrião não encontrado
				</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 mb-16" style={{ backgroundColor: colors.background.primary }}>
			{/* Header com imagem */}
			<View className="relative">
				<Image 
					source={{ uri: host.image || 'https://via.placeholder.com/400x300' }}
					style={{ width: width, height: 280 }}
					resizeMode="cover"
				/>
				
				{/* Botão de voltar */}
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="absolute top-12 left-5 p-3 rounded-full"
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						shadowColor: '#000',
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 4,
						elevation: 5,
					}}
				>
					<Ionicons name="arrow-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>

				{/* Gradiente overlay */}
				<View
					className="absolute bottom-0 left-0 right-0 px-5 py-6"
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
					}}
				>
					<Text className="text-white text-3xl font-bold mb-2">
						{host.name}
					</Text>
					<View className="flex-row items-center">
						<Ionicons name="location" size={16} color="#FFFFFF" />
						<Text className="text-white text-base ml-2">
							{getProvinceName(host.location)}
						</Text>
					</View>
				</View>
			</View>

			<ScrollView 
				className="flex-1"
				showsVerticalScrollIndicator={false}
			>
				{/* Informações do Anfitrião */}
				<View className="px-5 py-6">
					{/* Descrição */}
					<View
						className="p-5 rounded-3xl mb-4"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.05,
							shadowRadius: 8,
							elevation: 2,
						}}
					>
						<View className="flex-row items-center mb-3">
							<Ionicons name="information-circle" size={22} color={colors.primary.vivid} />
							<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
								Sobre
							</Text>
						</View>
						<Text className="text-base leading-6" style={{ color: colors.text.secondary }}>
							{host.description || 'Sem descrição disponível.'}
						</Text>
					</View>

					{/* Contatos */}
					<View
						className="p-5 rounded-3xl mb-4"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.05,
							shadowRadius: 8,
							elevation: 2,
						}}
					>
						<View className="flex-row items-center mb-4">
							<Ionicons name="call" size={22} color={colors.primary.vivid} />
							<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
								Contato
							</Text>
						</View>
						
						{host.email && (
							<View className="flex-row items-center mb-3">
								<View
									className="w-10 h-10 rounded-full items-center justify-center mr-3"
									style={{ backgroundColor: `${colors.primary.vivid}15` }}
								>
									<Ionicons name="mail-outline" size={20} color={colors.primary.vivid} />
								</View>
								<View className="flex-1">
									<Text className="text-xs mb-1" style={{ color: colors.text.secondary }}>Email</Text>
									<Text className="text-base font-medium" style={{ color: colors.text.primary }}>
										{host.email}
									</Text>
								</View>
							</View>
						)}
						
						{host.phone && (
							<View className="flex-row items-center">
								<View
									className="w-10 h-10 rounded-full items-center justify-center mr-3"
									style={{ backgroundColor: `${colors.primary.vivid}15` }}
								>
									<Ionicons name="call-outline" size={20} color={colors.primary.vivid} />
								</View>
								<View className="flex-1">
									<Text className="text-xs mb-1" style={{ color: colors.text.secondary }}>Telefone</Text>
									<Text className="text-base font-medium" style={{ color: colors.text.primary }}>
										{host.phone}
									</Text>
								</View>
							</View>
						)}
					</View>

					{/* Lista de BNBs */}
					<View
						className="p-5 rounded-3xl mb-6"
						style={{
							backgroundColor: colors.surface.card,
							borderWidth: 1.5,
							borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.05,
							shadowRadius: 8,
							elevation: 2,
						}}
					>
						<View className="flex-row items-center justify-between mb-4">
							<View className="flex-row items-center">
								<Ionicons name="bed" size={22} color={colors.primary.vivid} />
								<Text className="text-lg font-bold ml-2" style={{ color: colors.text.primary }}>
									Acomodações
								</Text>
							</View>
							<View
								className="px-3 py-1 rounded-full"
								style={{ backgroundColor: `${colors.primary.vivid}15` }}
							>
								<Text className="font-bold" style={{ color: colors.primary.vivid }}>
									{bnbs.length}
								</Text>
							</View>
						</View>

						{bnbs.length === 0 ? (
							<View className="items-center py-8">
								<Ionicons name="home-outline" size={48} color={colors.text.secondary} style={{ opacity: 0.5 }} />
								<Text className="text-base mt-3" style={{ color: colors.text.secondary }}>
									Nenhuma acomodação disponível
								</Text>
							</View>
						) : (
							bnbs.map((bnb, index) => (
								<TouchableOpacity
									key={bnb.id}
									onPress={() => navigation.navigate('BnbDetails', { bnbId: bnb.id })}
									activeOpacity={0.8}
									className="rounded-2xl overflow-hidden"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1,
										borderColor: isDark ? `${colors.primary.vivid}10` : colors.border.light,
										marginBottom: index < bnbs.length - 1 ? 12 : 0,
									}}
								>
									<View className="flex-row">
										{/* Imagem */}
										<Image 
											source={{ uri: bnb.image || 'https://via.placeholder.com/120x120' }}
											style={{ width: 120, height: 120 }}
											resizeMode="cover"
										/>
										
										{/* Conteúdo */}
										<View className="flex-1 p-3 justify-between">
											<View>
												<Text 
													className="text-base font-bold mb-1" 
													style={{ color: colors.text.primary }}
													numberOfLines={2}
												>
													{bnb.name}
												</Text>
												<Text 
													className="text-sm mb-2" 
													style={{ color: colors.text.secondary }}
													numberOfLines={2}
												>
													{bnb.description}
												</Text>
											</View>
											
											{/* Avaliação e Preço */}
											<View>
												{bnb.evals && (
													<View className="flex-row items-center mb-1">
														{renderStars(bnb.evals)}
														<Text className="text-xs ml-2 font-medium" style={{ color: colors.text.secondary }}>
															{bnb.evals.toFixed(1)}
														</Text>
													</View>
												)}
												<View className="flex-row items-baseline">
													<Text className="text-lg font-bold" style={{ color: colors.primary.vivid }}>
														{formatPrice(bnb.price)} Kz
													</Text>
													<Text className="text-xs ml-1" style={{ color: colors.text.secondary }}>
														{bnb.price_modality}
													</Text>
												</View>
											</View>
										</View>
									</View>
								</TouchableOpacity>
							))
						)}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
