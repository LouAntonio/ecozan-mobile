import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts';

export default function MenuScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = createStyles(colors);

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.subtitle}>Configurações e preferências</Text>

      {/* Toggle de Tema */}
      <TouchableOpacity style={styles.themeCard} onPress={toggleTheme} activeOpacity={0.7}>
        <View style={styles.themeLeft}>
          <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
          <View>
            <Text style={styles.themeTitle}>Tema</Text>
            <Text style={styles.themeSubtitle}>{isDark ? 'Modo Escuro' : 'Modo Claro'}</Text>
          </View>
        </View>
        <View style={[styles.toggle, isDark && styles.toggleActive]}>
          <View style={[styles.toggleThumb, isDark && styles.toggleThumbActive]} />
        </View>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* App Version */}
      <Text style={styles.version}>Ecozan v1.0.0</Text>
    </ScrollView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  themeCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  themeSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#CCCCCC",
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: colors.primary.vivid,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  menuList: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.text.muted,
  },
  version: {
    textAlign: 'center',
    color: colors.text.muted,
    fontSize: 12,
    marginTop: 24,
  },
});
