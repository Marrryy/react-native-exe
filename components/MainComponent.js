import React, { Component } from 'react';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponents';

import { View, Platform, Text, StyleSheet, ScrollView, Image, NetInfo, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { createStackNavigator, createDrawerNavigator, DrawerItems,  } from 'react-navigation';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';
import logo from './images/logo.png';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuNavigator() {
  return (
    <Stack.Navigator
    // options={{
    //   title: 'Menu',
    //   headerStyle: {
    //     backgroundColor: "#512DA8"
    //   },
    //   headerTintColor: '#fff',
    //   headerTintStyle: { color: '#fff' }
    // }}
    >
      <Stack.Screen
        name="Menu"
        component={Menu} />
      {/* // options={({ navigation }) => ({
      //   headerLeft: <Icon name="menu"
      //     size={24}
      //     color="white"
      //     onPress={() => navigation.toggleDrawer()} />
      // })
      // }
     */}
      <Stack.Screen
        name="Dishdetail"
        component={Dishdetail}
        initialParams={{ dishId: '' }}
      />

    </Stack.Navigator>)
}


// const HomeNavigator = () => {
//   return (
//     <Stack.Navigator
//       options={{
//         title: 'Home',
//         headerStyle: {
//           backgroundColor: "#512DA8"
//         },
//         headerTintColor: '#fff',
//         headerTintStyle: { color: '#fff' }
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={({ navigation }) => ({
//           headerLeft: <Icon name="menu"
//             size={24}
//             color="white"
//             onPress={() => navigation.toggleDrawer()} />
//         })
//         }
//       />
//     </Stack.Navigator>
//   )
// }

// const AboutNavigator = () => {
//   return (<Stack.Navigator
//     options={{
//       headerStyle: {
//         backgroundColor: "#512DA8"
//       },
//       headerTintColor: '#fff',
//       headerTintStyle: { color: '#fff' }
//     }}>
//     <Stack.Screen
//       name="About"
//       component={About}
//       options={({ navigation }) => ({
//         headerLeft: <Icon name="menu"
//           size={24}
//           color="white"
//           onPress={() => navigation.toggleDrawer()} />
//       })
//       }
//     />
//   </Stack.Navigator>
//   )
// }

// const ContactNavigator = () => {
//   return (<Stack.Navigator
//     options={{
//       headerStyle: {
//         backgroundColor: "#512DA8"
//       },
//       headerTintColor: '#fff',
//       headerTintStyle: { color: '#fff' }
//     }}>
//     <Stack.Screen
//       name="Contact"
//       component={Contact}
//       options={({ navigation }) => ({
//         headerLeft: <Icon name="menu"
//           size={24}
//           color="white"
//           onPress={() => navigation.toggleDrawer()} />
//       })
//       }
//     />
//   </Stack.Navigator>
//   )
// }

// const ReservationNavigator = () => {
//   return (<Stack.Navigator
//     options={{
//       headerStyle: {
//         backgroundColor: "#512DA8"
//       },
//       headerTintColor: '#fff',
//       headerTintStyle: { color: '#fff' }
//     }}>
//     <Stack.Screen
//       name="Reservation"
//       component={Reservation}
//       options={({ navigation }) => ({
//         headerLeft: <Icon name="menu"
//           size={24}
//           color="white"
//           onPress={() => navigation.toggleDrawer()} />
//       })
//       }
//     />
//   </Stack.Navigator>
//   )
// }

// const FavoritesNavigator = () => {
//   return (<Stack.Navigator
//     options={{
//       headerStyle: {
//         backgroundColor: "#512DA8"
//       },
//       headerTintColor: '#fff',
//       headerTintStyle: { color: '#fff' }
//     }}>
//     <Stack.Screen
//       name="Favorites"
//       component={Favorites}
//       options={({ navigation }) => ({
//         headerLeft: <Icon name="menu"
//           size={24}
//           color="white"
//           onPress={() => navigation.toggleDrawer()} />
//       })
//       }
//     />
//   </Stack.Navigator>
//   )
// }

// const LoginNavigator = () => {
//   return (<Stack.Navigator>
//     <Stack.Screen
//       name="Login"
//       component={Login}
//     // options={({ navigation }) => ({
//     //   headerLeft: <Icon name="menu"
//     //     size={24}
//     //     color="white"
//     //     onPress={() => navigation.toggleDrawer()} 
//     />
//     })
//     }
//   />
//   </Stack.Navigator>)
// }

// const CustomDrawerContentComponent = (props) => (
//   <ScrollView>
//     <SafeAreaView style={StyleSheet.container}
//       forceInset={{ top: 'always', horizontal: 'never' }}>
//       <View style={StyleSheet.drawerHeader}>
//         <View style={{ flex: 1 }}>
//           <Image source={logo} style={StyleSheet.drawerImage} />
//         </View>
//         <View style={{ flex: 2 }}>
//           <Text style={style.drawerHeaderText}>Ristorante Con Fusion</Text>
//         </View>
//       </View>
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>
//     </SafeAreaView>
//   </ScrollView>
// );

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerBackgroundColor='#D1C4E9'
    // drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >
      <Drawer.Screen name="Login"
        component={Login}
        options={{
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='sign-in'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="Home"
        component={Home}
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='home'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="About"
        component={About}
        options={{
          title: 'About',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="Menu"
        component={MenuNavigator}
        options={{
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='list'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="Contact"
        component={Contact}
        options={{
          title: 'Contact',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='address-card'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="Favorites"
        component={Favorites}
        options={{
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='heart'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />
      <Drawer.Screen name="Reservation"
        component={Reservation}
        options={{
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name='cutlery'
              type='font-awesome'
              size={24}
              color={tintColor}
            />)
        }} />

    </Drawer.Navigator>
  )
}


const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    // NetInfo.getConnectionInfo()
    //   .then((connctionInfo) => {
    //     ToastAndroid.show('Initial Network Connectivity Type : ' + connctionInfo.type + ', effective Type: ' + connctionInfo.effectiveType
    //       , ToastAndroid.LONG)
    //   }).catch((err) => { console.log("An error :" + err) });

    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  // componentWillUnmount() {
  //   NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  // }

  handleConnectivityChange = (connctionInfo) => {
    switch (connctionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection !', ToastAndroid.LONG);
        break;
      default:
        break;

    }
  };


  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        {/*  <View style={{ flex: 1, paddingTop: 0 }}> */}
        <NavigationContainer>
          {/* <HomeNavigator /> */}
          {/* <LoginNavigator /> */}
          <MainNavigator />
        </NavigationContainer>
      </View>
    );
  }
}

// export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);