import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { LogBox } from "react-native";

import AuthProvider from "./src/Context/AuthContext";
import { ToastProvider } from "./src/Context/ToastContext";

export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </AuthProvider>
  </NavigationContainer>
  );
}


