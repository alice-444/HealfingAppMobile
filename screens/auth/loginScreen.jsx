import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://healfingapp-production.up.railway.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful", data);
        await AsyncStorage.setItem("token", data.token);
        setErrorMessage("");
        navigation.navigate("Home");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred");
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            testID="email-input"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={30}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            testID="password-input"
          />
        </View>

        {errorMessage ? (
          <Text testID="error-message" style={styles.error}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          testID="login-button"
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgetPasswordsLink}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>
            Pas encore de compte ? Rejoignez-vous
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.socialText}
          onPress={() => navigation.navigate("Login")}
        >
          Ou connectez-vous :
        </Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity>
            <Ionicons name="logo-instagram" size={40} color="#f4fefe" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" size={40} color="#faf0e6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#3F317E",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00BFFF",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#fff",
    marginVertical: 10,
  },
  forgetPasswordsLink: {
    color: "#fff",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  socialText: {
    color: "#fff",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default Login;
