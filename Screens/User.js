import React, {useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Monbutton from '../Components/Monbutton'
import Montext from '../Components/Montext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

const User = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Montext text="Ajouter un utilisatuer" />
          <Monbutton
            title="Ajouter"
            customClick={() => navigation.navigate('Ajouteruser')}
          />
          <Montext text="Afficher la liste des utilisateur" />
          <Monbutton
            title="Afficher"
            customClick={() => navigation.navigate('Viewuser')}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
)

export default User;
