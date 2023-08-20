import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import {Search} from '../assets/svgs';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ClothItem from '../components/ClothItem';
import {useEffect, useState} from 'react';
import {getNewArrivals, getSimilars} from '../constants/api';
import {HEIGHT} from '../constants/layout';

interface Props {
  navigation: any;
}

export default function HomeScreen({navigation}: Props) {
  const [arrivals, setArrivals] = useState<any>([]);
  const [similars, setSimilars] = useState<any>(null);

  const goToSearch = async () => {
    navigation.navigate('search');
  };

  const fetchHome = async () => {
    const data = await getNewArrivals();
    setArrivals(data);
  };

  const fetchSimilars = async () => {
    const data = await getSimilars();
    setSimilars(data);
  };

  useEffect(() => {
    fetchHome();
    fetchSimilars();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.title}>Akash</Text>
          <Text style={styles.subTitle}>Welcome to OutfitCraft.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToSearch}
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.buttonCta,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Search color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {arrivals.length <= 0 && !similars && (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: HEIGHT * 0.2,
          }}>
          <ActivityIndicator size={'large'} color={COLORS.buttonCta} />
        </View>
      )}
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0, 2, 4, 6]}
        style={{marginTop: 8}}
        contentContainerStyle={{paddingBottom: 72}}>
        {arrivals.length > 0 && (
          <View style={styles.container}>
            <Text style={styles.label}>New Arrivals</Text>
          </View>
        )}
        <View style={styles.box}>
          {arrivals?.map((item: any, index: number) => {
            return (
              <ClothItem index={index} uri={item?.thumbnail} key={index} />
            );
          })}
        </View>
        {similars && (
          <View style={styles.container}>
            <Text style={styles.label}>Similar to your Bottoms Collection</Text>
          </View>
        )}
        <View style={styles.box}>
          {similars &&
            similars?.bottom?.result?.map((item: any, index: number) => {
              return (
                <ClothItem index={index} uri={item?.thumbnail} key={index} />
              );
            })}
        </View>
        {similars && (
          <View style={styles.container}>
            <Text style={styles.label}>Similar to your Shoes Collection</Text>
          </View>
        )}
        <View style={styles.box}>
          {similars &&
            similars?.shoes?.result?.map((item: any, index: number) => {
              return (
                <ClothItem index={index} uri={item?.thumbnail} key={index} />
              );
            })}
        </View>
        {similars && (
          <View style={styles.container}>
            <Text style={styles.label}>Similar to your Tops Collection</Text>
          </View>
        )}
        <View style={styles.box}>
          {similars &&
            similars?.top?.result?.map((item: any, index: number) => {
              return (
                <ClothItem index={index} uri={item?.thumbnail} key={index} />
              );
            })}
        </View>
      </ScrollView>

      {/* <FlatList
        data={arrivals}
        
       
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return ;
        }}
      /> */}
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
  container: {
    backgroundColor: COLORS.background,
    paddingBottom: 8,
    marginTop: 16,
  },
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 16,
  },
  label: {
    fontSize: 20,
    color: COLORS.primaryText,
    fontWeight: '600',
    opacity: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.primaryText,
    letterSpacing: 0.2,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.secondaryText,
    marginTop: 4,
  },
});
