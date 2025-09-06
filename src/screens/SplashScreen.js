import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const video = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);  // 5 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('../../../assets/videos/splash_video.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"  // Shows full video without zoom
        shouldPlay
        isLooping={false}
        style={StyleSheet.absoluteFill}
        onError={(error) => console.log('Video error:', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default SplashScreen;