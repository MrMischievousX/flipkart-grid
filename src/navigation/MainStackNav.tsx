import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNav from './BottomTabNav';
import SearchScreen from '../screens/SearchScreen';
import ImageOutfitScreen from '../screens/ImageOutfitScreen';
import MyOutfitScreen from '../screens/MyOutfitScreen';

const Stack = createStackNavigator();

export default function MainStackNav() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="bottomTabNav">
          <Stack.Screen component={BottomTabNav} name="bottomTabNav" />
          <Stack.Screen component={SearchScreen} name="search" />
          <Stack.Screen component={ImageOutfitScreen} name="choose" />
          <Stack.Screen component={MyOutfitScreen} name="myOutfit" />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
