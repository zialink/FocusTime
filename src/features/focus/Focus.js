import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, spacing } from '../../util/sizes';
import { colors } from '../../util/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Enter a subject you want to focus on</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              if (subject) {
                const CapitalizedSubject =
                  subject.trim().charAt(0).toUpperCase() + subject.substr(1);
                addSubject(CapitalizedSubject);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing.sm,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.md,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
