import React, {Component} from 'react';
import { Text, View , ScrollView, FlatList, Modal} from 'react-native';
import { Card , Icon,Rating,Input,AirbnbRating, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId)=> dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author,comment)=> dispatch(postComment(dishId, rating, author,comment ))
});

function RenderComment(props){
  const comments = props.comments;
  const renderCommentItem=({item,index})=>{
    return(
      <View key={index} style={{margin:10}}>
        <Text style={{fontSize:14}}>{item.comment}</Text>
        <Rating
          imageSize={12}
          readonly
          startingValue={item.rating}
          style={{ alignItems:'baseline' }}
          />
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
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <Icon raised
              reverse
              name={props.favorite ? 'heart': 'heart-o'}
              type={'font-awesome'}
              color='#f50'
              onPress={()=> props.favorites ? console.log('Already Favorite') : props.onPress()}
                />
              <Icon raised
                reverse
                name={'pencil'}
                type={'font-awesome'}
                color='#512DA8'
                onPress={()=> props.openModal()}
                  />
              </View>
              
          </Card>
      );
    }
}

class Dishdetail extends Component{
  constructor(props){
      super(props);
      this.state={
        showModal:false,
        rating:5,
        author:"",
        comment:""
      };
    }
    static navigationOptions = {
      title:"Dish Details"
    };
    toggleModal(){
      this.setState({
        showModal:!this.state.showModal
      })
    }
    submitComment(dishId){  
    console.log(JSON.stringify(this.state));
    
    this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
    this.toggleModal();
    }
    resetForm(){
      this.setState({
        showModal:false,
        rating:5,
        author:"",
        comment:""
      })
    }
    markFavorite(dishId){
      console.log(this.props.favorites)
      this.props.postFavorite(dishId);
    };
    render(){
      const dishId = this.props.navigation.getParam('dishId','')
      return(
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el=>el === dishId)} onPress={()=> this.markFavorite(dishId)} openModal={()=>this.toggleModal()} />  
          <RenderComment comments={this.props.comments.comments.filter((comment)=>comment.dishId === dishId)} /> 
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onDismiss={()=>this.toggleModal()}
          onRequestClose={()=>this.toggleModal()}
          >
            <View style={{flex:1}}>
              <Rating showRating startingValue={this.state.rating} onFinishRating={(value)=>this.setState({rating:value})}/>
              <Input placeholder='Author'
              leftIcon={{ type: 'font-awesome', name: 'user-o' }}
              onChangeText={(value)=>this.setState({author:value})}
              />
              <Input placeholder='Comment'
              leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
              onChangeText={(value)=>this.setState({comment:value})}
              />
              <Button
              onPress={()=>this.submitComment(dishId)}
              color="#512DA8"
              title="Submit"
              />
              <Button
              onPress={()=>{this.resetForm();this.toggleModal()}}
              color="fff"
              title="Close"
              />
            </View>
          </Modal>
        </ScrollView>
      ); 
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);