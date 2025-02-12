import { View, StyleSheet, TextInput, TextInputProps, Text } from 'react-native';


type Props = {
    error?: string
} & TextInputProps



export default function InputForm({ children, error, ...rest }: Props) {
    return (
        <View>
            <TextInput
                style={styles.input}
                {...rest}
            />
            <Text style={{color: 'red'}}>{error}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        height: 40,
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 4,
        borderRadius: 4
    }
})