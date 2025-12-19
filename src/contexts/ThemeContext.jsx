import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@ecozan_theme';

// Definição das cores para cada tema
export const themes = {
	light: {
		// Cores primárias
		primary: {
			deep: '#1F6F3A',
			vivid: '#4CAF50',
			light: '#81C784',
		},
		// Cores de ação
		accent: {
			blue: '#0077A3',
			blueLight: '#00A3E0',
			blueDark: '#005577',
		},
		// Cores de fundo
		background: {
			primary: '#F5F7F5',
			secondary: '#FFFFFF',
			tertiary: '#E8ECE8',
			elevated: '#FFFFFF',
		},
		// Cores de superfície
		surface: {
			card: '#FFFFFF',
			modal: '#FFFFFF',
			elevated: '#F8FAF8',
		},
		// Cores de texto
		text: {
			primary: '#1A1A1A',
			secondary: '#6B7280',
			muted: '#9CA3AF',
			inverse: '#F9F9F9',
		},
		// Cores de estado
		status: {
			success: '#4CAF50',
			warning: '#F5A623',
			error: '#E74C3C',
			info: '#00A3E0',
		},
		// Bordas e divisores
		border: {
			light: '#E5E7EB',
			medium: '#D1D5DB',
			dark: '#9CA3AF',
		},
	},
	dark: {
		// Cores primárias
		primary: {
			deep: '#1F6F3A',
			vivid: '#6BAF4A',
			light: '#8BC973',
		},
		// Cores de ação
		accent: {
			blue: '#00A3E0',
			blueLight: '#33B5E5',
			blueDark: '#0077A3',
		},
		// Cores de fundo
		background: {
			primary: '#121212',
			secondary: '#1E1E1E',
			tertiary: '#2A2A2A',
			elevated: '#333333',
		},
		// Cores de superfície
		surface: {
			card: '#1E1E1E',
			modal: '#252525',
			elevated: '#2A2A2A',
		},
		// Cores de texto
		text: {
			primary: '#F9F9F9',
			secondary: '#B3B3B3',
			muted: '#808080',
			inverse: '#121212',
		},
		// Cores de estado
		status: {
			success: '#6BAF4A',
			warning: '#F5A623',
			error: '#E74C3C',
			info: '#00A3E0',
		},
		// Bordas e divisores
		border: {
			light: '#333333',
			medium: '#444444',
			dark: '#555555',
		},
	},
};

// Valor padrão do contexto
const defaultContextValue = {
	themeMode: 'light',
	isDark: false,
	isSystemTheme: false,
	isLoading: true,
	colors: themes.light,
	toggleTheme: () => {},
	setTheme: () => {},
	useSystemTheme: () => {},
};

const ThemeContext = createContext(defaultContextValue);

export function ThemeProvider({ children }) {
	const systemColorScheme = useColorScheme();
	const [themeMode, setThemeMode] = useState('light'); // Tema inicial: light
	const [isSystemTheme, setIsSystemTheme] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Carrega o tema salvo ao iniciar
	useEffect(() => {
		loadSavedTheme();
	}, []);

	// Salva o tema quando muda
	useEffect(() => {
		if (!isLoading) {
			saveTheme();
		}
	}, [themeMode, isSystemTheme]);

	const loadSavedTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
			if (savedTheme) {
				const { mode, isSystem } = JSON.parse(savedTheme);
				setIsSystemTheme(isSystem);
				if (isSystem && systemColorScheme) {
					setThemeMode(systemColorScheme);
				} else if (mode === 'dark' || mode === 'light') {
					setThemeMode(mode);
				}
			}
			// Se não há tema salvo, mantém 'light' como padrão
		} catch (error) {
			console.error('Erro ao carregar tema:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const saveTheme = async () => {
		try {
			await AsyncStorage.setItem(
				THEME_STORAGE_KEY,
				JSON.stringify({ mode: themeMode, isSystem: isSystemTheme })
			);
		} catch (error) {
			console.error('Erro ao salvar tema:', error);
		}
	};

	// Atualiza o tema quando o sistema muda (se estiver seguindo o sistema)
	useEffect(() => {
		if (isSystemTheme && systemColorScheme) {
			setThemeMode(systemColorScheme);
		}
	}, [systemColorScheme, isSystemTheme]);

	const toggleTheme = () => {
		setIsSystemTheme(false);
		setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
	};

	const setTheme = (mode) => {
		setIsSystemTheme(false);
		setThemeMode(mode);
	};

	const useSystemTheme = () => {
		setIsSystemTheme(true);
		if (systemColorScheme) {
			setThemeMode(systemColorScheme);
		}
	};

	const isDark = themeMode === 'dark';
	// Garante que sempre há um tema válido
	const colors = themes[themeMode] || themes.light;

	const value = {
		themeMode,
		isDark,
		isSystemTheme,
		isLoading,
		colors,
		toggleTheme,
		setTheme,
		useSystemTheme,
	};

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context || !context.colors) {
		// Retorna valores padrão se o contexto não estiver disponível
		return defaultContextValue;
	}
	return context;
}

export default ThemeContext;
