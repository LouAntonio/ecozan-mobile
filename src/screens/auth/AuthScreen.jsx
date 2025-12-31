import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import spacing from '../../theme/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../scripts/requests';

export default function AuthScreen({ onAuthSuccess }) {
	const { colors, isDark } = useTheme();
	const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
	const [signupStep, setSignupStep] = useState(1); // 1: email, 2: otp, 3: details
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	// Form state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	
	// OTP refs
	const otpRefs = [
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
		useRef(null),
	];

	async function handlePrimaryAction() {
		setLoading(true);
		try {
			if (mode === 'login') {
				const res = await apiRequest('/users/login', 'POST', { email, password });
				if (res && res.success) {
					if (res.token) await AsyncStorage.setItem('token', res.token);
					onAuthSuccess && onAuthSuccess(res.user || null);
				} else {
					Alert.alert('Erro', res?.msg || 'Falha no login');
				}
			} else if (mode === 'signup') {
				if (signupStep === 1) {
					if (!email) return Alert.alert('Erro', 'Email é obrigatório');
					const res = await apiRequest('/users/check-email', 'POST', { email });
					if (res && res.success) {
						setSignupStep(2);
					} else {
						Alert.alert('Erro', res?.msg || 'Email não disponível');
					}
				} else if (signupStep === 2) {
					const code = otp.join('');
					if (code.length !== 6) return Alert.alert('Erro', 'Digite o código de 6 dígitos');
					// OTP permanece fake — apenas avançar
					setSignupStep(3);
				} else if (signupStep === 3) {
					if (!firstName || !lastName || !password) return Alert.alert('Erro', 'Preencha todos os campos');
					if (password !== confirmPassword) return Alert.alert('Erro', 'As senhas não coincidem');
					const payload = { name: firstName, surname: lastName, email, password };
					const res = await apiRequest('/users/complete-registration', 'POST', payload);
					if (res && res.success) {
						Alert.alert('Sucesso', 'Conta criada com sucesso. Faça login.');
						resetSignup();
						setMode('login');
					} else {
						Alert.alert('Erro', res?.msg || 'Erro ao criar conta');
					}
				}
			} else if (mode === 'forgot') {
				Alert.alert('Recuperação', 'Link de recuperação enviado (simulação).');
				setMode('login');
			}
		} catch (err) {
			Alert.alert('Erro', 'Erro de rede ou servidor');
		} finally {
			setLoading(false);
		}
	}

	function handleOtpChange(index, value) {
		// Apenas números
		if (value && !/^\d+$/.test(value)) return;
		
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Auto-focus próximo campo
		if (value && index < 5) {
			otpRefs[index + 1].current?.focus();
		}
	}

	function handleOtpKeyPress(index, key) {
		// Backspace no campo vazio volta pro anterior
		if (key === 'Backspace' && !otp[index] && index > 0) {
			otpRefs[index - 1].current?.focus();
		}
	}

	function resetSignup() {
		setSignupStep(1);
		setEmail('');
		setOtp(['', '', '', '', '', '']);
		setFirstName('');
		setLastName('');
		setPassword('');
		setConfirmPassword('');
	}


	const getModeConfig = () => {
		if (mode === 'signup') {
			if (signupStep === 1) {
				return {
					title: 'Criar Conta',
					subtitle: 'Digite seu e-mail para começar',
					icon: 'mail',
					iconColor: '#10B981',
					buttonText: 'Enviar Código',
				};
			} else if (signupStep === 2) {
				return {
					title: 'Verificar E-mail',
					subtitle: `Enviamos um código para ${email}`,
					icon: 'shield-checkmark',
					iconColor: '#3B82F6',
					buttonText: 'Verificar Código',
				};
			} else {
				return {
					title: 'Complete seu Perfil',
					subtitle: 'Precisamos de mais algumas informações',
					icon: 'person-add',
					iconColor: '#10B981',
					buttonText: 'Criar Conta',
				};
			}
		} else if (mode === 'login') {
			return {
				title: 'Bem-vindo de volta!',
				subtitle: 'Entre na sua conta para continuar explorando',
				icon: 'log-in',
				iconColor: '#3B82F6',
				buttonText: 'Entrar',
			};
		} else {
			return {
				title: 'Recuperar senha',
				subtitle: 'Digite seu e-mail para receber instruções',
				icon: 'key',
				iconColor: '#F59E0B',
				buttonText: 'Enviar',
			};
		}
	};

	const config = getModeConfig();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className="flex-1"
				style={{ backgroundColor: colors.background.primary, paddingHorizontal: spacing.gutter }}
		>
			<ScrollView 
				contentContainerStyle={{ flexGrow: 1 }} 
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				{/* Header Decorativo */}
				<View className="relative">
					<View className="absolute inset-0 overflow-hidden">
						<View
							className="absolute w-80 h-80 rounded-full -top-20 -right-20"
							style={{ backgroundColor: config.iconColor + '15' }}
						/>
						<View
							className="absolute w-60 h-60 rounded-full -top-10 -left-10"
							style={{ backgroundColor: colors.primary.vivid + '10' }}
						/>
					</View>

					<View className="px-6 pt-16 pb-8">
						{/* Botão de voltar */}
						{(mode === 'forgot' || (mode === 'signup' && signupStep > 1)) && (
							<TouchableOpacity
								onPress={() => {
									if (mode === 'forgot') {
										setMode('login');
									} else if (signupStep > 1) {
										setSignupStep(signupStep - 1);
									}
								}}
								className="flex-row items-center mb-6"
								activeOpacity={0.7}
							>
								<Ionicons name="arrow-back" size={24} color={colors.text.primary} />
								<Text className="ml-2 font-semibold" style={{ color: colors.text.primary }}>
									Voltar
								</Text>
							</TouchableOpacity>
						)}

						{/* Progress indicator para signup */}
						{mode === 'signup' && (
							<View className="flex-row justify-center mb-6 gap-2">
								{[1, 2, 3].map((step) => (
									<View
										key={step}
										className="h-1 rounded-full"
										style={{
											width: 40,
											backgroundColor: step <= signupStep ? config.iconColor : colors.text.muted + '30',
										}}
									/>
								))}
							</View>
						)}

						{/* Ícone principal */}
						<View className="items-center mb-6">
							<View
								className="rounded-3xl p-6 items-center justify-center"
								style={{
									backgroundColor: config.iconColor + '15',
									shadowColor: config.iconColor,
									shadowOffset: { width: 0, height: 8 },
									shadowOpacity: 0.3,
									shadowRadius: 16,
									elevation: 8,
								}}
							>
								<Image
									source={require('../../../assets/iconBG.png')}
									style={{ width: 72, height: 72 }}
									resizeMode="contain"
								/>
							</View>
						</View>

						<Text className="text-3xl font-bold text-center mb-2" style={{ color: colors.text.primary }}>
							{config.title}
						</Text>
						<Text className="text-base text-center leading-6" style={{ color: colors.text.secondary }}>
							{config.subtitle}
						</Text>
					</View>
				</View>

				{/* Formulário */}
				<View
					className="rounded-t-[32px] px-6 pt-8 pb-6"
					style={{
						backgroundColor: colors.surface.card,
						shadowColor: '#000',
						shadowOffset: { width: 0, height: -4 },
						shadowOpacity: 0.05,
						shadowRadius: 12,
						elevation: 5,
					}}
				>
					{/* LOGIN MODE */}
					{mode === 'login' && (
						<>
							<View className="mb-4">
								<View
									className="flex-row items-center rounded-2xl px-4 py-4"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
								>
									<Ionicons name="mail-outline" size={20} color={colors.text.secondary} />
									<TextInput
										placeholder="seu@email.com"
										placeholderTextColor={colors.text.tertiary}
										autoCapitalize="none"
										keyboardType="email-address"
										value={email}
										onChangeText={setEmail}
										className="flex-1 ml-3 text-base"
										style={{ color: colors.text.primary }}
									/>
								</View>
							</View>

							<View className="mb-4">
								<View
									className="flex-row items-center rounded-2xl px-4 py-4"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
								>
									<Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} />
									<TextInput
										placeholder="••••••••"
										placeholderTextColor={colors.text.tertiary}
										secureTextEntry={!showPassword}
										value={password}
										onChangeText={setPassword}
										className="flex-1 ml-3 text-base"
										style={{ color: colors.text.primary }}
									/>
									<TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
										<Ionicons
											name={showPassword ? 'eye-outline' : 'eye-off-outline'}
											size={20}
											color={colors.text.tertiary}
										/>
									</TouchableOpacity>
								</View>
								<TouchableOpacity onPress={() => setMode('forgot')} activeOpacity={0.7}>
									<Text className="text-xs font-semibold text-right mt-2" style={{ color: colors.primary.vivid }}>
										Esqueceu a sua senha?
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}

					{/* SIGNUP STEP 1 - Email */}
					{mode === 'signup' && signupStep === 1 && (
						<View className="mb-4">
							<View
								className="flex-row items-center rounded-2xl px-4 py-4"
								style={{
									backgroundColor: colors.background.primary,
									borderWidth: 1.5,
									borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
								}}
							>
								<Ionicons name="mail-outline" size={20} color={colors.text.secondary} />
								<TextInput
									placeholder="seu@email.com"
									placeholderTextColor={colors.text.tertiary}
									autoCapitalize="none"
									keyboardType="email-address"
									value={email}
									onChangeText={setEmail}
									className="flex-1 ml-3 text-base"
									style={{ color: colors.text.primary }}
								/>
							</View>
							<Text className="text-xs mt-2 ml-1" style={{ color: colors.text.secondary }}>
								Enviaremos um código de verificação para este e-mail
							</Text>
						</View>
					)}

					{/* SIGNUP STEP 2 - OTP */}
					{mode === 'signup' && signupStep === 2 && (
						<>
							<View className="mb-6">
								<Text className="text-sm font-semibold mb-4 text-center" style={{ color: colors.text.primary }}>
									Digite o código de 6 dígitos
								</Text>
								<View className="flex-row justify-center gap-2">
									{otp.map((digit, index) => (
										<TextInput
											key={index}
											ref={otpRefs[index]}
											value={digit}
											onChangeText={(value) => handleOtpChange(index, value)}
											onKeyPress={({ nativeEvent: { key } }) => handleOtpKeyPress(index, key)}
											keyboardType="number-pad"
											maxLength={1}
											className="text-2xl font-bold text-center rounded-2xl"
											style={{
												width: 50,
												height: 60,
												backgroundColor: colors.background.primary,
												borderWidth: 2,
												borderColor: digit ? config.iconColor : (isDark ? `${colors.primary.vivid}20` : colors.border.light),
												color: colors.text.primary,
											}}
										/>
									))}
								</View>
							</View>

							<TouchableOpacity
								onPress={() => {
									// Reenviar código
								}}
								className="items-center mb-4"
								activeOpacity={0.7}
							>
								<Text className="text-sm" style={{ color: colors.text.secondary }}>
									Não recebeu o código?{' '}
									<Text className="font-bold" style={{ color: config.iconColor }}>
										Reenviar
									</Text>
								</Text>
							</TouchableOpacity>
						</>
					)}

					{/* SIGNUP STEP 3 - Complete Profile */}
					{mode === 'signup' && signupStep === 3 && (
						<>
							<View className="flex-row gap-3 mb-4">
								<View className="flex-1">
									<View
										className="flex-row items-center rounded-2xl px-4 py-4"
										style={{
											backgroundColor: colors.background.primary,
											borderWidth: 1.5,
											borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
										}}
									>
										<TextInput
											placeholder="Nome"
											placeholderTextColor={colors.text.tertiary}
											value={firstName}
											onChangeText={setFirstName}
											className="flex-1 text-base"
											style={{ color: colors.text.primary }}
										/>
									</View>
								</View>

								<View className="flex-1">
									<View
										className="flex-row items-center rounded-2xl px-4 py-4"
										style={{
											backgroundColor: colors.background.primary,
											borderWidth: 1.5,
											borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
										}}
									>
										<TextInput
											placeholder="Sobrenome"
											placeholderTextColor={colors.text.tertiary}
											value={lastName}
											onChangeText={setLastName}
											className="flex-1 text-base"
											style={{ color: colors.text.primary }}
										/>
									</View>
								</View>
							</View>



							<View className="mb-4">
								<View
									className="flex-row items-center rounded-2xl px-4 py-4"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
								>
									<Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} />
									<TextInput
										placeholder="Mínimo 8 caracteres"
										placeholderTextColor={colors.text.tertiary}
										secureTextEntry={!showPassword}
										value={password}
										onChangeText={setPassword}
										className="flex-1 ml-3 text-base"
										style={{ color: colors.text.primary }}
									/>
									<TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
										<Ionicons
											name={showPassword ? 'eye-outline' : 'eye-off-outline'}
											size={20}
											color={colors.text.tertiary}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View className="mb-6">
								<View
									className="flex-row items-center rounded-2xl px-4 py-4"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
								>
									<Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} />
									<TextInput
										placeholder="Digite a senha novamente"
										placeholderTextColor={colors.text.tertiary}
										secureTextEntry={!showConfirmPassword}
										value={confirmPassword}
										onChangeText={setConfirmPassword}
										className="flex-1 ml-3 text-base"
										style={{ color: colors.text.primary }}
									/>
									<TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} activeOpacity={0.7}>
										<Ionicons
											name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
											size={20}
											color={colors.text.tertiary}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View className="flex-row items-start mb-6">
								<Ionicons name="information-circle-outline" size={16} color={colors.text.secondary} />
								<Text className="text-xs ml-2 leading-5" style={{ color: colors.text.secondary }}>
									Ao criar uma conta, você concorda com nossos{' '}
									<Text style={{ color: colors.primary.vivid, fontWeight: '600' }}>Termos de Uso</Text> e{' '}
									<Text style={{ color: colors.primary.vivid, fontWeight: '600' }}>Política de Privacidade</Text>
								</Text>
							</View>
						</>
					)}

					{/* FORGOT PASSWORD */}
					{mode === 'forgot' && (
						<>
							<View className="mb-4">
								<View
									className="flex-row items-center rounded-2xl px-4 py-4"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
								>
									<Ionicons name="mail-outline" size={20} color={colors.text.secondary} />
									<TextInput
										placeholder="seu@email.com"
										placeholderTextColor={colors.text.tertiary}
										autoCapitalize="none"
										keyboardType="email-address"
										value={email}
										onChangeText={setEmail}
										className="flex-1 ml-3 text-base"
										style={{ color: colors.text.primary }}
									/>
								</View>
							</View>

							<View
								className="rounded-2xl p-4 flex-row items-start mb-4"
								style={{
									backgroundColor: `${config.iconColor}15`,
									borderWidth: 1,
									borderColor: `${config.iconColor}30`,
								}}
							>
								<Ionicons name="mail" size={20} color={config.iconColor} />
								<Text className="text-sm ml-3 leading-5" style={{ color: colors.text.primary }}>
									Enviaremos um link de recuperação para o e-mail cadastrado.
								</Text>
							</View>
						</>
					)}

					{/* Botão Principal */}
					<TouchableOpacity
						onPress={loading ? null : handlePrimaryAction}
						disabled={loading}
						activeOpacity={loading ? 1 : 0.9}
						className="rounded-2xl py-4 flex-row items-center justify-center mb-4"
						style={{
							backgroundColor: config.iconColor,
							opacity: loading ? 0.85 : 1,
							shadowColor: config.iconColor,
							shadowOffset: { width: 0, height: 6 },
							shadowOpacity: 0.4,
							shadowRadius: 12,
							elevation: 8,
						}}
					>
						{loading ? (
							<ActivityIndicator size="small" color="#FFFFFF" />
						) : (
							<>
								<Text className="text-white font-bold text-lg mr-2">{config.buttonText}</Text>
								<Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
							</>
						)}
					</TouchableOpacity>

					{/* Switch entre modos */}
					{mode !== 'forgot' && signupStep === 1 && (
						<View className="flex-row justify-center items-center mb-6">
							<Text className="text-sm" style={{ color: colors.text.secondary }}>
								{mode === 'signup' ? 'Já tem conta?' : 'Não tem conta?'}{' '}
							</Text>
							<TouchableOpacity
								onPress={() => {
									if (mode === 'signup') {
										resetSignup();
										setMode('login');
									} else {
										setMode('signup');
									}
								}}
								activeOpacity={0.7}
							>
								<Text className="text-sm font-bold" style={{ color: colors.primary.vivid }}>
									{mode === 'signup' ? 'Entrar' : 'Criar conta'}
								</Text>
							</TouchableOpacity>
						</View>
					)}

					{/* Social Login (apenas login e signup step 1) */}
					{mode === 'login' && (
						<>
							<View className="flex-row items-center mb-6">
								<View className="flex-1 h-px" style={{ backgroundColor: colors.border.light }} />
								<Text className="text-xs mx-4" style={{ color: colors.text.tertiary }}>
									OU CONTINUE COM
								</Text>
								<View className="flex-1 h-px" style={{ backgroundColor: colors.border.light }} />
							</View>

							<View className="flex-row gap-3">
								<TouchableOpacity
									className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
									activeOpacity={0.7}
								>
									<Ionicons name="logo-google" size={22} color="#EA4335" />
									<Text className="ml-2 font-semibold" style={{ color: colors.text.primary }}>
										Google
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									className="flex-1 flex-row items-center justify-center rounded-2xl py-3.5"
									style={{
										backgroundColor: colors.background.primary,
										borderWidth: 1.5,
										borderColor: isDark ? `${colors.primary.vivid}20` : colors.border.light,
									}}
									activeOpacity={0.7}
								>
									<Ionicons name="logo-apple" size={22} color={colors.text.primary} />
									<Text className="ml-2 font-semibold" style={{ color: colors.text.primary }}>
										Apple
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</View>

				{/* Footer */}
				<View className="px-6 py-6">
					<Text className="text-center text-xs leading-5" style={{ color: colors.text.tertiary }}>
						Ecozan
					</Text>
				</View>
			</ScrollView>

			{loading && (
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0,0,0,0.15)'
					}}
				>
					<ActivityIndicator size="large" color={config.iconColor} />
				</View>
			)}
		</KeyboardAvoidingView>
	);
}