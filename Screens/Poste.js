import React, {useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Monbutton from '../Components/Monbutton'
import Montext from '../Components/Montext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

const Poste = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_poste'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_poste', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_poste(poste_id INTEGER PRIMARY KEY AUTOINCREMENT, poste_name VARCHAR(20))',
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
          <Montext text="Ajouter un poste" />
          <Monbutton
            title="ajouter"
            customClick={() => navigation.navigate('Ajouterposte')}
          />
          <Montext text="Afficher la liste des postes" />
          <Monbutton
            title="Afficher"
            customClick={() => navigation.navigate('Viewposte')}
          />
          <Montext text="Modifier un poste" />
          <Monbutton
            title="Modifier"
            customClick={() => navigation.navigate('Updateposte')}
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

export default Poste;
