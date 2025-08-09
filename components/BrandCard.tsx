import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import type { Brand } from '@/types/brand';

const { width } = Dimensions.get('window');

interface BrandCardProps {
  brand: Brand;
  onPress: () => void;
}

export function BrandCard({ brand, onPress }: BrandCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.card}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: brand.logo }} style={styles.logo} />
          </View>
          
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>{brand.name}</Text>
            <Text style={styles.brandDescription} numberOfLines={2}>
              {brand.description}
            </Text>
            <Text style={styles.brandCategory}>{brand.category}</Text>
          </View>

          <View style={styles.chevronContainer}>
            <ChevronRight size={20} color="#a8b2d1" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  brandInfo: {
    flex: 1,
    marginRight: 12,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  brandDescription: {
    fontSize: 14,
    color: '#a8b2d1',
    lineHeight: 20,
    marginBottom: 8,
  },
  brandCategory: {
    fontSize: 12,
    color: '#7c89b0',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});