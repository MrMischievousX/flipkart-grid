import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import ROUTES from '../constants/routes';
import COLORS from '../constants/colors';
import {HEIGHT, TABICONSIZE, WIDTH} from '../constants/layout';
import {
  AddIcon,
  HomeIcon,
  OutfitsIcon,
  ProfileIcon,
  WardrobeIcon,
} from '../assets/custom';
import WardrobeScreen from '../screens/WardrobeScreen';
import OutfitsScreen from '../screens/OutfitsScreen';
import {useContext, useState} from 'react';
import {Context} from '../../App';
import {ActivityIndicator, Platform, View} from 'react-native';
import {getMyOutfit} from '../constants/api';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  const [loading, setLoading] = useState(false);

  const ctx = useContext(Context);

  const getImage = async () => {
    setLoading(true);
    const data = await ctx.pickImage();
    if (!data) return;
    const image = {
      name: data.fileName,
      type: data.type,
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    };

    const temp = await getMyOutfit(image);
    setLoading(false);
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName={ROUTES.home}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: COLORS.activeTab,
          tabBarInactiveTintColor: COLORS.inActiveTab,
          tabBarStyle: {
            backgroundColor: COLORS.tab,
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 32,
            marginHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            height: 56,
          },
          tabBarItemStyle: {
            height: 56,
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name={ROUTES.home}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <HomeIcon color={color} size={TABICONSIZE} />;
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.wardrobe}
          component={WardrobeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <WardrobeIcon color={color} size={TABICONSIZE} />;
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.add}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <AddIcon color={color} size={TABICONSIZE + 16} />;
            },
          }}
          listeners={{
            tabPress: e => {
              // showBottomSheet();
              getImage();
              e.preventDefault();
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.outfits}
          component={OutfitsScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <OutfitsIcon color={color} size={TABICONSIZE} />;
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.profile}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return <ProfileIcon color={color} size={TABICONSIZE} />;
            },
          }}
        />
      </Tab.Navigator>

      {loading && (
        <View
          style={{
            position: 'absolute',
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: COLORS.darkGrey,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={COLORS.cta} />
        </View>
      )}
    </>
  );
}
