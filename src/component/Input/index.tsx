import { Text, TextInput, TextInputProps, View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    error?: string
} & TextInputProps

export default function Input({ children, error, ...rest }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                {...rest}
            />

            <TouchableOpacity style={styles.button}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        
    },
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        height: 40,
        width: '85%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 4,
        borderRadius: 4
    },
    button: {
        backgroundColor: "#1f1f1f",
        width: 40,
        height: 40,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center'
    }
})