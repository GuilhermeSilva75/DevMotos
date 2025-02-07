import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../pages/favorites';
import Perfil from '../pages/perfil';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { HomeStack } from './home.routes';


export type TabParamList = {
    Favorites: undefined
    Perfil: undefined
    HomeStack: undefined
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
                name='HomeStack'
                component={HomeStack}
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