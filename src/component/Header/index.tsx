import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Header() {

    const { user } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <View style={styles.areaPerfil}>
                <AntDesign name="user" size={24} color="white" />
            </View>
            <Text style={styles.text}>{user?.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        paddingLeft: 5,
        marginTop: 50,
        marginBottom: 28,
        height: 55,
        width: '56%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 5
    },
    areaPerfil: {
        backgroundColor: "#1f1f1f",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})