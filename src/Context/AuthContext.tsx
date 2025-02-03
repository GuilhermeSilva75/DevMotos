import { createContext, ReactNode, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnectionn";


interface AuthProviderProps {
    children: ReactNode
}

export type AuthContextData = {
    signed: boolean
    loadinAuth: boolean
    user: UserProps | null
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
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })

                setLoadingAuth(false)
            } else {
                setUser(null)
                setLoadingAuth(false)
            }
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                loadinAuth,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider