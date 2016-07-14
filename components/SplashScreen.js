/**
 * Created by cqb32_000 on 2016-07-13.
 */
'use strict';

var React = require('react');

import {
    View,
    Text,
    Image,
    Dimensions, // 尺寸
    Animated   // 动画
} from 'react-native';

var SplashScreen = React.createClass({
    getInitialState: function () {
        return {
            cover: {image: {uri: 'splash'}}, // 封面
            bounceValue: new Animated.Value(1) // 弹力值
        };
    },

    componentDidMount: function () {
        Animated.timing(
            this.state.bounceValue, {toValue: 1.2, duration: 2000}
        ).start();
    },

    render: function () {
        return (
            <Animated.View style={{
                flex: 1,
                transform: [{scale: this.state.bounceValue}]
            }}>
                <Animated.Image source={require('../images/bg.png')} style={{width: Dimensions.get('window').width}}>
                    <View style={{justifyContent: 'center', height: Dimensions.get('window').height}}>
                        <Image source={require('../images/claw.png')} style={{alignSelf: 'center', width: 100, height: 100, marginTop: -50}}/>
                        <Text style={{textAlign: 'center', fontSize: 40, color: '#fff'}}>CQB天气预报</Text>
                    </View>
                </Animated.Image>
            </Animated.View>
        );
    }

});

module.exports = SplashScreen;