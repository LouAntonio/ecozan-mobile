import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts';

export default function Header({ 
	showNotifications = true,
	showProfile = true,
	notificationCount = 0,
	onNotificationPress,
	onProfilePress,
	userName
}) {
	const { colors, isDark } = useTheme();
	const insets = useSafeAreaInsets();

	return (
		<View 
			className="w-full px-4 pb-4"
			style={{ 
				paddingTop: insets.top + 12,
				backgroundColor: colors.background.primary,
				borderBottomWidth: 1,
				borderBottomColor: isDark ? `${colors.primary.vivid}15` : `${colors.border?.light || '#E5E7EB'}30`,
				shadowColor: isDark ? colors.primary.vivid : '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: isDark ? 0.2 : 0.08,
				shadowRadius: 12,
				elevation: 8,
				zIndex: 10,
			}}
		>
			<View className="flex-row items-center justify-between">
				{/* Logo */}
				<View className="flex-1 items-center">
					<Image
						source={require('../../assets/logoCroppedBG.png')}
						className="h-10 w-[120px]"
						resizeMode="contain"
						style={{
							shadowColor: isDark ? colors.primary.vivid : 'transparent',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.3,
							shadowRadius: 4,
						}}
					/>
				</View>

				{/* Actions */}
				{(showNotifications || showProfile) && (
					<View className="flex-row items-center gap-3 absolute right-0">
						{showNotifications && (
							<TouchableOpacity 
								onPress={onNotificationPress}
								className="w-11 h-11 items-center justify-center rounded-full active:scale-95"
								style={{ 
									backgroundColor: isDark ? `${colors.primary.vivid}12` : `${colors.primary.vivid}08`,
									borderWidth: 1,
									borderColor: isDark ? `${colors.primary.vivid}25` : `${colors.primary.vivid}15`,
									shadowColor: colors.primary.vivid,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: isDark ? 0.3 : 0.15,
									shadowRadius: 6,
									elevation: 3,
								}}
							>
								<Ionicons 
									name="notifications-outline" 
									size={22} 
									color={isDark ? colors.primary.vivid : colors.text.primary} 
								/>
								{notificationCount > 0 && (
									<View 
										className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full items-center justify-center"
										style={{ 
											backgroundColor: colors.accent?.error || '#EF4444',
											borderWidth: 2,
											borderColor: colors.background.primary,
											shadowColor: '#000',
											shadowOffset: { width: 0, height: 2 },
											shadowOpacity: 0.3,
											shadowRadius: 4,
											elevation: 5,
										}}
									>
										<Text className="text-white text-[10px] font-bold">
											{notificationCount > 9 ? '9+' : notificationCount}
										</Text>
									</View>
								)}
							</TouchableOpacity>
						)}

						{showProfile && (
							<TouchableOpacity 
								onPress={onProfilePress}
								className="w-11 h-11 items-center justify-center rounded-full active:scale-95"
								style={{ 
									backgroundColor: userName ? colors.primary.vivid : (isDark ? `${colors.primary.vivid}12` : `${colors.primary.vivid}08`),
									borderWidth: userName ? 2 : 1,
									borderColor: isDark ? `${colors.primary.vivid}40` : `${colors.primary.vivid}20`,
									shadowColor: colors.primary.vivid,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: userName ? 0.4 : (isDark ? 0.3 : 0.15),
									shadowRadius: 6,
									elevation: userName ? 4 : 3,
								}}
							>
								{userName ? (
									<Text className="text-white text-base font-bold">
										{userName.charAt(0).toUpperCase()}
									</Text>
								) : (
									<Ionicons 
										name="person-circle-outline" 
										size={24} 
										color={isDark ? colors.primary.vivid : colors.text.primary} 
									/>
								)}
							</TouchableOpacity>
						)}
					</View>
				)}
			</View>
		</View>
	);
}