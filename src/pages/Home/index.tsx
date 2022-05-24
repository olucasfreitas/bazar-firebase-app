import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../services/api";

export default function Home(params: any) {
  const logOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logout", `Usuario foi deslogado com sucesso`, [
          { text: "OK", onPress: () => params.navigation.navigate("Login") },
        ]);
      })
      .catch((erro) => {
        Alert.alert("Erro ao deslogar usuário", `${erro.message.toString()}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.texto}>Sair</Text>
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
