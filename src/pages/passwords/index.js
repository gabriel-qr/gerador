import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passwordItem';
import * as Clipboard from 'expo-clipboard'; //

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();
  const [copied, setCopied] = useState(false); //
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem('@pass');
      setListPasswords(passwords);
    }
    loadPasswords();
  }, [focused]);

  async function handleCopyPassword(item) {
    await Clipboard.setStringAsync(item);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDeletePassword(item) {
    const passwords = await removeItem('@pass', item);
    setListPasswords(passwords);
    setDeleted(true);
    setTimeout(() => setDeleted(false), 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
              copySavedPassword={() => handleCopyPassword(item)}
            />
          )}
        />
        {deleted && <Text style={styles.deletedText}>Senha removida</Text>}
        {copied && <Text style={styles.copiedText}>Senha copiada</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#392de9',
    paddingTop: 30,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  copiedText: {
    color: '#27ae60',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  deletedText: {
    color: '#FF0000',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
