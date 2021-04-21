import React, {useState} from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';


import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/util/colors';
import { spacing } from './src/util/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState("Prayer");
  return (
    <View style={styles.container}>
      {focusSubject ? (<Timer focusSubject={focusSubject} />) : (<Focus addSubject={setFocusSubject} />)}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  }
});
