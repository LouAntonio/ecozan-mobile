import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import apiRequest from '../../scripts/requests';

export default function DiscoverScreen() {
	const { colors, isDark } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState('all');

	// Dados das categorias (removido 'tours')
	const categories = [
		{ id: 'all', label: 'Tudo', icon: 'globe-outline' },
		{ id: 'stays', label: 'Hospedagem', icon: 'bed-outline' },
		{ id: 'transport', label: 'Transporte', icon: 'car-outline' },
		{ id: 'packages', label: 'Pacotes Turísticos', icon: 'map-outline' },
	];

	// Hospedagens (serão carregadas do backend)
	const [hosts, setHosts] = useState([]);
	const [bnbList, setBnbList] = useState([]);
	const [provinces, setProvinces] = useState([]);
	const [loadingStays, setLoadingStays] = useState(false);
	const [tours, setTours] = useState([]);
	const [loadingTours, setLoadingTours] = useState(false);

	useEffect(() => {
		let mounted = true;
		const loadData = async () => {
			setLoadingStays(true);
			try {
				const [hostsRes, bnbRes, provincesRes] = await Promise.all([
					apiRequest('/hosts'),
					apiRequest('/bnb'),
					apiRequest('/provinces'),
				]);

				if (!mounted) return;

				setHosts(Array.isArray(hostsRes?.data) ? hostsRes.data : []);
				setBnbList(Array.isArray(bnbRes?.data) ? bnbRes.data : []);
				setProvinces(Array.isArray(provincesRes?.data) ? provincesRes.data : []);
			} catch (err) {
				console.warn('Erro carregando hospedagens:', err);
			} finally {
				if (mounted) setLoadingStays(false);
			}
		};

		loadData();
		return () => { mounted = false; };
	}, []);

	// Carrega tours da API
	useEffect(() => {
		let mounted = true;
		const loadTours = async () => {
			setLoadingTours(true);
			try {
				const toursRes = await apiRequest('/tours');
				if (!mounted) return;
				setTours(Array.isArray(toursRes?.data) ? toursRes.data : []);
			} catch (err) {
				console.warn('Erro carregando tours:', err);
			} finally {
				if (mounted) setLoadingTours(false);
			}
		};

		loadTours();
		return () => { mounted = false; };
	}, []);

	// Transportes
	const transports = [
		{
			id: 1,
			category: 'transport',
			title: 'Transfer Aeroporto - Luanda VIP',
			image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
			price: '4500',
			rating: 5.0,
			location: 'Aeroporto 4 de Fevereiro, Luanda',
			amenities: ['Conforto', 'Pontual', 'Seguro'],
		},
		{
			id: 2,
			category: 'transport',
			title: 'Aluguel de 4x4 - Benguela',
			image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
			price: '12000',
			rating: 4.8,
			location: 'Benguela',
			amenities: ['4x4', 'GPS', 'Seguro Total'],
		},
		{
			id: 3,
			category: 'transport',
			title: 'Motorista Privado - Dia Completo',
			image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
			price: '10000',
			rating: 4.9,
			location: 'Luanda e arredores',
			amenities: ['Guia Local', 'Flexível', 'Wi-Fi'],
		},
	];

	// Pacotes estáticos (fallback)
	const staticPackages = [
		{
			id: 1,
			category: 'packages',
			title: 'Pacote Romântico - Mussulo',
			description: '4 dias · Villa + Passeios + Transfer',
			image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
			price: '195000',
			discount: '15%',
			rating: 5.0,
			location: 'Ilha do Mussulo, Luanda',
			features: ['Villa Privativa', 'Jantar Romântico', 'Spa Incluído'],
		},
		{
			id: 2,
			category: 'packages',
			title: 'Aventura Benguela & Lobito',
			description: '6 dias · Hotel + Tours + Carro',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			price: '320000',
			discount: '20%',
			rating: 4.9,
			location: 'Benguela & Lobito',
			features: ['Hotel 4 Estrelas', 'Carro Incluso', 'Guia Turístico'],
		},
		{
			id: 3,
			category: 'packages',
			title: 'Família Luanda & Mussulo',
			description: '5 dias · Resort + Atividades + Meals',
			image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
			price: '250000',
			discount: '18%',
			rating: 4.8,
			location: 'Luanda',
			features: ['All Inclusive', 'Kids Club', 'Atividades Aquáticas'],
		},
	];

	// Mapeador de tours da API para o formato da UI
	const mapTourToItem = (tour) => {
		let gallery = [];
		if (tour.galery) {
			try {
				gallery = typeof tour.galery === 'string' ? JSON.parse(tour.galery) : tour.galery;
			} catch (e) {
				gallery = [];
			}
		}

		const provinceObj = provinces.find((p) => p.id === tour.location);

		return {
			id: tour.id,
			category: 'packages',
			title: tour.name,
			description: tour.duration || tour.description || '',
			image: tour.image || (gallery && gallery[0]) || null,
			price: tour.price,
			discount: null,
			rating: tour.eval ?? tour.evals ?? null,
			location: provinceObj?.name || String(tour.location) || '',
			features: [],
			_raw: { tour, gallery },
		};
	};

	// Experiências populares: derive 3 aleatórias dos pacotes (API ou fallback estático)
	const getRandomSlice = (arr, n) => {
		if (!Array.isArray(arr) || arr.length === 0) return [];
		const copy = [...arr];
		for (let i = copy.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[copy[i], copy[j]] = [copy[j], copy[i]];
		}
		return copy.slice(0, n);
	};

	const popularExperiences = (() => {
		const apiPackages = Array.isArray(tours) && tours.length ? tours.map(mapTourToItem) : [];
		const source = apiPackages.length ? apiPackages : staticPackages;
		const chosen = getRandomSlice(source, 3);
		return chosen.map((it, idx) => ({
			id: `${it.category || 'pkg'}-${it.id}-${idx}`,
			title: it.title,
			image: it.image,
			color: '#3B82F6',
			description: it.description || it.location || '',
			_item: it,
		}));
	})();
	// Função para filtrar itens
	const mapBnbToItem = (bnb) => {
		// resolve host and province name
		const hostId = bnb.host || bnb.hosts?.id || null;
		const hostObj = hosts.find((h) => h.id === hostId) || bnb.hosts || null;
		const provinceObj = hostObj ? provinces.find((p) => p.id === hostObj.location) : null;

		// parse gallery if string
		let gallery = [];
		if (bnb.gallery) {
			try {
				gallery = typeof bnb.gallery === 'string' ? JSON.parse(bnb.gallery) : bnb.gallery;
			} catch (e) {
				gallery = [];
			}
		}

		return {
			id: bnb.id,
			category: 'stays',
			title: bnb.name,
			image: bnb.image || (gallery && gallery[0]) || null,
			price: bnb.price,
			rating: bnb.evals,
			location: provinceObj?.name || hostObj?.name || bnb.host_name || '',
			amenities: Array.isArray(bnb.amenities) ? bnb.amenities : [],
			description: bnb.description,
			_raw: { bnb, hostObj, gallery },
		};
	};

	const getFilteredItems = () => {
		const staysMapped = bnbList.map(mapBnbToItem);

		if (selectedCategory === 'all') {
			const result = [];
			const seen = new Set();

			const pushIfUnique = (it) => {
				if (!it) return;
				const k = `${it.category}-${it.id}`;
				if (!seen.has(k)) {
					seen.add(k);
					result.push(it);
				}
			};

			// Prioritize API tours if available, else static packages
			const apiPackages = tours.map(mapTourToItem);
			pushIfUnique(staysMapped[0]);
			pushIfUnique(transports[0]);
			pushIfUnique(apiPackages[0] || staticPackages[0]);

			return result;
		} else if (selectedCategory === 'stays') {
			return staysMapped;
		} else if (selectedCategory === 'transport') {
			return transports;
		} else if (selectedCategory === 'packages') {
			const apiPackages = tours.map(mapTourToItem);
			return apiPackages.length ? apiPackages : staticPackages;
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
												Kz {item.price}
											</Text>
											<Text
												className="text-sm ml-1"
												style={{ color: colors.text.secondary }}
											>
												{item.category === 'packages' ? (
													<Ionicons name="person" size={12} color={colors.text.secondary} style={{ marginLeft: 6 }} />
												) : (
													<Text>/dia</Text>
												)}
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
										<Ionicons name="information-circle" size={18} color="#FFFFFF" />
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
				
				{popularExperiences.map((exp) => (
					<TouchableOpacity
						key={exp.id}
						activeOpacity={0.7}
						className="rounded-2xl mb-3 flex-row items-center overflow-hidden"
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
						<Image 
							source={{ uri: exp.image }} 
							className="w-20 h-full"
							style={{ minHeight: 80 }}
						/>
						<View className="flex-1 p-4">
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
						<View className="pr-4">
							<Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
						</View>
					</TouchableOpacity>
				))}
			</View>

			{/* Seção de Publicidade 2 */}
			<View className="px-5 mb-[110px]">
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