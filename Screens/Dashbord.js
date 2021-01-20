import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Monbutton from '../Components/Monbutton'
import Montext from '../Components/Montext'

const Dashbord = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Montext text="Gestion des poste" />
          <Monbutton
            title="Aller"
            customClick={() => navigation.navigate('Poste')}
          />
          <Montext text="Gestion des utilisateurs" />
          <Monbutton
            title="Aller"
            customClick={() => navigation.navigate('User')}
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

export default Dashbord;