import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, UserPlus } from 'lucide-react-native';

interface FollowButtonProps {
  isFollowing: boolean;
  onPress: () => void;
}

export function FollowButton({ isFollowing, onPress }: FollowButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      <LinearGradient
        colors={
          isFollowing
            ? ['#e91e63', '#ad1457']
            : ['#6366f1', '#8b5cf6']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}>
        {isFollowing ? (
          <Heart size={20} color="#ffffff" fill="#ffffff" />
        ) : (
          <UserPlus size={20} color="#ffffff" />
        )}
        <Text style={styles.buttonText}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    borderRadius: 28,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});