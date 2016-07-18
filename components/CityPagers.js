/**
 * Created by cqb32_000 on 2016-07-14.
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import ViewPager from 'react-native-viewpager';
const CityPager = require('./CityPager');

var CityPagers = React.createClass({
    getInitialState: function() {
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1.id !== p2.id
        });

        this.ds = dataSource;

        this.cityData = this.props.cityData;

        return {
            loaded: false,
            dataSource: dataSource.cloneWithPages(this.cityData)
        };
    },

    addCity(city){
        this.cityData.push(city);
        this.setState({
            dataSource: this.ds.cloneWithPages(this.cityData)
        });
    },

    gotoPage(num){
        this.refs.viewPage.goToPage(num, false);
    },

    openSetting(){
        if(this.props.openSetting) {
            this.props.openSetting();
        }
    },

    render: function() {
        return (
            <ViewPager ref="viewPage"
                       style={this.props.style}
                       dataSource={this.state.dataSource}
                       renderPage={this._renderPage}
                       isLoop={false}
                       autoPlay={false}
                       openSetting={this.openSetting}
                />
        );
    },

    _renderPage: function(data, pageID) {
        return (
            <View style={{flex: 1}}>
                <CityPager city={data}/>
            </View>
        );
    }
});

module.exports = CityPagers;