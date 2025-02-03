import { useContext } from "react";

import { AuthContext } from "../Context/AuthContext";
import { View, ActivityIndicator } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

export function Routes() {
    const { loadinAuth, signed } = useContext(AuthContext)

    if (loadinAuth) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#FFFF" }}>
                <ActivityIndicator
                    size='large'
                    color="#131313"
                />
            </View>
        )
    }
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}