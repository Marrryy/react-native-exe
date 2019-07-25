import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Menu:{screen:Menu},
    Dishdetail:{screen:Dishdetail}
},{
    initialRouteName:"Menu",
    navigationOptions:{
        headerStyle:{
            backgroundColor:"#512DA8"
        },
        headerTintColor:'#fff',
        headerTintStyle:{color:'#fff'}
    }
});

class Main extends Component{
    // onDishSelect(dishId){
    //     this.setState({selectedDish: dishId})
    // }

    render(){
        return (
            <View style={{flex:1, paddingTop:Platform.OS=== 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MenuNavigator/>
            </View>
        );
    }
}
export default Main;