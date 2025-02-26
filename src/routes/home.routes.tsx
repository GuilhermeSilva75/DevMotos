import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import Newmoto from "../pages/newmoto";
import Details from "../pages/details";

export type HomeParamList = {
    Home: undefined
    Newmoto: undefined
    Details: {
        id: string
    }
}

const Stack = createNativeStackNavigator<HomeParamList>()

export function HomeStack() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="Newmoto"
                component={Newmoto}
            />

            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}