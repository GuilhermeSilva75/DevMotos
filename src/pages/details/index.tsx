import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, ScrollView, Image, Modal } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MotoDetailProps } from '../../types/moto.type';
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnectionn';
import { HomeParamList } from '../../routes/home.routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking'

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import ModalDetail from './Modal';
import useStorage from '../../hooks/useStorage';
import { useToast } from '../../hooks/useToast';

type RouteDetailParams = {
    detail: {
        id: string
    }
}


type DetailRouteProps = RouteProp<RouteDetailParams, 'detail'>

export default function Details() {

    const route = useRoute<DetailRouteProps>()

    const [moto, setMoto] = useState<MotoDetailProps>()
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const { saveItem } = useStorage()
    const { showToast } = useToast()

    const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>()

    useEffect(() => {
        async function loadMotos() {
            if (!route.params.id) { return }

            const docRef = doc(db, "motos", route.params.id)
            getDoc(docRef)
                .then((snapshot) => {
                    if (!snapshot.data()) {
                        navigation.goBack()
                    }

                    setMoto({
                        id: snapshot.id,
                        name: snapshot.data()?.name,
                        year: snapshot.data()?.year,
                        city: snapshot.data()?.city,
                        km: snapshot.data()?.km,
                        price: snapshot.data()?.price,
                        owner: snapshot.data()?.owner,
                        created: snapshot.data()?.created,
                        descripition: snapshot.data()?.descripition,
                        images: snapshot.data()?.images,
                        uid: snapshot.data()?.uid,
                        whatsapp: snapshot.data()?.whatsapp,
                        model: snapshot.data()?.model
                    })

                })
                .finally(() => {
                    setLoading(false)
                })

        }

        loadMotos()
    }, [route.params.id])

    async function handleCallPhone() {
        await Linking.openURL(`tel:${moto?.whatsapp}`)
    }


    async function handleFavorite() {
        if (!moto) return

        await saveItem(moto)
        showToast("Moto favoritada com sucesso!", 'SUCCESS')
    }


    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#000" />

            </SafeAreaView>
        )
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.AreaIcon}>
                        <Pressable style={[styles.button, { marginRight: 260 }]} onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </Pressable>

                        <Pressable style={styles.button} onPress={handleFavorite}>
                            <Feather name="bookmark" size={24} color="white" />
                        </Pressable>
                    </View>

                    <Pressable onPress={() => setModalVisible(true)}>
                        <Image
                            source={{ uri: moto?.images }}
                            style={{ height: 250, width: '100%', borderRadius: 12 }}
                            resizeMode='cover'
                        />

                    </Pressable>

                    <View style={styles.header}>
                        <Text style={styles.title}>{moto?.name}</Text>
                        <Text style={styles.price}>R$:{moto?.price}</Text>
                    </View>

                    <View style={styles.AreaLabel}>
                        <View>
                            <Text style={styles.label1}>Ano</Text>
                            <Text style={styles.label2}>{moto?.year}</Text>
                        </View>

                        <View>
                            <Text style={styles.label1}>Quilometragem</Text>
                            <Text style={styles.label2}>{moto?.km}Km</Text>
                        </View>
                    </View>

                    <View style={styles.AreaLabel}>
                        <View>
                            <Text style={styles.label1}>Cidade</Text>
                            <Text style={styles.label2}>{moto?.city}</Text>
                        </View>

                        <View>
                            <Text style={styles.label1}>Modelo</Text>
                            <Text style={[styles.label2, { paddingRight: 60 }]}>{moto?.model}</Text>
                        </View>
                    </View>

                    <View style={styles.AreaLabel}>
                        <View>
                            <Text style={styles.label1}>Telefone</Text>
                            <Text style={styles.label2}>{moto?.whatsapp}</Text>
                        </View>
                    </View>

                    <Text style={{ color: 'gray', fontSize: 20, margin: 10 }}>Descrição</Text>
                    <View style={styles.AreaDescripition}>
                        <Text
                            style={{ fontSize: 18, fontWeight: '400' }}
                        >{moto?.descripition}</Text>
                    </View>

                    <Pressable style={styles.callButton} onPress={handleCallPhone}>
                        <Text style={styles.callText}>Conversar com vendendor</Text>
                    </Pressable>

                </View>

                <Modal animationType='fade' transparent={false} visible={modalVisible}>
                    <ModalDetail image={moto?.images} onCloseModal={() => setModalVisible(false)} />
                </Modal>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F5F8",
        paddingHorizontal: 8
    },
    AreaIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 99,
        top: 13,
        left: 16

    },
    button: {
        height: 50,
        width: 50,
        backgroundColor: "#000",
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#FFF',
        height: 100,
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        marginTop: 14,
        borderRadius: 12
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 8
    },
    price: {
        fontWeight: 'bold',
        fontSize: 35
    },
    AreaLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 40,
        paddingLeft: 10,
        marginTop: 25
    },
    label1: {
        fontSize: 18,
        color: 'gray',
        paddingBottom: 2
    },
    label2: {
        fontWeight: 'bold',
        fontSize: 18
    },
    AreaDescripition: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        borderRadius: 12,
        padding: 10
    },
    callButton: {
        width: "100%",
        padding: 8,
        backgroundColor: "#08c168",
        marginBottom: 14,
        marginTop: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center'
    },
    callText: {
        fontSize: 16,
        fontWeight: '500'
    }
})