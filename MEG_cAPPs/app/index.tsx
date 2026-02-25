import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React  from 'react';
import { useEffect } from 'react';
import * as Utils from '@/constants/utils';
import Logo from '@/components/logo';
import { PADDING } from '@/constants/styles';

export default function ModalScreen() {
  
  useEffect(() => {
    const preLoad = async () => {
      const user = await Utils.getUser();
      if(!user)  return;
      if(user.ultim_login < (new Date()).getTime() - Utils.DAY_MILLIS)
        await Utils.logout();
    };
    preLoad();
  }, []);  
  
  return (
      <ThemedView style={styles.container}>
        {Logo()}
        <ThemedText type="title">MEG cAPP's</ThemedText>
        <Link href="./login" dismissTo style={styles.link}>
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
    padding: PADDING,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});