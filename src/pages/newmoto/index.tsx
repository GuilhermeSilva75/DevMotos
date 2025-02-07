import { View, Text, StyleSheet } from 'react-native';

export default function Newmoto() {
    return (
        <View style={styles.container}>
            <Text>Tela cretae</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})