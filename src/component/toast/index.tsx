import { Pressable, Text, StyleSheet, Animated, View } from 'react-native';
import { useRef, useEffect } from 'react';
import { MessageProps } from '../../Context/ToastContext';

interface ToastProps {
  messages: MessageProps[],
  hideToast: () => void
}

export default function Toast({ messages, hideToast }: ToastProps) {

  const AnimatedOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (messages) {
      Animated.timing(AnimatedOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }).start()
    }
  }, [messages])

  return (
    <Animated.View
      style={[styles.container,
      {
        opacity: AnimatedOpacity
      }
      ]}

    >
      {messages && messages.map((item, index) => (
        <Pressable
          key={index}
          style={[styles.toast, item.type === 'DEFALT' ? styles.default : styles.sucess]}
          onPress={hideToast}
        >
          <Text style={styles.toastText}>{item.message}</Text>
        </Pressable>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    marginLeft: 14,
    marginRight: 14
  },
  toast: {
    backgroundColor: "rgba(0,0,0, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
    borderRadius: 8
  },
  toastText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '500'
  },
  default: {
    backgroundColor: "rgba(0,0,0, 0.89)",
  },
  sucess: {
    backgroundColor: "rgba(0,184,95, 0.89)",
  }
})