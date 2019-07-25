import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import pic from './images/uthappizza.png';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
        dishes:DISHES,
    };
  }
  static navigationOptions = {
    title:"Menu"
  };
  render(){
    const {navigate}= this.props.navigation
  
    const renderMenuItem = ({item, index}) =>{
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron ={true} //right arrow for ios is now hide
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                leftAvatar={{ source: {pic}}}
            />
        );
    }
    return(
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item =>item.id.toString()}
      />
    );
} }

export default Menu;