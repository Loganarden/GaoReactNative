import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Poste from './Screens/Poste';
import User from './Screens/User';
import Dashbord  from './Screens/Dashbord';


import Ajouterposte from './Screens/poste/Ajouterposte'
import Deleteposte from './Screens/poste/Deleteposte'
import Updateposte from './Screens/poste/Updateposte'
import Viewposte from './Screens/poste/Viewposte'

import Ajouteruser from './Screens/user/Ajouteruser'
import Deleteuser from './Screens/user/Deleteuser'
import Updateuser from './Screens/user/Updateuser'
import Viewuser from './Screens/user/Viewuser'

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Dashbord"
            component={Dashbord}
          />
          <Stack.Screen
            name="User"
            component={User}
          />
          <Stack.Screen
            name="Ajouteruser"
            component={Ajouteruser}
          />
          <Stack.Screen
            name="Viewuser"
            component={Viewuser}
          />
          <Stack.Screen
            name="Poste"
            component={Poste}
          />
          <Stack.Screen
            name="Ajouterposte"
            component={Ajouterposte}
          />
          <Stack.Screen
            name="Updateposte"
            component={Updateposte}
          />
          <Stack.Screen
            name="Viewposte"
            component={Viewposte}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
