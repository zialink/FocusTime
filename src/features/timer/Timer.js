import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';

import { CountDown } from '../../components/CountDown';
import { colors } from '../../util/colors';
import { spacing } from '../../util/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

export const Timer = ({ focusSubject, resetFocusSubject, onTimerEnd }) => {
  useKeepAwake();

  const DEFAULT_TIME = 0.1;
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME)

  const onProgress = (progress) => {
    setProgress(progress);
  }

  const vibrate = () => {
    if(Platform === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 2000 );
      setTimeout(clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>
      <View style={styles.progressView}>
        <ProgressBar
          progress={progress}
          color={colors.darkBlue2}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton title="-" size={50} onPress={() => resetFocusSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    paddingTop: spacing.lg,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  progressBar: {
    height: 10,
  },
  progressView: {
    marginTop: spacing.lg,
  },
  clearSubject: {
    marginLeft: spacing.sm,
    marginBottom: spacing.md
  }
});
