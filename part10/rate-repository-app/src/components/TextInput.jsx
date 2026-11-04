import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    marginVertical: 6,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const inputStyle = [styles.input, error && styles.errorBorder, style];

  return <NativeTextInput style={inputStyle} {...props} />;
};

export default TextInput;
