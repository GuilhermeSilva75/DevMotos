import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeParamList } from '../../routes/home.routes';

import MotoItem from '../../component/motolist';
import useStorage from '../../hooks/useStorage';
import { useToast } from '../../hooks/useToast';

import { MotosProps } from '../../types/moto.type';

export default function Favoritos() {


  const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>()
  const [motos, setMotos] = useState<MotosProps[]>([])
  const { getItem, removeItem } = useStorage()
  const isFocused = useIsFocused()
  const { showToast } = useToast()

  useEffect(() => {
    async function loadMotos() {
      const listMotos = await getItem()
      setMotos(listMotos)
    }

    loadMotos()
  }, [isFocused])

  async function handleRemoveMoto(id: string) {
    const listMotos = await removeItem(id)

    setMotos(listMotos)
    showToast("Moto removida com sucesso!", 'DEFALT')

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Favoritos</Text>

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MotoItem
            data={item}
            DimensionValue={"100%"}
            enableRemove={true}
            removeItem={() => handleRemoveMoto(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 14 }}
        ListEmptyComponent={ <Text style={{marginTop: 20, textAlign: 'center', fontSize: 16}}>Nenhuma moto favoritada!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 20
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14
  }
})