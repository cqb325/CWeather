/**
 * Created by cqb32_000 on 2016-07-14.
 */
'use strict';

import React from 'react';
import {
    StyleSheet
} from 'react-native';

import ViewPager from 'react-native-viewpager';
const CityPager = require('./CityPager');

var CityPagers = React.createClass({
    getInitialState: function() {
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1.id !== p2.id
        });

        this.cityData = this.props.cityData;

        return {
            loaded: false,
            dataSource: dataSource.cloneWithPages(this.cityData)
        };
    },

    gotoPage(num){
        this.refs.viewPage.goToPage(num);
    },

    render: function() {
        return (
            <ViewPager ref="viewPage"
                       style={this.props.style}
                       dataSource={this.state.dataSource}
                       renderPage={this._renderPage}
                       isLoop={false}
                       autoPlay={false}/>
        );
    },

    _renderPage: function(data, pageID) {
        return (
            <CityPager city={data}/>
        );
    }
});

module.exports = CityPagers;