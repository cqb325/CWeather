/**
 * Created by chenqingbiao on 16/7/5.
 */
'use strict';
var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

const Tile = require('./Tile');
import IonIcon from 'react-native-vector-icons/Ionicons';

var Suggestion = React.createClass({
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

    renderSuggestionData(){
        let data = this.state.data;
        if(data) {
            //洗车指数
            let cw = data.cw;
            //穿衣指数
            let drsg = data.drsg;
            //感冒指数
            let flu = data.flu;
            //运动指数
            let sport = data.sport;
            //旅游指数
            let trav = data.trav;
            //紫外线指数
            let uv = data.uv;

            return (
                    [<View style={styles.row} key="1">
                        <View style={styles.cell}>
                            <IonIcon name="ios-sunny" size="{35}" color="#fff"/>
                            <View>
                                <Text style={[styles.text, styles.important]}>{uv ? uv.brf : '--'}</Text>
                                <Text style={styles.text}>紫外线</Text>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <Image style={styles.icon} source={require('../images/suggestions_02.png')} />
                            <View>
                                <Text style={[styles.text, styles.important]}>{trav ? trav.brf : '--'}</Text>
                                <Text style={styles.text}>旅游</Text>
                            </View>
                        </View>
                    </View>,
                    <View style={styles.row} key="2">
                        <View style={styles.cell}>
                            <Image style={styles.icon} source={require('../images/suggestions_03.png')} />
                            <View>
                                <Text style={[styles.text, styles.important]}>{drsg ? drsg.brf : '--'}</Text>
                                <Text style={styles.text}>穿衣</Text>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <Image style={styles.icon} source={require('../images/suggestions_04.png')} />
                            <View>
                                <Text style={[styles.text, styles.important]}>{cw ? cw.brf : '--'}</Text>
                                <Text style={styles.text}>洗车</Text>
                            </View>
                        </View>
                    </View>,
                    <View style={styles.row} key="3">
                        <View style={styles.cell}>
                            <Image style={styles.icon} source={require('../images/suggestions_05.png')} />
                            <View>
                                <Text style={[styles.text, styles.important]}>{sport ? sport.brf : '--'}</Text>
                                <Text style={styles.text}>运动</Text>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <Image style={styles.icon} source={require('../images/suggestions_06.png')} />
                            <View>
                                <Text style={[styles.text, styles.important]}>{flu ? flu.brf : '--'}</Text>
                                <Text style={styles.text}>感冒</Text>
                            </View>
                        </View>
                    </View>]
            );
        }else{
            return null;
        }
    },

    render: function () {
        let list = this.renderSuggestionData();
        return (
            <Tile header="指数" style={styles.container}>
                {list}
            </Tile>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: 35,
        height: 35
    },
    important: {
        fontSize: 15,
        color: '#fff'
    },
    text:{
        textAlign: 'right',
        color: '#aaa',
        fontSize: 11,
        marginTop: 5
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)'
    },
    cell: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.2)'
    }
});

module.exports = Suggestion;