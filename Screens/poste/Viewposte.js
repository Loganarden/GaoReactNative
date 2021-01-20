import React, { useState, useEffect } from 'react';
import {FlatList, Text, View, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Monbutton from '../../Components/Monbutton'

const db = SQLite.openDatabase('db.gaoDatabase')

const Viewposte = ({navigation}) => {
    let [flatListItems, setFlatListItems] = useState([]);
  
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_poste',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          }
        );
      });
    }, []);
  
    let listViewItemSeparator = () => {
      return (
        <View
          style={{
            height: 0.2,
            width: '100%',
            backgroundColor: '#808080'
          }}
        />
      );
    };
  
    let listItemView = (item) => {
      return (
        <View
          key={item.poste_id}
          style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>Id: {item.poste_id}</Text>
          <Text>Name: {item.poste_name}</Text>
        </View>
      );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'grey'
            }}>
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: 'grey'
            }}>
          </Text>
          <Monbutton 
            title="Dashbord"
            customClick={() => navigation.navigate('Dashbord')}
          />
        </View>
      </SafeAreaView>
    );
  };
    
    export default Viewposte;