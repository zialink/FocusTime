import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/util/colors";
import { spacing } from "./src/util/sizes";

export default function App() {
  const STATUSES = {
    COMPLETED: 1,
    CANCELLED: 2,
  };

  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (focusSubject, status) => {
    setFocusHistory([
      ...focusHistory,
      { id: String(focusHistory.length + 1), focusSubject, status },
    ]);
  };

  const resetFocusSubject = () => {
    addFocusHistory(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };
  const onTimerEnd = () => {
    addFocusHistory(focusSubject, STATUSES.COMPLETED);
    setFocusSubject(null);
  };
  const onClear = async () => {
    try {
      await AsyncStorage.removeItem("focusHistory");
      setFocusHistory([]);
    } catch (e) {
      console.log(e);
    }
  };
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          resetFocusSubject={resetFocusSubject}
          onTimerEnd={onTimerEnd}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: spacing.xl,
  },
});
