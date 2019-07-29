import React, {Component} from 'react';
import { Text, View , ScrollView, FlatList} from 'react-native';
import { Card , Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

function RenderComment(props){
    const comments = props.comments;
    const renderCommentItem=({item,index})=>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating} stars</Text>
                <Text style={{fontSize:12}}>{'-- '+item.author+', '+item.date}</Text>
            </View>
        );
    };
    return(
        <Card title='Comments'>
            <FlatList data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item=>item.id.toString()}/>
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;

        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri:baseUrl+dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon raised
                    reverse
                    name={props.favorite ? 'heart': 'heart-o'}
                    type={'font-awesome'}
                    color='#f50'
                    onPress={()=> props.favorites ? console.log('Already Favorite') : props.onPress()}
                     />
                </Card>
            );
        }
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={
            favorites:[]
        };
      }
      static navigationOptions = {
        title:"Dish Details"
      };
      markFavorite(dishId){
          this.setState({favorites: this.state.favorites.concat(dishId)});
      };
      render(){
          const dishId = this.props.navigation.getParam('dishId','')
          return(
              <ScrollView>
                  <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.state.favorites.some(el=>el === dishId)} onPress={()=> this.markFavorite(dishId)} />  
                  <RenderComment comments={this.props.comments.comments.filter((comment)=>comment.dishId === dishId)} /> 
              </ScrollView>
          ); 
      }

}

export default connect(mapStateToProps)(Dishdetail);