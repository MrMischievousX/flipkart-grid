import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import ClothItem from '../components/ClothItem';
import {LIST} from '../constants/constants';
import {Context} from '../../App';
import {getCloset, getOutfits} from '../constants/api';
import CustomModal from '../components/CustomModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Add} from '../assets/svgs';
import OutfitItem from '../components/OutfitItem';
import {getData} from '../constants/utils';

export default function WardrobeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const ctx = useContext(Context);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const flatRef = useRef<FlatList>(null);

  // variables

  // callbacks
  const handlePresentModalPress = async () => {
    if (!ctx?.outfits) return;
    bottomSheetModalRef.current?.present();
    await fetchOutfits();
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const fetchOutfits = async () => {
    const data = await getOutfits();
    setSuggestions(data);
  };

  const fetchCloset: any = async () => {
    setIsRefreshing(true);
    const data = await getCloset();
    ctx?.setOutfits(data);
    setIsRefreshing(false);
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
        <Text style={styles.title}>My Wardrobe</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSuggestions(null);
            handlePresentModalPress();
          }}>
          <Add />
        </TouchableOpacity>
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
                  borderColor: COLORS.grey,
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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getCloset}
            enabled
            style={{marginBottom: 16}}
          />
        }
        data={getData(ctx, activeIndex)}
        style={{marginTop: 24}}
        ref={flatRef}
        contentContainerStyle={{gap: 24, paddingBottom: 112}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        ListEmptyComponent={
          <>
            {isRefreshing && (
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
            )}
          </>
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const uri = `data:image/jpg;base64,${item}`;
          return <ClothItem index={index} uri={uri} isOutfit={true} />;
        }}
      />
      <CustomModal
        handleSheetChanges={handleSheetChanges}
        bottomSheetModalRef={bottomSheetModalRef}>
        {suggestions ? (
          <OutfitItem
            img1={`data:image/jpg;base64,${suggestions?.top[0]}`}
            img2={`data:image/jpg;base64,${suggestions?.bottom[0]}`}
            img3={`data:image/jpg;base64,${suggestions?.shoes[0]}`}
          />
        ) : (
          <ActivityIndicator
            size={'large'}
            color={COLORS.buttonCta}
            style={{flex: 1}}
          />
        )}
      </CustomModal>
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
  },
});
