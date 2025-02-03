import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';

type Props = {
    error?: string
} & TextInputProps

export default function InputLogin({ children, error, ...rest }: Props) {
    return (
        <View>
            <TextInput
                style={styles.input}
                {...rest}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#878787',
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 10
    }
})