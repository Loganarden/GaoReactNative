import React, { useState } from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView,  Text, } from 'react-native';
import Monbutton from '../../Components/Monbutton'
import Monchamptext from '../../Components/Monchamptext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

const Ajouterposte = ({ navigation }) => {
  let [posteName, setPosteName] = useState('');

  let register_poste = () => {
    console.log(posteName);

    if (!posteName) {
      alert('Vous devez entrer un poste');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_poste (poste_name) VALUES (?)',
        [posteName],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Envoyer',
              'poste enregistrer',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Viewposte'),
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
                placeholder="Nom du poste"
                onChangeText={
                  (posteName) => setPosteName(posteName)
                }
                style={{ padding: 10 }}
              />
              <Monbutton title="Ajouter" customClick={register_poste} />
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

export default Ajouterposte;