import React, { Component } from 'react'
import {searchPage} from './API.JS'
import { connect } from 'react-redux';
import { fetchSearch } from './actions/search';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TextInput, SafeAreaView, View,ScrollView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import SvgComponent from './components/SvgComponent'

class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',      
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.keyExtractor = this.keyExtractor.bind(this)
  }

  onChangeText(value) {
    this.setState({search:value});
    const searchRequest = searchPage + `${this.state.search}`
    if(this.state.search !== 0){ 
      this.props.fetchSearch(searchRequest)
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.name.toUpperCase()}
      subtitle={item.artist}
    />
  )

  render(){
      return (
                <SafeAreaView style={{backgroundColor:"#1b1b49",height:"100%"}}>
                    <Text style={{fontSize:26,padding:16,color:"#fa926f"}}>Поиска трека</Text>
                    <View style={{
                                backgroundColor:"white",
                                padding:4,
                                margin:28,
                                borderRadius:10,
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"space-between",
                                alignItems:"center"
                                }}
                    >
                      <Icon style={[{
                                     color:'#1b1b49',
                                     marginLeft:15
                                  }]}
                            size={24}
                            name={'search'}
                      />
                      <TextInput placeholder={"Поиск трека по названию ..."}
                                 style={{marginRight:15}}
                                 onChangeText={text => this.onChangeText(text)}
                                 value={this.state.search}
                      />
                    </View>
                    {this.props.search.loading == true ? (
                      <Text style={{backgroundColor:"#1b1b49",
                                    height:"100%",
                                    color:"white"}}>
                        Loading
                      </Text>
                    ) : this.props.search.error ? (
                          <Text>{this.props.search.error}</Text>
                    ) : (
                          <ScrollView style={{backgroundColor:"#1b1b49"}}>
                              {this.props.search.search !== 0
                                && this.props.search.search.data
                                && this.props.search.search.data.results
                                && this.props.search.search.data.results.trackmatches
                                && this.props.search.search.data.results.trackmatches.track ? (
                                  <FlatList
                                    style={{padding: 27, borderRadius:12}}
                                    data={this.props.search.search.data.results.trackmatches.track}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                  />
                              ) : <SvgComponent style={{height:340}}/>}
                          </ScrollView>
                        )
                    }
                </SafeAreaView>
            )
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.searchReducer
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearch:(filter)=> dispatch(fetchSearch(filter)),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);