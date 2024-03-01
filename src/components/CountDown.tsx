import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

interface CountDownProps {
  minutes?: number;
  isPaused: boolean;
  onProgress: (progress: number) => void;
  onEnd: () => void;
}

const minutesToMillis = (min: number): number => min * 1000 * 60;
const formatTime = (time: number): string => (time < 10 ? `0${time}` : `${time}`);

export const CountDown: React.FC<CountDownProps> = ({
  minutes = 0.1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [millis, setMillis] = useState<number>(minutesToMillis(minutes));

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current!);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis, minutes, onProgress]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current !== null) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => {
      if (interval.current !== null) clearInterval(interval.current);
    };
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
