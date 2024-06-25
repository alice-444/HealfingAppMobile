import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignUpInfosScreen = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(Platform.OS === "ios");
    setBirthdate(currentDate);
  };

  const createAccount = () => {
    if (!email || !username) {
      Alert.alert("Erreur", "Email et nom d'utilisateur sont requis.");
      return;
    }

    fetch(`healfingapp-production.up.railway.app/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        gender: gender,
        birthdate: birthdate,
        role: "user",
        xp: 0,
        level: 1,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const err = await response.json();
          throw new Error(
            "Une erreur s'est produite lors de la création du compte: " +
              (err.message || response.statusText)
          );
        }
      })
      .then((data) => {
        console.log("Utilisateur enregistré avec succès !", data);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement des données utilisateur :",
          error
        );
        Alert.alert("Erreur", error.message);
      });
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Dernière étape</Text>
        <Text style={styles.subtitle}>
          Rempli le formulaire ci-dessous pour terminer ton inscription
        </Text>
        <Text style={styles.label}>Renseigne ta date de naissance !</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>{birthdate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              mode="date"
              is24Hour={true}
              display="spinner"
              value={birthdate}
              onChange={handleDateChange}
              style={styles.datePicker}
            />
          )}
        </View>
        <Text style={styles.label}>Quel est ton pseudo ?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#E6E0F0"
            style={styles.input}
            placeholder="Ton pseudo"
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <Text style={styles.label}>Quel est ton genre ?</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Femme" value="femme" />
            <Picker.Item label="Homme" value="homme" />
            <Picker.Item label="Autre" value="autre" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Créer un Compte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Déjà un compte ? Connectez-vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#3F317E",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E6E0F0",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#E6E0F0",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#E6E0F0",
    marginBottom: 10,
  },
  container: {
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    height: 50,
    color: "#E6E0F0",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#E6E0F0",
  },
  dateText: {
    color: "#E6E0F0",
    paddingVertical: 15,
  },
  datePicker: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#120B2D",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#E6E0F0",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignUpInfosScreen;
