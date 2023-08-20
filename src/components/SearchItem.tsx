import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  index: number;
  item: any;
}

const SearchItem = ({index, item}: Props) => {
  // {"current_price": 469, "discounted": true, "link": "https://www.flipkart.com/ftx-solid-men-round-neck-silver-blue-black-grey-t-shirt/p/itm39275afebb5b2", "name": "Pack of 4 Men Solid Round Neck Polyester Silver, Blue, ...", "original_price": 1499, "query_url": "https://flipkart.dvishal485.workers.dev/product/ftx-solid-men-round-neck-silver-blue-black-grey-t-shirt/p/itm39275afebb5b2", "thumbnail": "https://rukminim2.flixcart.com/image/612/612/l3j2cnk0/t-shirt/2/w/p/l-723-2-5-7-8-ftx-original-imagemgrpafdug8v.jpeg?q=70"}
  return (
    <View style={{width: '46%'}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Linking.openURL(item?.link)}
        style={{width: '100%'}}>
        <View
          style={{
            borderRadius: 10,
            height: 200,
            overflow: 'hidden',
            backgroundColor: COLORS.white,
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
            position: 'relative',
          }}>
          <Image
            source={{uri: item?.thumbnail}}
            style={{resizeMode: 'center', width: '100%', height: '100%'}}
          />
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {item?.name}
        </Text>
        <View style={styles.priceBox}>
          <Text style={styles.price}>Rs</Text>
          <Text style={styles.priceCut}>{item?.original_price}</Text>
          {/* <Text style={styles.price}>{item?.current_price}</Text> */}
          <Text style={styles.price}>{'FREE'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 4,
    color: COLORS.secondaryText,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 4,
    color: COLORS.secondaryText,
  },
  priceCut: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 4,
    color: COLORS.secondaryText,
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
  priceBox: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});
