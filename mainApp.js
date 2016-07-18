/**
 * Created by cqb32_000 on 2016-07-14.
 */
var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    ToastAndroid
} from 'react-native';

import {storage} from './components/Store';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
const timer = require('react-native-timer');
const LocationList = require('./components/LocationList');
const SplashScreen = require('./components/SplashScreen');
const AddCityView = require('./components/AddCity');


const CityPagers = require('./components/CityPagers');


let cityid = 'CN101210101';

var Weather = React.createClass({
    getInitialState(){
        return {
            data: {},
            loaded: false,
            splashed: true,
            view: 'main',
            cities: []
        }
    },

    componentDidMount(){
        timer.setTimeout(this, 'splash',()=>{
            this.setState({splashed: false});
        }, 2000);
        //this.fetchData();

        storage.getAllDataForKey('cities').then((ret)=>{
            this.setState({
                cities: ret
            });
        });
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

    addCityView(){
        this._drawer.close();
        this.setState({
            view: 'addCity'
        });
    },

    addCity(city){
        this.setState({
            view: "main"
        });
        this.refs.locationList.addCity(city);
        timer.setTimeout(this, 'pages',()=>{
            this.refs.pages.addCity(city);
        }, 0);
    },

    gotoPage(pageNum){
        this.refs.pages.gotoPage(pageNum);
        this._drawer.close();
    },

    _renderMainPage(){
        if(this.state.view === 'main'){
            return (
                <CityPagers ref="pages" cityData={this.state.cities} openSetting={this.openSetting}/>
            );
        }

        if(this.state.view === 'addCity'){
            return (
                <ScrollView ref="cityView" style={styles.cityView} showsVerticalScrollIndicator={true} removeClippedSubviews={false}>
                    <AddCityView selectCity={this.addCity}/>
                </ScrollView>
            );
        }

        return null;
    },

    render: function () {


        let main = this._renderMainPage();
        if (!this.state.splashed) {
            return (
                <Drawer ref={(ref) => this._drawer = ref}
                        type="static"
                        openDrawerOffset={50}
                        tapToClose={true}
                        content={<LocationList ref="locationList" gotoPage={this.gotoPage} closeDrawer={this.addCityView}/>}
                        style={drawerStyles}
                        tweenHandler={Drawer.tweenPresets.parallax}
                    >
                    {main}
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

    cityView: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#ddd'
    }
});

module.exports = Weather;