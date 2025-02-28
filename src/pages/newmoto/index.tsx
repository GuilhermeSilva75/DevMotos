import { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../Context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

import { Storage, db } from '../../services/firebaseConnectionn'
import InputForm from '../../component/InputForm';

import ModalForm from '../../component/ModalForm';

const schema = z.object({
    name: z.string().nonempty('O campo nome é obrigatorio'),
    model: z.string().nonempty('O campo modelo é obrigatorio'),
    year: z.string().nonempty('O ano da moto é obrigatorio'),
    km: z.string().nonempty('O Km da moto é obrigatorio'),
    price: z.string().nonempty('O preço da moto é obrigatorio'),
    city: z.string().nonempty('A cidade da moto é obrigatorio'),
    whatsapp: z.string().min(1, "O Telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Numero de telefone invalido."
    }),
    descripition: z.string().nonempty('A descrição da moto é obigatoria'),
})

type FormData = z.infer<typeof schema>

export default function Newmoto() {

    const { handleSubmit, formState: { errors }, control, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    const { user } = useContext(AuthContext)

    const [imageUri, setimageUri] = useState<string | null>(null)
    const [modalVisible, setModalVisible] = useState(false)


    async function PickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            quality: 1,
            aspect: undefined,
            allowsEditing: true
        })

        if (!result.canceled && result.assets && result.assets[0].uri) {
            const selectedUri = result.assets[0].uri
            setimageUri(selectedUri)
            await uploadImage(selectedUri)
        }

    }

    async function uploadImage(uri: string) {
        if (!uri) {
            Alert.alert("Selecione alguma imagem")
            return
        }

        const curretUid = user?.uid
        const fileName = uri.split('/').pop()
        const storageRef = ref(Storage, `images/${curretUid}/${fileName}`)

        try {
            const response = await fetch(uri)
            const blob = await response.blob()

            await uploadBytes(storageRef, blob)

        } catch (error) {
            console.log(error);

        }

    }

    function onSubmit(data: FormData) {
        if (imageUri?.length === 0) {
            Alert.alert('Envie alguma imagem')
            return
        }

        addDoc(collection(db, "motos"), {
            name: data.name,
            model: data.model,
            city: data.city,
            whatsapp: data.whatsapp,
            km: data.km,
            price: data.price,
            descripition: data.descripition,
            year: data.year,
            created: new Date(),
            owner: user?.name,
            images: imageUri
        })
            .then(() => {
                reset()
                setimageUri(null)
                console.log("Cadastrado");

            })
            .catch((error) => {
                console.log(error);
                console.log("Erro ao cadastrar");
            })
    }

    async function handldeDelete() {
        setimageUri(null)
        setModalVisible(false)
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.areaImage}>
                <TouchableOpacity style={styles.buttonUpload} onPress={PickImage}>
                    <Feather name="camera" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setModalVisible(true)}
                    style={{ width: "100%", height: 100, borderRadius: 12, position: 'relative' }}
                >
                    {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            style={{ width: "69%", height: 100, borderRadius: 12, position: 'relative' }}
                            resizeMode='cover'
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.inputArea}>
                <Text style={styles.textTitle}>Nome da moto</Text>
                <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.name?.message}
                        />
                    )}
                />

                <Text style={styles.textTitle}>Modelo da moto</Text>
                <Controller
                    control={control}
                    name='model'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.model?.message}
                        />
                    )}
                />

                <View style={{ flexDirection: 'row', gap: 25 }}>
                    <View style={{ width: 180 }}>
                        <Text style={styles.textTitle}>Ano</Text>
                        <Controller
                            control={control}
                            name='year'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    placeholder='Ex: 2016/2016...'
                                    keyboardType='numeric'
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    error={errors.year?.message}
                                    style={{
                                        backgroundColor: "transparent",
                                        borderWidth: 1,
                                        height: 40,
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        paddingHorizontal: 4,
                                        borderRadius: 4,
                                        maxWidth: '80%'
                                    }}
                                />
                            )}
                        />
                    </View>
                    <View style={{ width: 130 }}>
                        <Text style={styles.textTitle}>Km Rodados</Text>
                        <Controller
                            control={control}
                            name='km'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <InputForm
                                    placeholder='Ex: 23.900...'
                                    keyboardType='numeric'
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    error={errors.km?.message}
                                    style={{
                                        backgroundColor: "transparent",
                                        borderWidth: 1,
                                        height: 40,
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        paddingHorizontal: 4,
                                        borderRadius: 4,
                                        maxWidth: '80%'
                                    }}
                                />
                            )}
                        />
                    </View>
                </View>

                <Text style={styles.textTitle}>Cidade</Text>
                <Controller
                    control={control}
                    name='city'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            placeholder='Ex: Salvador...'
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.city?.message}
                        />
                    )}
                />

                <Text style={styles.textTitle}>Whatsapp</Text>
                <Controller
                    control={control}
                    name='whatsapp'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            placeholder='Digite seu whatsapp aqui...'
                            value={value}
                            onBlur={onBlur}
                            keyboardType='numeric'
                            onChangeText={onChange}
                            error={errors.whatsapp?.message}
                            style={{
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                height: 40,
                                paddingTop: 8,
                                paddingBottom: 8,
                                paddingHorizontal: 4,
                                borderRadius: 4,
                                maxWidth: '70%'
                            }}
                        />
                    )}
                />

                <Text style={styles.textTitle}>Preço</Text>
                <Controller
                    control={control}
                    name='price'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            placeholder='Preço da moto...'
                            value={value}
                            onBlur={onBlur}
                            keyboardType='numeric'
                            onChangeText={onChange}
                            error={errors.price?.message}
                            style={{
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                height: 40,
                                paddingTop: 8,
                                paddingBottom: 8,
                                paddingHorizontal: 4,
                                borderRadius: 4,
                                maxWidth: '70%'
                            }}
                        />
                    )}
                />
                <Text style={styles.textTitle}>Descição do carro</Text>
                <Controller
                    control={control}
                    name='descripition'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputForm
                            placeholder='Descrição da moto'
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            error={errors.descripition?.message}
                            multiline={true}
                            numberOfLines={5}
                            style={{
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                height: 100,
                                paddingTop: 8,
                                paddingBottom: 8,
                                paddingHorizontal: 4,
                                borderRadius: 4,
                                textAlignVertical: 'top'
                            }}
                        />
                    )}
                />

                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(onSubmit)}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cadastrar</Text>
                </TouchableOpacity>

                <Modal animationType='fade' transparent={false} visible={modalVisible}>
                    <ModalForm imageUri={imageUri} onCloseModal={() => setModalVisible(false)} deleteImage={handldeDelete} />
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f5f8',
        paddingLeft: 14,
        paddingRight: 14,
    },
    areaImage: {
        width: '100%',
        marginTop: 14,
        padding: 8,
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: "#FFFF",
        gap: 10
    },
    buttonUpload: {
        borderWidth: 1.9,
        borderColor: '#000000b7',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    inputArea: {
        width: '100%',
        marginTop: 14,
        padding: 8,
        backgroundColor: "#FFF",
        borderRadius: 8,
    },
    textTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000bc',
        paddingBottom: 5
    },
    btnLogin: {
        height: 45,
        width: '100%',
        marginTop: 14,
        padding: 8,
        backgroundColor: "#000",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})