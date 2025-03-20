import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Keyboard } from 'react-native';
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
  }, [loadMoto])

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

  const debounce = (func: (...args: string[]) => void, delay: number) => {
    let timout: NodeJS.Timeout | null = null

    return (...args: string[]) => {
      if (timout) {
        clearInterval(timout)
      }

      timout = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  function handleInputSearch(text: string) {
    setSearchInput(text)
    deleyedApiCall(text)
  }

  const deleyedApiCall = useCallback(
    debounce(async (newText: string) => await fetchSearchBar(newText), 800),
    []
  )

  async function fetchSearchBar(newText: string) {
    if (newText === "") {
      await loadMoto()
      setSearchInput("")
      return
    }

    setMotos([])

    const q = query(collection(db, "motos"),
      where("name" ,">=", newText.toUpperCase()),
      where("name" ,"<=", newText.toUpperCase() + "\uf8ff")
    )

    const querySnapshot = await getDocs(q)

    let listMotos = [] as MotosProps[]

    querySnapshot.forEach((doc) => {
      listMotos.push({
        id: doc.id,
        name: doc.data().name,
        city: doc.data().city,
        year: doc.data().year,
        km: doc.data().km,
        images: doc.data().images,
        price: doc.data().price,
        uid: doc.data().uid
      })
    })

    setMotos(listMotos)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <Header />

      <Input
        placeholder='Procurando alguma moto?'
        value={searchInput}
        onChangeText={(text) => handleInputSearch(text)}
      />

      {loading && (
        <ActivityIndicator style={{ marginTop: 14 }} size='large' color="#000" />
      )}

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MotoItem data={item} DimensionValue={motos.length <= 1 ? '100%' : '49%'} />}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 14 }}
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