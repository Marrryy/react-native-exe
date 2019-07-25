import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import pic from './images/uthappizza.png';

function Menu(props){
    const renderMenuItem = ({item, index}) =>{
        return(
            <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron ={true} //right arrow for ios is now hide
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: {pic}}}
            />
        );
    }
    return(
      <FlatList
        data={props.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item =>item.id.toString()}
      />
    );
} 

export default Menu;