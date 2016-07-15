/**
 * Created by cqb32_000 on 2016-07-14.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';

import {storage} from './Store';
import ViewPager from 'react-native-viewpager';
import {ForecastList} from './forecastList';
const Suggestion = require('./Suggestion');
const AQI = require('./aqi');
import IonIcon from 'react-native-vector-icons/Ionicons';

var CityPager = React.createClass({
    getInitialState: function() {
        this.city = this.props.city;
        return {
            data: [],
            loaded: false
        };
    },

    componentDidMount(){
        this.fetchData();
    },

    fetchData(){
        let hour = new Date().getHours();
        let cityid = this.city.id;
        storage.load({
            key: 'weather',
            id: cityid + "." + hour
        }).then(ret => {
            this.setState({
                data: ret,
                loaded: true
            });
        });
    },

    render: function() {
        let heData = this.state.data;
        let tmp = "";
        let wea = "";
        let daily_forecast = [];
        let hourly_forecast = [];
        let suggestion = {};
        let w_icon = 999;
        let city = "";
        for (let a in heData) {
            let data = heData[a];
            data = data.length ? data[0] : null;
            if (data) {
                let update = data.basic.update;
                city = data.basic.city;
                let now = data.now;
                tmp = now.tmp;
                wea = now.cond.txt;
                w_icon = now.cond.code;
                daily_forecast = data.daily_forecast;
                hourly_forecast = data.hourly_forecast;
                suggestion = data.suggestion;
            }
        }

        w_icon = "http://www.heweather.com/weather/images/icon/" + w_icon + ".png";

        return (
            <ScrollView showsVerticalScrollIndicator={true} removeClippedSubviews={false}
                        style={styles.scrollview}>
                <View style={styles.top}>
                    <Image style={styles.cityImage} source={require('../images/bg4.png')}/>
                    <View style={styles.topWrap}>
                        <View style={styles.weatherImgWrap}>
                            <Image style={styles.weatherImg} source={{uri: w_icon}}/>
                            <Text style={styles.weather}>{wea}</Text>
                        </View>
                        <View style={styles.citywrap}>
                            <Text style={styles.city}>{city}</Text>
                            <Text style={styles.tempreture}>{tmp}°</Text>
                        </View>
                    </View>
                </View>

                <AQI data={hourly_forecast}/>

                <View style={[styles.list ]}>
                    <ForecastList data={daily_forecast}/>
                </View>

                <Suggestion data={suggestion}/>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    page: {
        width: Dimensions.get('window').width
    },
    scrollview: {
        backgroundColor: '#356AA0'
    },
    top: {
        flexDirection: 'column',
        overflow: 'hidden',
        height: Dimensions.get('window').height - 25
    },
    topWrap: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
        alignSelf: 'flex-start'
    },
    cityImage: {
        position: 'absolute',
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 1600/900
    },
    list: {
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
    city: {
        fontSize: 20,
        fontWeight: "700",
        color: '#eee'
    },
    weather: {
        fontSize: 13,
        marginTop: 8,
        color: '#eee',
        textAlign: 'center'
    },
    tempreture: {
        fontSize: 40,
        marginTop: 15,
        color: '#eee'
    },
    cityView: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#ddd'
    }
});

module.exports = CityPager;