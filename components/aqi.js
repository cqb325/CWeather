/**
 * Created by chenqingbiao on 16/7/4.
 */

'use strict';
var React = require('react');

import {
    Component,
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';

var AQI = React.createClass({
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

    renderList(){
        let data = this.state.data;
        if(data){
            return data.map(function(item, index){
                let time = item.date.split(" ")[1];
                let tmp = item.tmp;
                let hum = item.hum;
                return (
                    <View style={aqi_styles.cell} key={index}>
                        <Text style={aqi_styles.whiteText}>{time}</Text>
                        <Text style={aqi_styles.whiteText}>{tmp}°</Text>
                        <Text style={aqi_styles.whiteText}>{hum}%</Text>
                    </View>
                );
            });
        }

        return null;
    },

    render: function () {
        //let list = this.renderList();
        return (
            <View style={[aqi_styles.tile2,this.props.style]}>
                <View style={aqi_styles.header2}>
                    <IonIcon style={[aqi_styles.ml_10]} name="ios-leaf" size={15} color="green"/>
                    <Text style={[aqi_styles.ml_10, aqi_styles.whiteText]}>{50}</Text>

                    <IonIcon style={[aqi_styles.ml_10]} name="ios-water" size={15} color="#1e90ff"/>
                    <Text style={[aqi_styles.ml_10, aqi_styles.whiteText]}>20%</Text>

                    <Text style={aqi_styles.rightText}>来源和风天气</Text>
                </View>
            </View>
        );
    }
});

var aqi_styles = StyleSheet.create({
    ml_10: {
        marginLeft: 10
    },
    rightText: {
        flex: 1,
        textAlign: 'right',
        color: '#ddd',
        paddingRight: 20
    },
    whiteText:{
        color: 'white',
        textAlign: 'center'
    },
    tile2: {
        backgroundColor: 'rgba(99,140,170,0.5)',
        marginBottom: 10
    },
    header2: {
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row'
    },
    headerText:{
        color: '#fff'
    },
    cell:{
        width: 60,
        padding: 10
    }
});

module.exports = AQI;