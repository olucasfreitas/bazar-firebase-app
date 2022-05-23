import React, { useState } from "react";
import { Alert, View, StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../services/api";

export function Login(params:any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function teste(){
    Alert.alert(email)
  }

 async function createUser() {
   await createUserWithEmailAndPassword(auth, email, senha)
   .then((response)=>{
    Alert.alert(`User: ${JSON.stringify(response.user)}`);
   })
   .catch((erro)=>{
     Alert.alert(erro.message);
   });
 }

 async function loginUser() {
  await signInWithEmailAndPassword(auth, email, senha)
  .then((response)=>{
   Alert.alert(`Usuario logado: ${JSON.stringify(response.user.email)}`);
  })
  .catch((erro)=>{
    Alert.alert(erro.message);
  });
}



  return (
    <View style={styles.container}>
      <Text>BAZAR ARGO!</Text>
      <TextInput 
        style={styles.input}
        placeholder="e-mail"
        value={email}
        onChangeText={text => {setEmail(text)}}
      />
      <TextInput 
        style={styles.input}
        placeholder="senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={text => {setSenha(text)}}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={ value => {createUser()} }
        >
        <Text style={styles.texto}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={ value => {loginUser()} }
        >
        <Text style={styles.texto}>Logar no sistema</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: "#1010FF",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button:{
    width: '80%',
    alignItems: 'center',
    backgroundColor: "#0000FF",
    height: 40,
    justifyContent: 'center',
    margin: 5,
    borderRadius: 50,
  },
  texto: {
    color: "#fff",
  }

});