/**
 * Created by cqb32_000 on 2016-07-14.
 */

'use strict';

var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

var Button = React.createClass({

    pressButton(evt){
        if(this.props.onPress){
            this.props.onPress();
        }
    },

    render(){
        return (
            <TouchableHighlight underlayColor="rgba(0,0,0,0.1)" style={[styles.button, this.props.style]} onPress={this.pressButton}>
                {this.props.children}
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        padding: 4,
        borderColor: '#ccc'
    }
});

module.exports = Button;