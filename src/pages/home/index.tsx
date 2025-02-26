import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { db } from '../../services/firebaseConnectionn';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { MotosProps } from '../../types/moto.type';
import MotoItem from '../../component/motolist';


import Header from '../../component/Header';
import Input from '../../component/Input';

export default function Home() {

  const [searchInput, setSearchInput] = useState('')
  const [motos, setMotos] = useState<MotosProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMotos() {
      await loadMoto()
    }

    fetchMotos()
  }, [])

  async function loadMoto() {
    const motosRef = collection(db, "motos")
    const querRef = query(motosRef, orderBy("created", "desc"))


    getDocs(querRef)
      .then((snapshot) => {
        let listMotos = [] as MotosProps[];

        snapshot.forEach((doc) => {
          listMotos.push({
            id: doc.id,
            name: doc.data().name,
            city: doc.data().city,
            km: doc.data().km,
            year: doc.data().year,
            price: doc.data().price,
            uid: doc.data().uid,
            images: doc.data().images
          })
        })

        setMotos(listMotos)
        setLoading(false)

      })
  }

  return (
    <View style={styles.container}>
      <Header />

      <Input
        placeholder='Procurando alguma moto?'
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />

      {loading && (
        <ActivityIndicator style={{ marginTop: 14 }} size='large' color="#000" />
      )}

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <MotoItem data={item} DimensionValue={ motos.length <= 1 ? '100%' : '49%'}/>}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{paddingBottom: 14}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    flex: 1,
    marginTop: 4,
    paddingTop: 14
  }
})