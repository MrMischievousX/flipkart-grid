import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import BackButton from '../components/BackButton';
import {WIDTH} from '../constants/layout';
import ClothItem from '../components/ClothItem';
import {Context} from '../../App';
import {useContext, useEffect, useRef, useState} from 'react';
import {getCloset} from '../constants/api';
import {getData} from '../constants/utils';
import {LIST} from '../constants/constants';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

export default function ImageOutfitScreen({navigation}: {navigation: any}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const ctx = useContext(Context);
  const fetchCloset = async () => {
    const data = await getCloset();
    ctx?.setOutfits(data);
  };

  useEffect(() => {
    fetchCloset();
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
        <Text style={styles.title}>Choose</Text>
      </View>

      <View style={{marginTop: 20}}>
        <FlatList
          horizontal
          data={LIST}
          contentContainerStyle={{gap: 12}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  flatRef.current?.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                  setActiveIndex(index);
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                  borderWidth: 0.3,
                  borderColor: COLORS.inActiveTab,
                  backgroundColor:
                    index == activeIndex ? COLORS.primaryText : COLORS.input,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color:
                      index == activeIndex ? COLORS.input : COLORS.primaryText,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList
        data={getData(ctx, activeIndex)}
        style={{marginTop: 24}}
        ref={flatRef}
        contentContainerStyle={{gap: 24, paddingBottom: 112}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        ListEmptyComponent={
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {ctx?.outfits ? (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: COLORS.secondaryText,
                  marginTop: 16,
                }}>
                Your Wardrobe is empty...
              </Text>
            ) : (
              <ActivityIndicator
                size={'large'}
                color={COLORS.buttonCta}
                style={{flex: 1, marginTop: 32}}
              />
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const uri = `data:image/jpg;base64,${item}`;
          return <ClothItem index={index} uri={uri} isOutfit={true} />;
        }}
      />
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
});
