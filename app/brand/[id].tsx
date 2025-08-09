import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import { brandService } from '@/services/brandService';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ErrorView } from '@/components/ErrorView';
import { FollowButton } from '@/components/FollowButton';
import type { Brand } from '@/types/brand';

const { width } = Dimensions.get('window');

export default function BrandDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id) {
      loadBrand();
    }
  }, [id]);

  const loadBrand = async () => {
    try {
      setLoading(true);
      setError(null);
      const brandData = await brandService.getBrandById(Number(id));

      setBrand(brandData);
    } catch (err) {
      setError('Failed to load brand details. Please try again.');
      console.error('Error loading brand:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={loadBrand} />;
  }

  if (!brand) {
    return (
      <ErrorView message="Brand not found" onRetry={() => router.back()} />
    );
  }

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f4c75']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Share2 size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Brand Logo & Name */}
          <View style={styles.brandHeader}>
            <View style={styles.logoContainer}>
              <Image source={{ uri: brand.logo }} style={styles.logo} />
            </View>
            <Text style={styles.brandName}>{brand.name}</Text>
            <Text style={styles.brandCategory}>{brand.category}</Text>
          </View>

          {/* Follow Button */}
          <FollowButton isFollowing={isFollowing} onPress={handleFollow} />

          {/* Brand Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{brand.description}</Text>
          </View>

          {/* Brand Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{brand.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{brand.campaigns}</Text>
              <Text style={styles.statLabel}>Campaigns</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{brand.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Recent Campaign */}
          {brand.recentCampaign && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Latest Campaign</Text>
              <View style={styles.campaignCard}>
                <Text style={styles.campaignTitle}>
                  {brand.recentCampaign.title}
                </Text>
                <Text style={styles.campaignDescription}>
                  {brand.recentCampaign.description}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  brandCategory: {
    fontSize: 16,
    color: '#a8b2d1',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#a8b2d1',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#a8b2d1',
    fontWeight: '500',
  },
  campaignCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#a8b2d1',
    lineHeight: 20,
  },
});
