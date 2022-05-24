import React, { useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/api";

export function Login(params: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  async function createUser() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((response) => {
        Alert.alert(
          "Usuário criado",
          `O usuário ${response.user.email} foi cadastrado com sucesso`
        );
      })
      .catch((erro) => {
        Alert.alert("Erro ao criar usuário", `${erro.message.toString()}`);
      });
  }

  async function loginUser() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((response) => {
        Alert.alert(
          "Login",
          `Usuario ${JSON.stringify(response.user.email)} logado com sucesso`,
          [{ text: "OK", onPress: () => params.navigation.navigate("Home") }]
        );
      })
      .catch((erro) => {
        Alert.alert("Erro no login usuário", `${erro.message.toString()}`);
      });
  }

  return (
    <View style={styles.container}>
      <Text>BAZAR ARGO!</Text>
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={(text) => {
          setSenha(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.texto}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.texto}>Logar no sistema</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#1010FF",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#0000FF",
    height: 40,
    justifyContent: "center",
    margin: 5,
    borderRadius: 50,
  },
  texto: {
    color: "#fff",
  },
});
