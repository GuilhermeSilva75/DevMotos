import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnectionn';

import InputLogin from '../../component/inputLogin';
const schema = z.object({
    email: z.string().email("Insira um email valido").nonempty('Email Obrigatório'),
    password: z.string().nonempty("Senha Obrigatório"),
    name: z.string().nonempty("Nome Obrigatório")
})

type FormData = z.infer<typeof schema>

export default function Register() {
    const { formState: { errors }, control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
    })

    async function hanldeCreate(data: FormData) {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                console.log('criou');
                
            })
            .catch((error) => {
                console.log(error);

            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.areaSubmit}>
                <Controller
                    control={control}
                    name='name'
                    rules={{
                        required: true
                    }}
                    render={({ field: { value, onBlur, onChange } }) => (
                        <InputLogin
                            placeholder='Digite seu nome...'
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            error={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='email'
                    rules={{
                        required: true
                    }}
                    render={({ field: { value, onBlur, onChange } }) => (
                        <InputLogin
                            placeholder='Digite seu email...'
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


                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit(hanldeCreate)}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
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