import React from 'react';

import {  SafeAreaView, Text, View, ScrollView, TouchableOpacity, FlatList, Linking } from "react-native";
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {mainPage} from './API.JS'
import { connect } from 'react-redux';
import { fetchUsers } from './actions/user';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button:{
          width: 362,
          borderRadius:3,
          marginBottom: 25,
          alignSelf: "center"
        }
});

class TopTracksScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      page : 0,
    }
    this.renderItem = this.renderItem.bind(this)
  }

  componentDidMount(){
    this.props.fetchUsers(mainPage)
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <View>
        <ListItem
          Component={TouchableScale}
          containerStyle={{borderRadius:10, borderColor:"#1b1b49"}}
          friction={90}
          tension={100} 
          activeScale={0.95} //
          linearGradientProps={{
          colors: ['#fa926f', '#1b1b49'],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
          }}
          ViewComponent={LinearGradient}
          title={item.name.toUpperCase()}
          subtitle={item.artist.name}
          titleStyle={{color:'white',fontWeight:'bold'}}
          subtitleStyle={{color:'white',fontSize:17}}
          chevron={{ color:'white',size:27 }}
          onPress={() => this.props.navigation.navigate('Detail', {artist_id:item.artist.mbid})}
        />
        <TouchableOpacity style={styles.button} onPress={() =>  Linking.openURL(item.artist.url)}>
            <Text
              style={{fontSize:13,
                      marginLeft: 16,
                      color:"#fa926f",
                      textDecorationLine:"underline"}}>
              На страницу артиста ...
            </Text>
        </TouchableOpacity>
    </View>
  )
  render() {
    return this.props.list.loading == true ? (
          <Text style={{backgroundColor:"#1b1b49",
                        height:"100%",
                        color:"white"}}>Loading
          </Text>
      ) : this.props.list.error ? (
          <Text>{this.props.list.error}</Text>
      ) : (
        <SafeAreaView>
          <ScrollView style={{backgroundColor:"#1b1b49"}}>
            <Text style={{fontSize:26, padding: 16,color:"#fa926f"}}>Главная</Text>
                {this.props.list.users
                  && this.props.list.users.data
                  && this.props.list.users.data.tracks.track
                  && (
                        <FlatList
                          style={{padding: 16}}
                          data={this.props.list.users.data.tracks.track}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                        />
                      )
                }
          </ScrollView>
        </SafeAreaView>
      );
      }
  }


const  mapStateToProps = (state) => {
  return {
        list: state.listReducer,
      }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers:(mainPage)=> dispatch(fetchUsers(mainPage))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopTracksScreen);