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

            return (
                <View style={styles.cell} key={index}>
                    <Text style={styles.temperature}>周一</Text>
                    <Text style={styles.temperature}>{date}</Text>
                    <Text style={styles.temperature}>{cond.txt_d}</Text>
                    <Image source={require('../images/w_1.png')}/>
                    <Text style={styles.temperature}>{tmp.max}°</Text>
                    <Text style={styles.temperature}>{tmp.min}°</Text>
                    <Text style={styles.temperature}>{cond.txt_n}</Text>
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 0.5
    },
    temperature: {
        marginTop: 10,
        color: '#fff'
    }
});

module.exports = ForecastList;