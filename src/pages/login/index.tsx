import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/auth.routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnectionn';


import InputLogin from '../../component/inputLogin';

const schema = z.object({
    email: z.string().email("Insira um email valido").nonempty('Email Obrigatório'),
    password: z.string().nonempty("Senha Obrigatório")
})

type FormData = z.infer<typeof schema>


export default function Login() {

    const { formState: { errors }, control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
    })

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    async function handleLogin(data: FormData) {
        await signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                navigation.navigate('AppRoutes')

            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/WebMotos.png')}
                style={{ width: 400, height: 70, marginBottom: 55 }}
                resizeMode='cover'
            />

            <View style={styles.areaSubmit}>
                <Controller
                    control={control}
                    name='email'
                    rules={{
                        required: true
                    }}
                    render={({ field: { value, onBlur, onChange } }) => (
                        <InputLogin
                            placeholder='Email'
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='password'
                    rules={{
                        required: true
                    }}
                    render={({ field: { value, onBlur, onChange } }) => (
                        <InputLogin
                            placeholder='*********'
                            secureTextEntry
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.password?.message}
                        />
                    )}
                />


                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(handleLogin)}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Acessar</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: '#000', marginTop: 50 }}>Ainda não possui uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F3F5F8"
    },
    areaSubmit: {
        width: '85%',
    },
    input: {
        borderBottomColor: '#878787',
        borderBottomWidth: 1,
        fontSize: 18
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