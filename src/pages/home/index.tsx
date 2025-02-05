import { View, Text, StyleSheet } from 'react-native';

import Header from '../../component/Header';
import Input from '../../component/Input';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header/>
      
      <Input
      placeholder='Procurando alguma moto?'
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  }
})