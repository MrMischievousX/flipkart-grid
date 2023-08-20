import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LeftArrow} from '../assets/svgs';
import COLORS from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.goBack()}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
      }}>
      <LeftArrow />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
