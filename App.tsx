// In App.js in a new project

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createContext, useState} from 'react';
import {StatusBar} from 'react-native';
import COLORS from './src/constants/colors';
import MainStackNav from './src/navigation/MainStackNav';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {launchImageLibrary} from 'react-native-image-picker';

interface CtxProps {
  outfits: any;
  setOutfits: Function;
  pickImage: Function;
}

export const Context = createContext<CtxProps>({
  outfits: [],
  setOutfits: () => null,
  pickImage: () => null,
});

export default function App() {
  const [outfits, setOutfits] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result && result?.assets) {
      return result?.assets[0];
    } else return null;
  };

  return (
    <Context.Provider value={{outfits, setOutfits, pickImage}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider style={{flex: 1}}>
            <MainStackNav />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Context.Provider>
  );
}
