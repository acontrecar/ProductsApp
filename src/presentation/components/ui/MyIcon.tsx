import { Icon, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  size?: number;
}

export const MyIcon = ({ name, color, white = false, size = 24 }: Props) => {
  const themes = useTheme();

  if (white) {
    color = themes["color-info-100"];
  } else if (!color) {
    color = themes["text-basic-color"];
  }

  return (
    <Icon
      style={[styles.icon, { width: size, height: size }]}
      fill={color}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
