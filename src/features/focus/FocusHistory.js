import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { spacing, fontSize } from '../../util/sizes';
import { colors } from '../../util/colors';
import { RoundedButton } from '../../components/RoundedButton'

const HistoryItem = ({ item, index }) => {
    console.log(item);
  return (
    <Text
      key={item.id}
      style={[
        styles.historyItem,
        item.status > 1 ? { color: colors.red } : { color: colors.green },
      ]}>
      {item.focusSubject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Topics to focus on </Text>
            <FlatList
              style={{ flex: 0.5 }}
              contentContainerStyle={{ flex: 0.5, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={(item) => item.status}
            />
            <RoundedButton size={75} title="Clear" style={styles.roundedButton} onPress={() => onClear() } />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    fontSize: fontSize.md,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.lg,
  },
  roundedButton: {
    marginBottom: spacing.lg,
  }
});
