import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Colors from "@/constants/colors";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setText("");
    onSend(trimmed);
    inputRef.current?.focus();
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Ask for movie recommendations..."
          placeholderTextColor={Colors.purple.muted}
          multiline
          maxLength={500}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={handleSend}
          editable={!disabled}
        />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            onPress={handleSend}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={!canSend}
            style={[styles.sendBtn, canSend ? styles.sendBtnActive : styles.sendBtnDisabled]}
          >
            <Feather
              name="send"
              size={18}
              color={canSend ? Colors.neutral.white : Colors.purple.muted}
            />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: Platform.OS === "web" ? 8 : 4,
    backgroundColor: Colors.purple.darker,
    borderTopWidth: 1,
    borderTopColor: Colors.border + "50",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    backgroundColor: Colors.purple.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    color: Colors.neutral.white,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    maxHeight: 120,
    paddingTop: 6,
    paddingBottom: 6,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnActive: {
    backgroundColor: Colors.pink.primary,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.purple.surfaceLight,
  },
});
