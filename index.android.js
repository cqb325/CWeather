'use strict';
var React = require('react');

import {
    AppRegistry
} from 'react-native';

const Main = require('./mainApp');

var Weather = React.createClass({
    render: function () {
        return (
            <Main/>
        );
    }
});

AppRegistry.registerComponent('test', () => Weather);