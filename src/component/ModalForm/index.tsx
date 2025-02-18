import { View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Text } from 'react-native';

interface ModalProps {
    imageUri: any
    onCloseModal: () => void
    deleteImage: Function
}

export default function ModalForm({ imageUri, onCloseModal, deleteImage }: ModalProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.botao} activeOpacity={1} onPress={onCloseModal}>
            </TouchableOpacity>

            <View style={styles.image}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    resizeMode='contain'
                    source={{ uri: imageUri }}
                />

                <TouchableOpacity style={styles.trashButton} onPress={() => deleteImage()}>
                    <Text style={{fontWeight: 'bold'}}>Excluir</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botao} activeOpacity={1} onPress={onCloseModal}>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    botao: {
        flex: 1,
        backgroundColor: 'gray',
        zIndex: 9,
        opacity: 3

    },
    content: {
        paddingTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'red',
        flex: 0.210,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.8

    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        opacity: 1,
    },
    trashButton: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 12,
        borderRadius: 6
    }
})