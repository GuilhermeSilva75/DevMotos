import { View, Text, StyleSheet, DimensionValue, Pressable, Image, Alert } from 'react-native';
import { MotosProps } from '../../types/moto.type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeParamList } from '../../routes/home.routes';

interface MotoItemProps {
    data: MotosProps
    DimensionValue: DimensionValue
    enableRemove?: boolean
    removeItem?: () => Promise<void>
}


export default function MotoItem({ data, DimensionValue, enableRemove = false, removeItem }: MotoItemProps) {

    const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>()

    function handleNavigation() {
        navigation.navigate('Details', {id: data.id})
    }

    async function handleRemove() {
        if(!removeItem) return

        await removeItem();
    }

    return (
        <Pressable 
        style={[styles.container, { width: DimensionValue }]} 
        onPress={handleNavigation}
        onLongPress={enableRemove ? handleRemove : () => {}}
        >
            <Image
                style={styles.cover}
                source={{ uri: data.images }}
                resizeMode='cover'
            />

            <Text style={styles.title}>R$ {data.price}</Text>
            <Text style={styles.text}>Km:{data.km} - {data.year}</Text>
            <Text style={[styles.title, { marginTop: 6 }]}>{data.name}</Text>

            <View style={styles.divisor}></View>
            <Text style={[styles.text, { marginTop: 4 }]}>{data.city}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#FFF",
        padding: 4,
        borderRadius: 4,
        marginBottom: 14
    },
    cover: {
        width: '100%',
        height: 140,
        borderRadius: 4,
        marginBottom: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16
    },
    text: {
        marginBottom: 12,
        fontSize: 14,
        fontWeight: '400'
    },
    divisor: {
        height: 1,
        backgroundColor: "#d9d9d9",
        width: '100%'
    }
})