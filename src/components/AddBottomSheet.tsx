import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import COLORS from '../constants/colors';

const AddBottomSheet = ({
  bottomSheetRef,
  closeFnc,
}: {
  bottomSheetRef: any;
  closeFnc: any;
}) => {
  // variables
  const snapPoints = useMemo(() => ['25%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={0}
        onClose={closeFnc}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.transparent,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AddBottomSheet;
