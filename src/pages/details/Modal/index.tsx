import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';

interface ModalProps {
    image: any
    onCloseModal: () => void
}

export default function ModalDetail({ image, onCloseModal }: ModalProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.botao} activeOpacity={1} onPress={onCloseModal}>
            </TouchableOpacity>

            <View style={styles.image}>
                <Image
                    style={{ width: '100%', height: 200 }}
                    resizeMode='contain'
                    source={{uri: image}}
                />
            </View>

            <TouchableOpacity style={styles.botao} activeOpacity={1} onPress={onCloseModal}>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.9)"
    },
    botao: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.9)",
        zIndex: 9,
        opacity: 3

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
