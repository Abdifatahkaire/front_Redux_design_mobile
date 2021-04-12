import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InscrireLivreur from '../screens/InscrireLivreur';
import InscrireUser from '../screens/InscrireUser';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import addButtongreen from '../Image/add_color.png';
import addButtonGray from '../Image/add_color_gray.png';
import {  BottomTabBar } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';
import { Platform, Keyboard } from 'react-native';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();



function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Utilisateurs';

  switch (routeName) {
    case 'Utilisateurs':
      return 'Ajouter un utilisateur';
    case 'Livreur':
      return 'Ajouter un livreur';
    
  }
}

class MyTabBar extends React.Component {


  constructor(props){
    super(props);
    this.state={
      visible: true,
      
    }
    this.visible=this.visible.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true))
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners && this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }
  visible = visible => () => this.setState({visible:visible});

render(){
  if (!this.state.visible) {
    return null;
  } else {
  return (
    <View  style={{ flexDirection: 'row' }}>
      {this.props.state.routes.map((route, index) => {
        const { options } = this.props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        

        const isFocused = this.props.state.index === index;

        const onPress = () => {
          const event = this.props.navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            this.props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          this.props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1}}
            key={route.key}
            elevation={6}
           
          >
            {isFocused ? 
            <View elevation={0.5} style={{alignItems:'center',paddingTop:10}}>
              <View style={{alignItems:'center'}}>
                <View>
                  <Image source={addButtongreen} />
                </View>
                
            <Text style={{ color:'#63ff9e'  }}>
              {label}
            </Text></View>
            </View>: 
            <View elevation={0.5} style={{alignItems:'center',paddingTop:10}}>
              <View style={{alignItems:'center'}}>
                <View>
                  <Image source={addButtonGray} />  
                </View>
              <Text style={{ color: '#535070'}}>
              {label}
            </Text></View>
            </View>
             }
            
          </TouchableOpacity>
        );
      })}
    </View>
  );
    }
}
}


function MyTabsInscription({ navigation, route }) {

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <Tab.Navigator tabBarOptions={{keyboardHidesTabBar: true}} tabBar={props => <MyTabBar {...props}  />}>
      <Tab.Screen name="Utilisateurs" component={InscrireUser}  />
      <Tab.Screen name="Livreur" component={InscrireLivreur}/>
    </Tab.Navigator>
  );
}





export default MyTabsInscription;
    