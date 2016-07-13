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
const AQI = require('./components/aqi');
import IonIcon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
const timer = require('react-native-timer');
const LocationList = require('./components/LocationList');
const SplashScreen = require('./components/SplashScreen');

let cityid = 'CN101210101';

var Weather = React.createClass({
    getInitialState(){
        return {
            data: {},
            loaded: false,
            splashed: true
        }
    },

    componentDidMount(){
        timer.setTimeout(this, 'splash',()=>{
            this.setState({splashed: false});
        }, 3000);
        this.fetchData();
    },

    fetchData(){
        let hour = new Date().getHours();
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

    openSetting(){
        this._drawer.open();
    },

    closeSetting(){
        this._drawer.close();
    },

    render: function () {
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

        if (!this.state.splashed) {
            return (
                <Drawer ref={(ref) => this._drawer = ref}
                        type="static"
                        openDrawerOffset={50}
                        tapToClose={true}
                        content={<LocationList closeDrawer={this.closeSetting}/>}
                        style={drawerStyles}
                        tweenHandler={Drawer.tweenPresets.parallax}
                    >
                    <ScrollView showsVerticalScrollIndicator={true} removeClippedSubviews={false}
                                style={styles.scrollview}>
                        <View style={styles.top}>
                            <IonIcon.Button onPress={this.openSetting} style={styles.menuIcon} name="ios-menu"
                                            backgroundColor="transparent"/>
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
                            <Image style={styles.cityImage} source={require('./images/city-bg.png')}/>
                        </View>

                        <AQI data={hourly_forecast}/>

                        <View style={[styles.list ]}>
                            <ForecastList data={daily_forecast}/>
                        </View>

                        <Suggestion data={suggestion}/>
                    </ScrollView>
                </Drawer>
            );
        }else{
            return (
                <SplashScreen></SplashScreen>
            );
        }
    }
});
const drawerStyles = StyleSheet.create({
    drawer: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3,
        flex: 1
    },
    main: {
        shadowColor: '#000000', shadowOpacity: 0.3, shadowRadius: 15
    }
});

var styles = StyleSheet.create({
    scrollview: {
        backgroundColor: '#356AA0'
    },
    top: {
        flexDirection: 'column',
        height: Dimensions.get('window').height - 25
    },
    topWrap: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    cityImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 147/414
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
    }
});

AppRegistry.registerComponent('test', () => Weather);