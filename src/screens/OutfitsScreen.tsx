import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useContext, useEffect, useState} from 'react';
import {Add} from '../assets/svgs';
import {
  getInitialRecommendations,
  getMyOutfit,
  getSuggestedOutfit,
} from '../constants/api';
import {Context} from '../../App';

export default function OutfitsScreen({navigation}: {navigation: any}) {
  const [recommends, setRecommends] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(true);
  const ctx = useContext(Context);

  const getRecommends = async () => {
    setIsRefreshing(true);
    const data = await getInitialRecommendations();
    setRecommends(data);
    setIsRefreshing(false);
  };

  const getImage = async () => {
    const data = await ctx.pickImage();
    if (!data) return;
    const image = {
      name: data.fileName,
      type: data.type,
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    };

    navigation.navigate('myOutfit', {image: image});
  };

  useEffect(() => {
    // setRecommends(data);
    getRecommends();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        <Text style={styles.title}>Recommendations</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={getImage}>
          <Add />
        </TouchableOpacity>
      </View>
      {recommends ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={getRecommends}
              enabled
            />
          }
          contentContainerStyle={{paddingBottom: 72}}
          showsVerticalScrollIndicator={false}>
          {recommends && recommends.top && (
            <View style={{marginTop: 16}}>
              <Text style={styles.label}>Top</Text>
              {Object.keys(recommends?.top?.outfits[0]).map((item, index) => {
                const temp = recommends?.top?.outfits[0];
                return (
                  <View style={{marginTop: 16}} key={index}>
                    <Text style={styles.labelText}>{item}</Text>
                    <View style={styles.box}>
                      <Image
                        source={{
                          uri: `data:image/jpg;base64,${recommends?.top?.image}`,
                        }}
                        style={{...styles.img, height: 190}}
                      />
                      <View style={styles.subBox}>
                        <View style={{flexDirection: 'row', gap: 8}}>
                          {temp[item].map((item: any, index: number) => {
                            return (
                              <Image
                                key={index}
                                source={{uri: item?.result[0]?.thumbnail}}
                                style={styles.img}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          {recommends && recommends.bottom && (
            <View style={{marginTop: 16}}>
              <Text style={styles.label}>Bottom</Text>
              {Object.keys(recommends?.bottom?.outfits[0]).map(
                (item, index) => {
                  const temp = recommends?.bottom?.outfits[0];
                  return (
                    <View style={{marginTop: 16}} key={index}>
                      <Text style={styles.labelText}>{item}</Text>
                      <View style={styles.box}>
                        <Image
                          source={{
                            uri: `data:image/jpg;base64,${recommends?.bottom?.image}`,
                          }}
                          style={styles.img}
                        />
                        <View style={styles.subBox}>
                          <View style={{flexDirection: 'row', gap: 8}}>
                            {temp[item].map((item: any, index: number) => {
                              return (
                                <Image
                                  key={index}
                                  source={{uri: item?.result[0]?.thumbnail}}
                                  style={styles.img}
                                />
                              );
                            })}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                },
              )}
            </View>
          )}
          {recommends && recommends.shoes && (
            <View style={{marginTop: 16}}>
              <Text style={styles.label}>Shoes</Text>
              {Object.keys(recommends?.shoes?.outfits[0]).map((item, index) => {
                const temp = recommends?.shoes?.outfits[0];
                return (
                  <View style={{marginTop: 16}} key={index}>
                    <Text style={styles.labelText}>{item}</Text>
                    <View style={styles.box}>
                      <Image
                        source={{
                          uri: `data:image/jpg;base64,${recommends?.shoes?.image}`,
                        }}
                        style={styles.img}
                      />
                      <View style={styles.subBox}>
                        <View style={{flexDirection: 'row', gap: 8}}>
                          {temp[item].map((item: any, index: number) => {
                            return (
                              <Image
                                key={index}
                                source={{uri: item?.result[0]?.thumbnail}}
                                style={styles.img}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 32,
          }}>
          <ActivityIndicator size={'large'} color={COLORS.buttonCta} />
        </View>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.primaryText,
    letterSpacing: 0.2,
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
