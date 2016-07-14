/**
 * Created by chenqingbiao on 16/7/10.
 */
'use strict';
var React = require('react');

import {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ListView,
    TouchableHighlight
} from 'react-native';

const shallowEqual = require('./shallowEqual');
import Storage from 'react-native-storage';

var LocalStorage = new Storage();

var LocationList = React.createClass({
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {let ret = shallowEqual(r1, r2); console.log(ret);return ret;}});
        this._ds = ds;
        this.data = [];
        return {
            pressed: null,
            dataSource: ds.cloneWithRows(this.data)
        };
    },

    _rebuildData(){
        this._map = {};
        this.data.forEach((item, index)=>{
            this._map[item.id] = item;
        });
    },

    _renderRow(rowData, sectionID, rowID, highlightRow){
        let selected = rowData._select;
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowData, rowID);
              highlightRow(sectionID, rowID);
            }}>
                <View>
                    <View style={selected ? [styles.row, styles.highlight] : styles.row}>
                        <Text style={selected ? styles.whiteText : styles.listText}>
                            {rowData.text}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    _pressRow(rowData, rowID){
        let last = this.state.pressed;
        if(last){
            last._select = false;
        }
        let theOne = this._map[rowData.id];
        theOne._select = true;

        this.setState({
            pressed: theOne,
            dataSource: this._ds.cloneWithRows(this.data)
        });

        if(this.props.gotoPage){
            this.props.gotoPage(rowID);
        }
    },

    _renderSeperator(sectionID, rowID, adjacentRowHighlighted){
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                  height: 1,
                  backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
                }}
            />
        );
    },

    componentDidMount(){
        LocalStorage.save({
            key: 'cities',
            id: 'CN101210101',
            rawData: {id: "CN101210101", text: "杭州"}
        });
        LocalStorage.getAllDataForKey('cities').then((ret)=>{
            this.data = ret;
            this._rebuildData();
            this.setState({
                dataSource: this._ds.cloneWithRows(this.data)
            });
        });
    },

    addCity(city){
        if(!this._map[city.id]){
            this.data.push(city);
            this._map[city.id] = city;
            LocalStorage.save({
                key: 'cities',
                id: city.id,
                rawData: city
            });

            this.setState({
                dataSource: this._ds.cloneWithRows(this.data)
            });
        }
    },

    removeCity(id){
        delete this._map[id];
        this.data.forEach((item, index)=>{
            if(item.id === id){
                this.data.splice(index, 1);
            }
        });
        LocalStorage.remove({
            key: 'cities',
            id: city.id
        });
        this.setState({
            dataSource: this._ds.cloneWithRows(this.data)
        });
    },

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.tools}>
                    <Text style={styles.primaryText}>设置</Text>
                    <Text style={styles.primaryText} onPress={this.props.closeDrawer}>增加</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeperator}
                    renderScrollComponent={props => <ScrollView {...props} />}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    main: {
        flex: 1
    },
    tools: {
        marginTop: 20,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primaryText: {
        color: '#41b1fb'
    },
    row: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6'
    },
    highlight: {
        backgroundColor: '#777777'
    },
    listText: {
        color: 'blue'
    },
    whiteText: {
        color: '#fff'
    }
});

module.exports = LocationList;