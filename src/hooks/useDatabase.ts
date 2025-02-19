import * as FileSystem from 'expo-file-system';
import { DevSettings } from 'react-native';

export const useDatabase = () => {

  const deleteDatabase = async () => {
    const dbPath = `${FileSystem.documentDirectory}SQLite/database.db`;

    try {
      await FileSystem.deleteAsync(dbPath, { idempotent: true });
      console.log('Banco de dados deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o banco de dados:', error);
    }
  };

  return { deleteDatabase };
}