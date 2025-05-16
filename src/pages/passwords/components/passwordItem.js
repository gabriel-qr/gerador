import { Text, StyleSheet, Pressable } from 'react-native';

export function PasswordItem({ data, removePassword, copySavedPassword }) {
  return (
    <Pressable
      onLongPress={removePassword}
      style={styles.container}
      onPress={copySavedPassword}
    >
      <Text style={styles.text}>{data}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#0e0e0e',
    padding: 14,
    width: '100%',
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});
