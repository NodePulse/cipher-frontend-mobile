import React, { forwardRef, useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  hintStyle?: StyleProp<TextStyle>;
  focusedBorderColor?: string;
}

export const Input = forwardRef<React.ComponentRef<typeof TextInput>, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onPressLeftIcon,
      onPressRightIcon,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      labelStyle,
      errorStyle,
      hintStyle,
      focusedBorderColor,
      placeholderTextColor,
      style,
      onFocus,
      onBlur,
      editable = true,
      ...restProps
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus: TextInputProps['onFocus'] = e => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = e => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const getBorderColor = () => {
      if (error) {
        return theme.danger;
      }
      if (isFocused) {
        return focusedBorderColor || theme.primary;
      }
      return theme.surfaceBorder;
    };

    const renderLeftIcon = () => {
      if (!leftIcon) {
        return null;
      }

      if (onPressLeftIcon) {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressLeftIcon}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.iconButton, styles.leftIcon, leftIconContainerStyle]}
          >
            {leftIcon}
          </TouchableOpacity>
        );
      }

      return (
        <View
          style={[styles.iconContainer, styles.leftIcon, leftIconContainerStyle]}
          pointerEvents="none"
        >
          {leftIcon}
        </View>
      );
    };

    const renderRightIcon = () => {
      if (!rightIcon) {
        return null;
      }

      if (onPressRightIcon) {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressRightIcon}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[styles.iconButton, styles.rightIcon, rightIconContainerStyle]}
          >
            {rightIcon}
          </TouchableOpacity>
        );
      }

      return (
        <View
          style={[styles.iconContainer, styles.rightIcon, rightIconContainerStyle]}
          pointerEvents="none"
        >
          {rightIcon}
        </View>
      );
    };

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? (
          <Text
            style={[
              styles.label,
              { color: theme.textSecondary },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : null}

        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.surfaceLight,
              borderColor: getBorderColor(),
            },
            !editable && styles.disabledContainer,
            inputContainerStyle,
          ]}
        >
          {renderLeftIcon()}

          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor={placeholderTextColor ?? theme.textMuted}
            style={[
              styles.input,
              { color: theme.text },
              inputStyle,
              style,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...restProps}
          />

          {renderRightIcon()}
        </View>

        {error ? (
          <Text style={[styles.errorText, { color: theme.danger }, errorStyle]}>
            {error}
          </Text>
        ) : hint ? (
          <Text style={[styles.hintText, { color: theme.textMuted }, hintStyle]}>
            {hint}
          </Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 0,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    marginTop: 4,
  },
  disabledContainer: {
    opacity: 0.6,
  },
});

export default Input;
