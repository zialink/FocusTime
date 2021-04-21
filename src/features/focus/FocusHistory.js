import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { spacing, fontSize } from '../../util/sizes';
import { colors } from '../../util/colors';

const HistoryItem = ({ item, index }) => {
  return (
    <Text
      key={item.status}
      style={[
        styles.historyItem,
        item.status > 1 ? { color: colors.red } : { color: colors.green },
      ]}>
      {item.focusSubject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => onClear();

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}> Topics to focus on </Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={(item) => item.status}
            />
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
});
