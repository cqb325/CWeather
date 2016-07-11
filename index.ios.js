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
const LocationList = require('./components/LocationList');

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
                hourly_forecast = data.hourly_forecast;
                suggestion = data.suggestion;
            }
        }

        w_icon = "http://www.heweather.com/weather/images/icon/"+w_icon+".png";

        return (
            <Drawer ref={(ref) => this._drawer = ref}
                    type="static"
                    openDrawerOffset={50}
                    tapToClose={true}
                    content={<LocationList closeDrawer={this.closeSetting}/>}
                    style={drawerStyles}
                    tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Image style={[styles.bgImage,{width: Dimensions.get('window').width}]} source={require('./images/bg2.png')}>
                    <ScrollView showsVerticalScrollIndicator={true} removeClippedSubviews={false}>
                        <View style={styles.top}>
                            <IonIcon.Button onPress={this.openSetting} style={styles.menuIcon} name="ios-menu" backgroundColor="transparent"/>
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

                        <AQI data={hourly_forecast}/>

                        <View style={[styles.list ]}>
                            <ForecastList data={daily_forecast}/>
                        </View>

                        <Suggestion data={suggestion}/>

                        <View style={{height: 70}}/>
                    </ScrollView>
                </Image>
            </Drawer>
        );
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
    top: {
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    topWrap: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    cityBg: {

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
    },
    menuIcon: {
        marginTop: 20,
        marginLeft: 5
    }
});

AppRegistry.registerComponent('test', () => Weather);