import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import Newmoto from "../pages/newmoto";

export type HomeParamList ={
    Home: undefined
    Newmoto: undefined
}

const Stack = createNativeStackNavigator<HomeParamList>()

export function HomeStack() {
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >

            <Stack.Screen
            name="Home"
            component={Home}
            />


            <Stack.Screen
            name="Newmoto"
            component={Newmoto}
            />
        </Stack.Navigator>
    )    
}