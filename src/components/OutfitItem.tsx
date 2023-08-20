import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import {img1, img2, img3} from '../assets/images';

const OutfitItem = (props: any) => {
  const a = props?.img1 ? {uri: props?.img1} : img1;
  const b = props?.img2 ? {uri: props?.img2} : img2;
  const c = props?.img3 ? {uri: props?.img3} : img3;

  return (
    <View
      style={{
        padding: 8,
        borderRadius: 10,
        height: 184,
        width: '100%',
        backgroundColor: COLORS.input,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
      }}>
      <View style={styles.box}>
        <Image source={a} style={styles.img} />
      </View>
      <View style={styles.box}>
        <Image source={b} style={styles.img} />
      </View>
      <View style={styles.box}>
        <Image source={c} style={styles.img} />
      </View>
    </View>
  );
};

export default OutfitItem;

const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  box: {
    borderRadius: 10,
    height: '100%',
    overflow: 'hidden',
    flex: 1,
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
  },
});
