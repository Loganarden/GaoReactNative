import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert, SafeAreaView,  Text, } from 'react-native';
import Monbutton from '../../Components/Monbutton'
import Monchamptext from '../../Components/Monchamptext'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.gaoDatabase')

