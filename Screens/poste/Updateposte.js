import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView, Text, } from 'react-native';
import Monbutton from '../../Components/Monbutton'
import Monchamptext from '../../Components/Monchamptext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

const Updateposte = ({ navigation }) => {
    let [inputPosteId, setInputPosteId] = useState('');
    let [posteName, setPosteName] = useState('');
  
    let updateAllStates = (name) => {
      setPosteName(name);

    };
  
    let searchPoste = () => {
      console.log(inputPosteId);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_poste where poste_id = ?',
          [inputPosteId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              updateAllStates(
                res.poste_name,
              );
            } else {
              alert('Pas de poste trouver');
              updateAllStates('');
            }
          }
        );
      });
    };

    let Updateposte = () => {
      console.log(inputPosteId, posteName );
  
      if (!inputPosteId) {
        alert('Vous devez entrer un ID');
        return;
      }
      if (!posteName) {
        alert('Vous devez entrer un Nom');
        return;
      }
  
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE table_poste set poste_name=?, where poste_id=?',
          [posteName,  inputPosteId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Envoyer',
                'Vous éte bien enregistrer',
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
                  placeholder="ID"
                  style={{ padding: 10 }}
                  onChangeText={
                    (inputPosteId) => setInputPosteId(inputPosteId)
                  }
                />
                <Monbutton
                  title="Chercher"
                  customClick={searchPoste} 
                />
                <Monchamptext
                  placeholder="Nom"
                  value={posteName}
                  style={{ padding: 10 }}
                  onChangeText={
                    (posteName) => setPosteName(posteName)
                  }
                />
                <Monbutton
                  title="Modifier"
                  customClick={Updateposte}
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
  
  export default Updateposte;