import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text, } from 'react-native';
import Monbutton from '../../Components/Monbutton'
import Monchamptext from '../../Components/Monchamptext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

const Updateuser = ({ navigation }) => {
    let [inputUserId, setInputUserId] = useState('');
    let [userName, setUserName] = useState('');
    let [userContact, setUserContact] = useState('');
    let [userAddress, setUserAddress] = useState('');
  
    let updateAllStates = (name, contact, address) => {
      setUserName(name);
      setUserContact(contact);
      setUserAddress(address);
    };
  
    let searchUser = () => {
      console.log(inputUserId);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where user_id = ?',
          [inputUserId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              updateAllStates(
                res.user_name,
                res.user_contact,
                res.user_address
              );
            } else {
              alert('Pas d\'utilisateur trouver');
              updateAllStates('', '', '');
            }
          }
        );
      });
    };

    let updateUser = () => {
      console.log(inputUserId, userName, userContact, userAddress);
  
      if (!inputUserId) {
        alert('Vous devez entrer un ID');
        return;
      }
      if (!userName) {
        alert('Vous devez entrer un Nom');
        return;
      }
      if (!userContact) {
        alert('Vous devez entrer un N°');
        return;
      }
      if (!userAddress) {
        alert('Vous devez entrer une Adress');
        return;
      }
  
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
          [userName, userContact, userAddress, inputUserId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Envoyer',
                'Vous éte bien enregistrer',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Viewuser'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Veuillez réessayer');
          }
        );
      });
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'space-between' }}>
                <Monchamptext
                  placeholder="ID"
                  style={{ padding: 10 }}
                  onChangeText={
                    (inputUserId) => setInputUserId(inputUserId)
                  }
                />
                <Monbutton
                  title="Chercher"
                  customClick={searchUser} 
                />
                <Monchamptext
                  placeholder="Nom"
                  value={userName}
                  style={{ padding: 10 }}
                  onChangeText={
                    (userName) => setUserName(userName)
                  }
                />
                <Monchamptext
                  placeholder="N°"
                  value={'' + userContact}
                  onChangeText={
                    (userContact) => setUserContact(userContact)
                  }
                  maxLength={10}
                  style={{ padding: 10 }}
                  keyboardType="numeric"
                />
                <Monchamptext
                  value={userAddress}
                  placeholder="Address"
                  onChangeText={
                    (userAddress) => setUserAddress(userAddress)
                  }
                  maxLength={225}
                  numberOfLines={5}
                  multiline={true}
                  style={{ textAlignVertical: 'top', padding: 10 }}
                />
                <Monbutton
                  title="Modifier"
                  customClick={updateUser}
                />
              </KeyboardAvoidingView>
            </ScrollView>
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
        </View>
      </SafeAreaView>
    );
  };
  
  export default Updateuser;