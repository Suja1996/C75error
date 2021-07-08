import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import * as firebase from "firebase" 

import db from "../config.js";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      email: "",
    };
  }
  login = async (email, password) => {
    if (email && password) {
       alert(email +" "+password)
      try {
        const response = await firebase.auth().signInWithEmailAndPassword(email,password)
      
        if (response) {
          this.props.navigation.navigate("Transaction");
        }
      } catch (error) {
          alert(error)
        // switch (error.code) {
        //     case 'auth/user-not-found':
        //       Alert.alert("user dosen't exists")
        //       console.log("doesn't exist")
        //       break
        //     case 'auth/invalid-email':
        //       Alert.alert('incorrect email or password')
        //       console.log('invaild')
        //       break
        //   }
      }
    } else {
      alert("enter email and password");
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: "center" }}>
        <TextInput
          style={{
            width: 200,
            height: 50,
            borderWidth: 2,
            borderColor: "black",
          }}
          onChangeText={(text) => this.setState({ email: text })}
          keyboardType="email-address"
          placeholder="enter the mail id"
        />
        <TextInput
          style={{
            width: 200,
            height: 50,
            borderWidth: 2,
            borderColor: "black",
          }}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
          placeholder="enter the password"
        />
        <TouchableOpacity
          style={{ width: 100, height: 50 }}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
         <Text> Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
