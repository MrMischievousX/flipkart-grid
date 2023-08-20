import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {searchQuery} from '../constants/api';
import BackButton from '../components/BackButton';
import SearchItem from '../components/SearchItem';
import {HEIGHT, WIDTH} from '../constants/layout';
import data from '../../temp.json';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState<any[]>([]);

  useEffect(() => {
    initialSearch('men fashion');
  }, []);

  const initialSearch = async (search: string) => {
    const data = await searchQuery(search);
    setSearchData(data);
    setLoading(false);
  };

  const getSearch = async () => {
    if (query.length < 6) return;
    setLoading(true);
    const data = await searchQuery(query);
    setSearchData(data);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <BackButton />
        <TextInput
          style={{
            width: '90%',
            height: 50,
            backgroundColor: COLORS.input,
            borderRadius: 12,
            paddingHorizontal: 16,
            fontSize: 16,
            color: COLORS.secondaryText,
          }}
          value={query}
          onChangeText={e => setQuery(e)}
          placeholder="Search..."
          onSubmitEditing={getSearch}
          placeholderTextColor={COLORS.secondaryText}
        />
      </View>
      {loading && (
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
      <FlatList
        data={searchData}
        style={{marginTop: 16}}
        contentContainerStyle={{gap: 24}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return <SearchItem index={index} item={item} />;
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
    height: HEIGHT,
    width: WIDTH,
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
