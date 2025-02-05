import { createContext, ReactNode, useState, useEffect } from "react";
import { Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnectionn";


interface AuthProviderProps {
    children: ReactNode
}

export type AuthContextData = {
    signed: boolean
    loadinAuth: boolean
    user: UserProps | null
    handleInfo: ({ name, email, uid }: UserProps) => void
}

interface UserProps {
    uid: string
    name: string | null
    email: string | null
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps | null>(null)
    const [loadinAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        async function onSubUser() {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser({
                        email: user.email,
                        name: user.displayName,
                        uid: user.uid
                    })
                    setLoadingAuth(false)
                    // Alert.alert('Chamou')

                } else {

                    // Alert.alert('Chamou')
                    setUser(null)
                    setLoadingAuth(false)
                }
            })
        }

        onSubUser()

    }, [])

    function handleInfo({ name, email, uid }: UserProps) {
        setUser({
            name,
            email,
            uid
        })
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                loadinAuth,
                user,
                handleInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider