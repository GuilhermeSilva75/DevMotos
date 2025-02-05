import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/home';
import Favorites from '../pages/favorites';
import Perfil from '../pages/perfil';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

export type TabParamList = {
    Home: undefined
    Favorites: undefined
    Perfil: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()


export default function AppRoutes() {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "#FFFF",
            tabBarStyle:{
                backgroundColor: '#000000',
                borderTopWidth: 0
            }
        }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: (({color, size}) => {
                        return <FontAwesome name="home" size={size} color={color} />
                    })
                }}
            />

            <Tab.Screen
                name='Favorites'
                component={Favorites}
                options={{
                    tabBarIcon: (({color, size}) => {
                        return <Feather name="bookmark" size={size} color={color} />
                    })
                }}
            />

            <Tab.Screen
                name='Perfil'
                component={Perfil}
                options={{
                    tabBarIcon: (({color, size}) => {
                        return <Feather name="user" size={size} color={color} />
                    })
                }}
            />
        </Tab.Navigator>
    );
}