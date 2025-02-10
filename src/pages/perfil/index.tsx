import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Feather from '@expo/vector-icons/Feather';

export default function Perfil() {

  const { user, LogOut } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.areaIcon}>
        <Feather name="user" size={50} color='white' />
      </View>

      <Text style={styles.text}>Olá, {user?.name}</Text>

      <TouchableOpacity style={styles.button} onPress={() => LogOut()}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Sair dessa conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16
  },
  areaIcon: {
    backgroundColor: "#1f1f1f",
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 12
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  button: {
    height: 45,
    width: '90%',
    marginTop: 14,
    padding: 8,
    backgroundColor: "#B00D10",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
})