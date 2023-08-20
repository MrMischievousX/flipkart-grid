import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import COLORS from '../constants/colors';

const CustomModal = ({
  children,
  bottomSheetModalRef,
  handleSheetChanges,
}: {
  children: any;
  bottomSheetModalRef: any;
  handleSheetChanges: any;
}) => {
  // ref
  const snapPoints = useMemo(() => ['30%'], []);

  // renders
  return (
    <BottomSheetModal
      enableDismissOnClose
      ref={bottomSheetModalRef}
      index={0}
      style={{borderWidth: 1, borderColor: COLORS.grey, borderRadius: 16}}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      {children}
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomModal;
