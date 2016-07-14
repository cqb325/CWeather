/**
 * Created by cqb32_000 on 2016-07-14.
 */
'use strict';

var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    TextInput
} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
const hostCities = require('./data/hotCities');
const Button = require('./Button');

var AddCityView = React.createClass({

    selectCity(city){
        if(this.props.selectCity){
            this.props.selectCity(city);
        }
    },

    renderCities(){
        let ret = [];
        for(let i = 0; i < hostCities.length; i+=3){
            let inner = [];
            for(let j = 0; j < 3; j++){
                let index = i + j;

                if(index <  hostCities.length){
                    inner.push(
                        <Button onPress={this.selectCity.bind(this, hostCities[index])} style={styles.cell} key={index}>
                            <Text style={styles.item}>{hostCities[index].text}</Text>
                        </Button>
                    );
                }else{
                    inner.push(
                        <Button style={[styles.cell, styles.emptyCell]} key={index}>
                        </Button>
                    );
                }
            }
            ret.push(
                <View style={styles.row} key={i}>
                    {inner}
                </View>
            );
        }

        return ret;
    },

    render(){
        let cities = this.renderCities();
        return (
            <View>
                <Image source={require('../images/banner.jpg')}>
                    <View style={{marginLeft: 10, marginTop: 10}}>
                        <TouchableHighlight>
                            <IonIcon name="ios-close" size={25}/>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <TextInput placeholder="选择城市" >
                        </TextInput>
                    </View>
                </Image>
                <View>
                    {cities}
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10
    },
    cell: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        padding: 4,
        borderColor: '#ccc',
        borderRadius: 15
    },
    emptyCell: {
        borderWidth: 0,
        borderColor: 'transparent'
    },
    item: {
        flex: 1,
        textAlign: 'center'
    }
});

module.exports = AddCityView;