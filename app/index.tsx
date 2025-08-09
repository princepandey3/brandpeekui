import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { brandService } from '@/services/brandService';
import { BrandCard } from '@/components/BrandCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ErrorView } from '@/components/ErrorView';
import type { Brand } from '@/types/brand';

export default function HomeScreen() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const brandsData = await brandService.getBrands();
      setBrands(brandsData);
    } catch (err) {
      setError('Failed to load brands. Please try again.');
      console.error('Error loading brands:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandPress = (brand: Brand) => {
    router.push(`/brand/${brand.id}`);
  };

  const renderBrand = ({ item }: { item: Brand }) => (
    <BrandCard brand={item} onPress={() => handleBrandPress(item)} />
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadBrands} />;
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f4c75']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Top Brands Today</Text>
          <Text style={styles.headerSubtitle}>
            Discover amazing brands & creators
          </Text>
        </View>

        <FlatList
          data={brands}
          renderItem={renderBrand}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a8b2d1',
    fontWeight: '400',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
});