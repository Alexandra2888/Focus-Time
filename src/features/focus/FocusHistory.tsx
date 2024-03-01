import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView, ListRenderItemInfo } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';

interface FocusHistoryItem {
  subject: string;
  status: number;
}

interface HistoryItemProps {
  item: FocusHistoryItem;
  index: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return <Text style={styles.historyItem}>{item.subject}</Text>;
};

interface FocusHistoryProps {
  focusHistory: FocusHistoryItem[];
  onClear: () => void;
}

export const FocusHistory: React.FC<FocusHistoryProps> = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={({ item, index }) => <HistoryItem item={item} index={index} />}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    color: colors.white,
    fontSize: fontSizes.md,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
