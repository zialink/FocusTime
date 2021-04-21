import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { fontSize, spacing } from '../util/sizes'
import { colors } from '../util/colors'

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time

export const CountDown = ({
  minutes,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if(time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;
    })
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    //report progress
      onProgress(millis/minutesToMillis(minutes));
    if(millis === 0) {
        onEnd();
    }
  },[millis])

  useEffect(() => {
    if(isPaused) {
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused])

  const minute = Math.floor(millis/1000/60) % 60;
  const seconds = Math.floor(millis/1000) % 60;
  return (
      <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxxxl,
    color: colors.white,
    fontWeight: "bold",
    padding: spacing.xl,
    textAlign: "center",
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  }
})