import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/home';
import Favorites from '../pages/favorites';

export type TabParamList = {
    Home: undefined
    Favorites: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()


export default function AppRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Tab.Screen
                name='Favorites'
                component={Favorites}
                options={{
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}