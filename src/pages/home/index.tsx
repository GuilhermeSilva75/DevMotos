import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeParamList } from '../../routes/home.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


import Header from '../../component/Header';
import Input from '../../component/Input';

export default function Home() {

  const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>()

  return (
    <View style={styles.container}>
      <Header />

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