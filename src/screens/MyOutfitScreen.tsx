import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import BackButton from '../components/BackButton';
import {WIDTH} from '../constants/layout';
import {getSuggestedOutfit} from '../constants/api';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

export default function MyOutfitScreen({route}: {route: any}) {
  const [myOutfit, setMyOutfit] = useState<any>(null);

  const fetchMyOutfit = async () => {
    const res = await getSuggestedOutfit(route?.params?.image);
    setMyOutfit(res);
  };

  useEffect(() => {
    fetchMyOutfit();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <BackButton />
        <Text style={styles.title}>Your Outfits</Text>
      </View>
      <ScrollView>
        {myOutfit ? (
          Object.keys(myOutfit).map((item, index) => {
            return (
              <View style={{marginTop: 16}} key={index}>
                <Text style={styles.labelText}>{item}</Text>
                <View style={styles.box}>
                  <Image
                    source={{
                      uri: route.params.image.uri,
                    }}
                    style={{...styles.img, height: 190}}
                  />
                  <View style={styles.subBox}>
                    <View style={{flexDirection: 'row', gap: 8}}>
                      {myOutfit[item].map((item: any, index: number) => {
                        console.log(item);
                        return (
                          <TouchableWithoutFeedback
                            style={{height: 184, width: 106}}
                            onPress={() =>
                              Linking.openURL(item.result[0].link)
                            }>
                            <Image
                              key={index}
                              source={{uri: item?.result[0]?.thumbnail}}
                              style={styles.img}
                            />
                          </TouchableWithoutFeedback>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <ActivityIndicator
            size={'large'}
            color={COLORS.buttonCta}
            style={{flex: 1, marginTop: 32}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.primaryText,
    letterSpacing: 0.2,
    width: WIDTH * 0.84,
  },
  box: {
    flexDirection: 'row',
    height: 190,
    width: '100%',
    gap: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 184,
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    color: COLORS.primaryText,
    fontWeight: '600',
    opacity: 0.8,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 18,
    color: COLORS.secondaryText,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  labelTemp: {
    fontSize: 16,
    color: COLORS.secondaryText,
    fontWeight: '500',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  subBox: {
    flex: 2,
    height: '100%',
    backgroundColor: COLORS.lightTab,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
