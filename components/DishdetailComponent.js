import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import pic from './images/uthappizza.png';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {

    const dish = props.dish;

        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={pic}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View>
                <Text>Nothing in HERE !</Text>
            </View>);
        }
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES,
        };
      }
      static navigationOptions = {
        title:"Dish Details"
      };
      render(){
          const dishId = this.props.navigation.getParam('dishId','')
          return(<RenderDish dish={this.state.dishes[+dishId]} />); //string convert into int 
      }

}

export default Dishdetail;