/**
 * Created by chenqingbiao on 16/7/4.
 */

'use strict';
var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

const Tile = require('./Tile');

var ForecastList = React.createClass({
    getInitialState(){
        return {
            data: this.props.data
        }
    },

    componentWillReceiveProps(nextProps){
        if(nextProps.data != this.props.data){
            this.setState({
                data: nextProps.data
            });
        }
    },

    renderForecastData(){
        let data = this.state.data;
        return data.map(function(dayData, index){
            let date = dayData.date;
            let date_arr = date.split("-");
            date = date_arr[1]+"/"+date_arr[2];
            let tmp = dayData.tmp;
            let cond = dayData.cond;
            let wind = dayData.wind;
            let d_w = "http://www.heweather.com/weather/images/icon/"+cond.code_d+".png";
            let n_w = "http://www.heweather.com/weather/images/icon/"+cond.code_n+".png";
            return (
                <View style={styles.cell} key={index}>
                    <Text style={styles.temperature}>周一</Text>
                    <Text style={styles.temperature}>{date}</Text>
                    <Text style={styles.txt_d}>{cond.txt_d}</Text>
                    <Image source={{uri: d_w}} style={styles.icon}/>
                    <Text style={styles.temperature}>{tmp.max}°</Text>
                    <Text style={styles.temperature}>{tmp.min}°</Text>
                    <Image source={{uri: n_w}} style={styles.icon}/>
                    <Text style={styles.txt_d}>{cond.txt_n}</Text>
                    <Text style={styles.txt_d}>{wind.dir}</Text>
                    <Text style={styles.txt_d}>{wind.sc}</Text>
                </View>
            );
        });
    },

    render: function () {
        let list = this.renderForecastData();
        return (
            <Tile header="预报">
                <ScrollView style={styles.list} horizontal={true} showsHorizontalScrollIndicator={true}>
                    {list}
                </ScrollView>
            </Tile>
        );
    }
});

var styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingBottom: 20
    },
    cell: {
        flex: 1,
        width: 70,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 0.5
    },
    temperature: {
        marginTop: 10,
        color: '#fff',
        fontSize: 12
    },
    icon: {
        marginTop: 10,
        width: 30,
        height: 30
    },
    txt_d:{
        marginTop: 10,
        color: '#fff',
        fontSize: 12
    }
});

module.exports.ForecastList = ForecastList;