import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Register from "../pages/register";


export type StackParamList = {
    Login: undefined
    Register: undefined
    AppRoutes: undefined
    Newmoto: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

export default function AuthRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}