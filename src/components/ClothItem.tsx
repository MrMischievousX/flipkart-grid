import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import {CLOTHES} from '../constants/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  index: number;
  uri?: string;
  isOutfit?: boolean;
}

const ClothItem = ({index, uri, isOutfit = false}: Props) => {
  return (
    <View
      style={{
        borderRadius: 10,
        width: '46%',
        height: 200,
        overflow: 'hidden',
        backgroundColor: COLORS.input,
        borderWidth: 1,
        borderColor: COLORS.grey,
        shadowColor: COLORS.grey,
        shadowOffset: {
          width: 12,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
      }}>
      <Image
        source={{uri}}
        style={{resizeMode: 'contain', width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default ClothItem;

const styles = StyleSheet.create({});
