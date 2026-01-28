import { Link } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useEffect } from 'react';

export default function ModalScreen() {
  
  // TODO : check if user.login is more than 1day ago and reset it to null
  
  return (
    <ThemedView style={styles.container}>
      {Logo()}
      <ThemedText type="title">MEG cAPP's</ThemedText>
      <Link href="/login" dismissTo style={styles.link}>
        <ThemedText type="link">Inicia sessió</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

const Logo = ()=>{return <Image source={require('@/assets/images/MEG_color.png')} style={{ width: 250, height: 200, marginBottom: 20 }} />;}