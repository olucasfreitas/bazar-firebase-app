import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../../services/api";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import {
  FAB,
  Card,
  Paragraph,
  Modal,
  Portal,
  Provider,
  Button,
  TextInput,
} from "react-native-paper";

export default function Home(params: any) {
  const [loggedUser, setLoggedUser] = useState();
  const [products, setProducts] = useState<any>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    nome: "",
    foto: "https://source.unsplash.com/random/400x400",
    valor: "",
    vendido: false,
    contato: "",
    id: "",
  });
  const [showSelectedProduct, setShowSelectedProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nome: "",
    foto: "https://source.unsplash.com/random/400x400",
    valor: "",
    vendido: false,
    contato: "",
    id: "",
  });
  const [switcher, setSwitcher] = useState(false);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        params.navigation.navigate("Login");
      })
      .catch((erro) => {
        Alert.alert("Erro ao deslogar usuário", `${erro.message.toString()}`);
      });
  };

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    let prods: any = [];
    querySnapshot.forEach((doc: any) => {
      const prod = {
        id: doc.id,
        nome: doc.data().nome,
        foto: doc.data().foto,
        contato: doc.data().contato,
        valor: doc.data().valor,
        vendedor: doc.data().vendedor,
        vendido: doc.data().vendido,
      };
      prods.push(prod);
    });
    setProducts(prods);
  };

  const addProduct = async () => {
    await addDoc(collection(db, "produtos"), {
      nome: newProduct.nome,
      foto: newProduct.foto,
      valor: newProduct.valor,
      vendido: newProduct.vendido,
      contato: newProduct.contato,
      vendedor: loggedUser,
    });
    setSwitcher(!switcher);
  };

  const sellProduct = async (produto: any) => {
    const prodRef = doc(db, "produtos", produto.id);
    await updateDoc(prodRef, {
      vendido: true,
    });
    setSwitcher(!switcher);
  };

  const modalProduto = (prod: any) => {
    setSelectedProduct(prod);
    setShowSelectedProduct(true);
  };

  useEffect(() => {
    setLoggedUser(params.route.params.id);
    getProducts();
  }, [switcher]);

  return (
    <Provider>
      <ScrollView style={styles.container}>
        {products.map((product: any) => (
          <Card style={{ width: "90%", margin: 16 }} key={product.nome}>
            <Card.Title title={product.nome} />
            <Card.Content>
              <Paragraph>Valor: R$ {product.valor}</Paragraph>
              <Paragraph>Contato do vendedor: {product.contato}</Paragraph>
            </Card.Content>
            <Card.Cover
              source={{
                uri: product.foto,
              }}
            />
            <Card.Actions>
              {product.vendedor == loggedUser && !product.vendido && (
                <Button
                  mode="contained"
                  compact={true}
                  onPress={() => {
                    sellProduct(product);
                  }}
                >
                  Vender Produto
                </Button>
              )}

              <Button
                mode="contained"
                style={{ marginLeft: 8 }}
                compact={true}
                onPress={() => {
                  modalProduto(product);
                }}
              >
                Ver produto
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Portal>
          <Modal
            visible={showAddModal}
            onDismiss={() => setShowAddModal(false)}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              style={styles.input}
              placeholder="Nome do Produto"
              onChangeText={(text) => {
                setNewProduct({ ...newProduct, nome: text });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Preço do Produto"
              keyboardType="numeric"
              onChangeText={(text) => {
                setNewProduct({ ...newProduct, valor: text });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Link da Foto do Produto"
              value={newProduct.foto}
              onChangeText={(text) => {
                setNewProduct({ ...newProduct, foto: text });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Contato do vendedor"
              keyboardType="phone-pad"
              onChangeText={(text) => {
                setNewProduct({ ...newProduct, contato: text });
              }}
            />

            <Button
              mode="contained"
              compact={true}
              onPress={() => {
                addProduct(), setShowAddModal(false);
              }}
            >
              Cadastrar novo produto
            </Button>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={showSelectedProduct}
            onDismiss={() => setShowSelectedProduct(false)}
            contentContainerStyle={styles.modal}
          >
            <Card
              style={{ width: "90%", margin: 16 }}
              key={selectedProduct.nome}
            >
              <Card.Title title={selectedProduct.nome} />
              <Card.Content>
                <Paragraph>Valor: R$ {selectedProduct.valor}</Paragraph>
                <Paragraph>
                  Contato do vendedor: {selectedProduct.contato}
                </Paragraph>
                {selectedProduct.vendido ? (
                  <Paragraph>Produto Vendido</Paragraph>
                ) : (
                  <Paragraph>Produto não vendido</Paragraph>
                )}
              </Card.Content>
              <Card.Cover
                source={{
                  uri: selectedProduct.foto,
                }}
              />
            </Card>
          </Modal>
        </Portal>
      </ScrollView>

      <FAB
        style={{ position: "absolute", margin: 16, right: 50, bottom: 0 }}
        small
        icon="logout"
        onPress={logOut}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => setShowAddModal(true)}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  modal: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginHorizontal: 8,
    height: 500,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
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
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "30%",
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
