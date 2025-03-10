import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import migrations from '../../drizzle/migrations';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen';

export {
  ErrorBoundary,
} from 'expo-router';

const queryClient = new QueryClient()

const databaseName = process.env.DB_NAME || 'goufinances.db';

const expoDB = openDatabaseSync(databaseName, { enableChangeListener: true });
const db = drizzle(expoDB);

SplashScreen.preventAutoHideAsync();

export default function () {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <ActivityIndicator style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }} />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider databaseName={databaseName} options={{ enableChangeListener: true }}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </SQLiteProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  errorText: {
    color: '#fff'
  }
})