import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../contexts';

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Descubra</Text>
      <Text style={styles.subtitle}>Explore as melhores experiências em Zanzibar</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌴 Bem-vindo ao Ecozan</Text>
        <Text style={styles.cardText}>
          Descubra passeios incríveis, transporte confortável e hospedagens únicas em Zanzibar.
        </Text>
      </View>
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
  card: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});
