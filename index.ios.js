'use strict';
var React = require('react');

import {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

const ForecastList = require('./componets/forecastList');

var Weather = React.createClass({
    getInitialState(){
        let key = 'bd7a9faf17f449b7a3bd622eee3e4f87';
        this.URL = 'https://api.heweather.com/x3/weather?cityid=CN101010100&key='+key;

        return {
            data: {},
            loaded: false
        }
    },

    componentDidMount(){
        this.fetchData();
    },

    fetchData(){
        fetch(this.URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData,
                    loaded: true
                });
            })
            .done();
    },

    render: function () {
        let heData = this.state.data;
        let tmp = "";
        let wea = "";
        let daily_forecast = [];
        for(let a in heData){
            let data = heData[a];
            data = data.length ? data[0] : null;
            if(data){
                let update = data.basic.update;
                let now = data.now;
                tmp = now.tmp;
                wea = now.cond.txt;
                daily_forecast = data.daily_forecast;
            }
        }

        return (
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style = {styles.container}>
                    <Image style={styles.bgImage} source={require('./images/bg2.png')}>
                        <View style={styles.top}>
                            <View style={styles.topWrap}>
                                <View style={styles.weatherImgWrap}>
                                    <Image style={styles.weatherImg} source={require('./images/w_1.png')} />
                                </View>
                                <View style={styles.citywrap}>
                                    <Text style={styles.city}>BeiJing</Text>
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
                    </Image>
                </View>
            </ScrollView>
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
    container: {
        flex: 1,
        overflow: 'hidden'
    },
    bgImage: {
        flex: 1,
        width: 375,
        resizeMode: Image.resizeMode.contain,
        flexDirection: 'column'
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