import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Register from "../pages/register";
import AppRoutes from "./app.routes";

export type StackParamList = {
    Login: undefined
    Register: undefined
    AppRoutes: undefined
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

            <Stack.Screen
                name="AppRoutes"
                component={AppRoutes}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}