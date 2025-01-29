import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import Register from "../pages/register";

export type StackParamList = {
    Login: undefined
    Register: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

export default function Routes() {
    return (
        <Stack.Navigator
        screenOptions={{
           headerShown: false 
        }}
        >
            
            <Stack.Screen
                name="Login"
                component={Login}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}