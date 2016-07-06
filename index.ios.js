'use strict';
var React = require('react');

import {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

import {storage} from './components/Store';
import {ForecastList} from './components/forecastList';
const Suggestion = require('./components/Suggestion');

let cityid = 'CN101010100';

var Weather = React.createClass({
    getInitialState(){
        return {
            data: {},
            loaded: false
        }
    },

    componentDidMount(){
        this.fetchData();
    },

    fetchData(){
        let hour = new Date().getHours();
        storage.load({
            key: 'weather',
            id: cityid+"."+hour
        }).then(ret => {
            this.setState({
                data: ret,
                loaded: true
            });
        });
    },

    render: function () {
        let heData = this.state.data;
        let tmp = "";
        let wea = "";
        let daily_forecast = [];
        let suggestion = {};
        let w_icon = 999;
        let city = "";
        for(let a in heData){
            let data = heData[a];
            data = data.length ? data[0] : null;
            if(data){
                let update = data.basic.update;
                city = data.basic.city;
                let now = data.now;
                tmp = now.tmp;
                wea = now.cond.txt;
                w_icon = now.cond.code;
                daily_forecast = data.daily_forecast;
                suggestion = data.suggestion;
            }
        }

        w_icon = "http://www.heweather.com/weather/images/icon/"+w_icon+".png";

        return (
            <Image style={[styles.bgImage,{width: Dimensions.get('window').width}]} source={require('./images/bg2.png')}>
                <ScrollView showsVerticalScrollIndicator={true} removeClippedSubviews={false}>
                    <View style={styles.top}>
                        <View style={styles.topWrap}>
                            <View style={styles.weatherImgWrap}>
                                <Image style={styles.weatherImg} source={{uri: w_icon}} />
                            </View>
                            <View style={styles.citywrap}>
                                <Text style={styles.city}>{city}</Text>
                                <Text style={styles.weather}>{wea}</Text>
                                <Text style={styles.tempreture}>{tmp}°</Text>
                            </View>
                        </View>
                        <View style={styles.cityBg}>
                            <Image style={{width: 375}} source={require('./images/city-bg.png')}/>
                        </View>
                    </View>
                    <View style={styles.list}>
                        <ForecastList data={daily_forecast}/>
                    </View>

                    <Suggestion data={suggestion}/>
                    <View style={{height: 70}}/>
                </ScrollView>
            </Image>
        );
    }
});
var styles = StyleSheet.create({
    top: {
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    topWrap: {
        marginTop: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    cityBg: {
        height: 50
    },
    list: {
        marginTop: 100,
        backgroundColor: 'transparent'
    },
    weatherImgWrap: {
        flex: 3
    },
    weatherImg: {
        width: 80,
        height: 80,
        marginLeft: 50,
        marginTop: 30
    },
    citywrap: {
        flex: 2,
        alignItems: 'flex-end',
        paddingRight: 50
    },
    bgImage: {
        top: 0,
        left: 0
    },
    city: {
        fontSize: 20,
        fontWeight: "700",
        color: '#eee'
    },
    weather: {
        fontSize: 13,
        marginTop: 8,
        color: '#eee'
    },
    tempreture: {
        fontSize: 40,
        marginTop: 15,
        color: '#eee'

    }
});

AppRegistry.registerComponent('test', () => Weather);