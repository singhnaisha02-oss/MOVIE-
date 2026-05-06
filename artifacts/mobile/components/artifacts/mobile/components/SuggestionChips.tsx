import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/colors";

const SUGGESTIONS = [
  "What's trending now?",
  "Best sci-fi movies",
  "Romantic comedies",
  "Action thrillers",
  "Classic horror films",
  "Award-winning dramas",
  "Animated movies for adults",
  "Hidden gem indie films",
];

interface Props {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ onSelect, disabled }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {SUGGESTIONS.map((suggestion) => (
        <TouchableOpacity
          key={suggestion}
          onPress={() => !disabled && onSelect(suggestion)}
          style={[styles.chip, disabled && styles.chipDisabled]}
          activeOpacity={0.7}
        >
          <Text style={styles.chipText}>{suggestion}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    backgroundColor: Colors.purple.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.pink.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipDisabled: { opacity: 0.5 },
  chipText: {
    color: Colors.pink.light,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
