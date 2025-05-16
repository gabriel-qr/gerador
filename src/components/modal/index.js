import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import useStorage from '../../hooks/useStorage';

export function ModalPassword({ password, handleClose }) {
  const { saveItem } = useStorage();
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    await Clipboard.setStringAsync(password);
    await saveItem('@pass', password);
    setCopied(true);
    setTimeout(() => setCopied(false, handleClose()), 1500);
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha gerada</Text>
        <Pressable style={styles.innerPassword} onPress={copyPassword}>
          <Text style={styles.text}>{password}</Text>
        </Pressable>
        {copied && <Text style={styles.copiedText}>Senha copiada</Text>}
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(24, 24,24.0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#FFF',
    width: '85%',
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: '#0e0e0e',
    width: '90%',
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },
  copiedText: {
    color: '#27ae60',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonArea: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
    marginHorizontal: 10,
    padding: 8,
    backgroundColor: '#392DE9',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
