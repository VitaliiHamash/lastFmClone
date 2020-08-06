import React, { Component } from 'react'

import {  SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import { connect } from 'react-redux';
import { fetchDetail } from './actions/detail';
import { detailPage } from './API.JS'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoaderComponent from './components/LoaderComponent'

class DetailScreen extends Component {
    
    componentDidMount(){
        const artistQuerry = detailPage + `${this.props.route.params.artist_id}`
        this.props.fetchDetail(artistQuerry)
    }
    
    render() {
        return this.props.detail.loading == true ? (
            <View style = {{
                backgroundColor:"#1b1b49",
                height:"100%"
              }}
            >
                <LoaderComponent />
            </View>
                ) :  this.props.detail.error ? (
                    <Text>{this.props.detail.error}</Text>
                ) : (
                    <SafeAreaView style={{ backgroundColor:"#1b1b49",
                                           height:"100%" }}
                    >
                        <ScrollView>
                            <View 
                                style={{ flexDirection:"row",
                                         alignItems:"center",
                                         marginLeft:16 }}
                            >
                                <Icon
                                    style={[{color:'white'}]}
                                    size={20}
                                    name={'arrow-left'}
                                    onPress={() => this.props.navigation.navigate('Top Tracks')}
                                />
                                <Text style={{ fontSize:26,
                                            padding: 17,
                                            color:"#fa926f" }}
                                >
                                Страница об исполнителе
                                </Text>
                            </View>
                            {this.props.detail.users
                                && this.props.detail.users.data
                                && this.props.detail.users.data.artist
                                && (
                                    <View>
                                        <Text style={{ fontSize:18,
                                                       padding:17,
                                                       color:"#fa926f" }}
                                        >
                                        {this.props.detail.users.data.artist.name}
                                        </Text>
                                        <Image
                                            style={{
                                                width:"92%",
                                                height:250,
                                                padding: 16,
                                                alignSelf: "center",
                                                borderRadius: 10
                                            }}
                                            source={require('../../assets/vishnu-r-nair-m1WZS5ye404-unsplash.jpg')}
                                        />
                                        <Text style={{ fontSize:16,
                                                       padding:17,
                                                       color:"#fa926f" }}
                                        >
                                        {this.props.detail.users.data.artist.bio.content}
                                        </Text>
                                    </View>
                                    )
                            }
                        </ScrollView>
                    </SafeAreaView>
                )
                
    }
}

const mapStateToProps = (state) => {
    return {
        detail: state.detailReducer
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDetail:(artistQuerry)=> dispatch(fetchDetail(artistQuerry))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);