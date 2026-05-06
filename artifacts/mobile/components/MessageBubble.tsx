import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = boldParts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={j} style={styles.bold}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={j}>{part}</Text>;
      });
      return (
        <Text key={i} style={isUser ? styles.userText : styles.assistantText}>
          {rendered}
          {i < lines.length - 1 ? "\n" : ""}
        </Text>
      );
    });
  };

  return (
    <View style={[styles.row, isUser ? styles.userRow : styles.assistantRow]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🎬</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={isUser ? styles.userText : styles.assistantText}>
          {renderContent(message.content)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  userRow: {
    justifyContent: "flex-end",
  },
  assistantRow: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.purple.surface,
    borderWidth: 1,
    borderColor: Colors.pink.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarText: { fontSize: 16 },
  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: Colors.pink.primary,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: Colors.purple.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userText: {
    color: Colors.neutral.white,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
  assistantText: {
    color: Colors.neutral.offWhite,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Inter_400Regular",
  },
  bold: {
    fontFamily: "Inter_700Bold",
    color: Colors.pink.light,
  },
});
