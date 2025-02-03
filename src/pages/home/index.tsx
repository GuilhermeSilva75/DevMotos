import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Home() {

  const { user } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})