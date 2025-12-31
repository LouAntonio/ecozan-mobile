import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import apiRequest from '../../scripts/requests';

export default function BookingsScreen() {
	const { colors, isDark } = useTheme();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProvince, setSelectedProvince] = useState('all');
	const [showFilters, setShowFilters] = useState(false);

	// Dados: anfitriões e províncias
	const [hosts, setHosts] = useState([]);
	const [provincesData, setProvincesData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		async function fetchData() {
			setLoading(true);
			setError(null);
			try {
				const [provRes, hostsRes] = await Promise.all([
					apiRequest('/provinces'),
					apiRequest('/hosts'),
				]);

				if (mounted) {
					if (provRes && provRes.success) setProvincesData(provRes.data || []);
					if (hostsRes && hostsRes.success) setHosts(hostsRes.data || []);
					if ((provRes && !provRes.success) || (hostsRes && !hostsRes.success)) {
						setError('Erro ao carregar dados');
					}
				}
			} catch (err) {
				if (mounted) setError('Erro de rede');
			} finally {
				if (mounted) setLoading(false);
			}
		}

		fetchData();
		return () => { mounted = false; };
	}, []);

	// Filtrar anfitriões
	const filteredHosts = hosts.filter(host => {
		const matchesSearch = searchQuery === '' || 
			host.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			host.description?.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesProvince = selectedProvince === 'all' || 
			String(host.location) === String(selectedProvince);
		
		return matchesSearch && matchesProvince;
	});

	// Obter nome da província
	const getProvinceName = (provinceId) => {
		const province = provincesData.find(p => String(p.id) === String(provinceId));
		return province?.name || 'Desconhecida';
	};

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
					Anfitriões
				</Text>
				<Text
					className="text-base mb-5"
					style={{ color: colors.text.secondary }}
				>
					Conheça os anfitriões locais
				</Text>

				{/* Search Bar */}
				<View
					className="flex-row items-center px-4 py-3 rounded-2xl"
					style={{
						backgroundColor: colors.background.primary,
						borderWidth: 1.5,
						borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
					}}
				>
					<Ionicons name="search" size={20} color={colors.text.secondary} />
					<TextInput
						placeholder="Buscar anfitrião..."
						placeholderTextColor={colors.text.secondary}
						className="flex-1 ml-3 text-base"
						style={{ color: colors.text.primary }}
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
					<TouchableOpacity onPress={() => setShowFilters(true)}>
						<Ionicons name="options-outline" size={22} color={colors.primary.vivid} />
					</TouchableOpacity>
				</View>

				{/* Modal de Filtros */}
				<Modal visible={showFilters} animationType="slide" transparent>
					<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 }}>
						<View className="rounded-2xl p-5" style={{ backgroundColor: colors.surface.card }}>
							<View className="flex-row justify-between items-center mb-4">
								<Text className="text-lg font-bold" style={{ color: colors.text.primary }}>Filtros</Text>
								<TouchableOpacity onPress={() => setShowFilters(false)}>
									<Ionicons name="close" size={24} color={colors.text.secondary} />
								</TouchableOpacity>
							</View>

							<Text className="text-sm font-semibold mb-3" style={{ color: colors.text.secondary }}>Província</Text>
							<View className="flex-row flex-wrap mb-4">
								<TouchableOpacity
									onPress={() => setSelectedProvince('all')}
									activeOpacity={0.8}
									className="px-4 py-2 rounded-xl mr-2 mb-2"
									style={{
										backgroundColor: selectedProvince === 'all' ? colors.primary.vivid : colors.background.primary,
										borderWidth: 1.5,
										borderColor: selectedProvince === 'all' ? colors.primary.vivid : colors.border.light
									}}
								>
									<Text style={{ color: selectedProvince === 'all' ? '#FFFFFF' : colors.text.primary }}>Todas</Text>
								</TouchableOpacity>
								{provincesData.map((province) => {
									const isSelected = String(selectedProvince) === String(province.id);
									return (
										<TouchableOpacity
											key={province.id}
											onPress={() => setSelectedProvince(province.id)}
											activeOpacity={0.8}
											className="px-4 py-2 rounded-xl mr-2 mb-2"
											style={{
												backgroundColor: isSelected ? colors.primary.vivid : colors.background.primary,
												borderWidth: 1.5,
												borderColor: isSelected ? colors.primary.vivid : colors.border.light
											}}
										>
											<Text style={{ color: isSelected ? '#FFFFFF' : colors.text.primary }}>{province.name}</Text>
										</TouchableOpacity>
									);
								})}
							</View>

							<View className="flex-row justify-end mt-4 gap-3">
								<TouchableOpacity 
									onPress={() => { 
										setSelectedProvince('all'); 
										setSearchQuery(''); 
									}}
									className="px-4 py-2 rounded-xl"
									style={{ backgroundColor: colors.background.primary }}
								>
									<Text style={{ color: colors.text.secondary, fontWeight: '600' }}>Limpar</Text>
								</TouchableOpacity>
								<TouchableOpacity 
									onPress={() => setShowFilters(false)} 
									className="px-6 py-2 rounded-xl"
									style={{ backgroundColor: colors.primary.vivid }}
								>
									<Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Aplicar</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>

			{/* Estatísticas */}
			<View className="px-5 py-4">
				<View
					className="px-4 py-3 rounded-2xl flex-row items-center justify-between"
					style={{
						backgroundColor: colors.surface.card,
						borderWidth: 1.5,
						borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
					}}
				>
					<View className="flex-row items-center">
						<Ionicons name="people" size={20} color={colors.primary.vivid} />
						<Text className="font-semibold ml-2" style={{ color: colors.text.primary }}>
							{filteredHosts.length} {filteredHosts.length === 1 ? 'anfitrião' : 'anfitriões'}
						</Text>
					</View>
					{selectedProvince !== 'all' && (
						<TouchableOpacity onPress={() => setSelectedProvince('all')}>
							<Text className="text-sm font-medium" style={{ color: colors.primary.vivid }}>
								Ver todos
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>

			{/* Lista de Anfitriões */}
			<View className="px-5 pb-24">
				{loading ? (
					<View className="py-20 items-center">
						<ActivityIndicator size="large" color={colors.primary.vivid} />
						<Text className="mt-3" style={{ color: colors.text.secondary }}>Carregando anfitriões...</Text>
					</View>
				) : error ? (
					<View className="py-20 items-center">
						<View
							className="w-20 h-20 rounded-full items-center justify-center mb-4"
							style={{ backgroundColor: `${colors.primary.vivid}10` }}
						>
							<Ionicons name="alert-circle" size={40} color={colors.primary.vivid} />
						</View>
						<Text className="text-lg font-bold mb-2" style={{ color: colors.text.primary }}>Erro ao carregar</Text>
						<Text style={{ color: colors.text.secondary }}>{error}</Text>
					</View>
				) : filteredHosts.length === 0 ? (
					<View className="py-20 items-center">
						<View
							className="w-24 h-24 rounded-full items-center justify-center mb-4"
							style={{ backgroundColor: `${colors.primary.vivid}10` }}
						>
							<Ionicons name="search" size={48} color={colors.primary.vivid} />
						</View>
						<Text className="text-xl font-bold mb-2" style={{ color: colors.text.primary }}>
							Nenhum anfitrião encontrado
						</Text>
						<Text
							className="text-sm text-center mb-6 px-8"
							style={{ color: colors.text.secondary }}
						>
							Tente ajustar os filtros ou buscar novamente
						</Text>
						<TouchableOpacity
							className="px-6 py-3 rounded-2xl"
							style={{ backgroundColor: colors.primary.vivid }}
							onPress={() => {
								setSelectedProvince('all');
								setSearchQuery('');
							}}
						>
							<Text className="text-white font-bold">Limpar Filtros</Text>
						</TouchableOpacity>
					</View>
				) : (
					filteredHosts.map((host) => (
						<TouchableOpacity
							key={host.id}
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
							{/* Imagem do Anfitrião */}
							<View className="relative">
								<Image 
									source={{ uri: host.image || 'https://via.placeholder.com/400x300' }} 
									className="w-full h-48"
									style={{ resizeMode: 'cover' }}
								/>
								<View
									className="absolute bottom-0 left-0 right-0 px-4 py-3"
									style={{
										backgroundColor: 'rgba(0, 0, 0, 0.6)',
									}}
								>
									<Text className="text-white text-lg font-bold">{host.name}</Text>
									<View className="flex-row items-center mt-1">
										<Ionicons name="location" size={14} color="#FFFFFF" />
										<Text className="text-white text-sm ml-1">{getProvinceName(host.location)}</Text>
									</View>
								</View>
							</View>

							{/* Conteúdo */}
							<View className="p-4">
								<Text 
									className="text-sm leading-5 mb-3"
									style={{ color: colors.text.secondary }}
									numberOfLines={3}
								>
									{host.description || 'Sem descrição disponível.'}
								</Text>

								{/* Informações de contato */}
								{host.email && (
									<View className="flex-row items-center mb-2">
										<Ionicons name="mail-outline" size={16} color={colors.text.secondary} />
										<Text className="text-sm ml-2" style={{ color: colors.text.secondary }}>
											{host.email}
										</Text>
									</View>
								)}
								
								{host.phone && (
									<View className="flex-row items-center mb-3">
										<Ionicons name="call-outline" size={16} color={colors.text.secondary} />
										<Text className="text-sm ml-2" style={{ color: colors.text.secondary }}>
											{host.phone}
										</Text>
									</View>
								)}

								{/* Botão de ação */}
								<TouchableOpacity
									className="px-4 py-3 rounded-2xl flex-row items-center justify-center"
									style={{
										backgroundColor: colors.primary.vivid,
										shadowColor: colors.primary.vivid,
										shadowOffset: { width: 0, height: 3 },
										shadowOpacity: 0.3,
										shadowRadius: 6,
										elevation: 4,
									}}
								>
									<Ionicons name="information-circle-outline" size={18} color="#FFFFFF" />
									<Text className="text-white font-bold ml-2">Ver Detalhes</Text>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					))
				)}
			</View>
		</ScrollView>
	);
}