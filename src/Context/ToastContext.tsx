import { createContext, ReactNode, useState } from "react";
import Toast from "../component/toast";

interface ToastContextData {
    showToast: (message: string, type: TypeMessage) => void
}

type TypeMessage = "DEFALT" | "SUCCESS"

export interface MessageProps {
    message: string
    type: TypeMessage
}

export const ToastContext = createContext({} as ToastContextData)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<MessageProps[]>([])

    const showToast = (newMessage: string, type: TypeMessage) => {
        let message: MessageProps = {
            message: newMessage,
            type: type
        }

        setMessages((prevMessages) => [...prevMessages, message])
        setTimeout(() => {
            hideToast()
        }, 1000)
    }

    const hideToast = () => {
        setMessages((prevMessages) => prevMessages.slice(1))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
          {children}
          {messages.length > 0 && <Toast messages={messages} hideToast={hideToast} />}
        </ToastContext.Provider>
      )
}