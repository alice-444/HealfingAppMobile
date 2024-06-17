import { useState } from "react";
import Menu from "../components/Menu.jsx";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const Contact = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState(null);

  const renderContactPro = () => (
    <View style={styles.contactList}>
      <TouchableOpacity style={styles.contactButton}>
        <Image source={require("../assets/doctolib.png")} style={styles.logo} />
        <Text style={styles.buttonText}>Doctolib</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Image
          source={require("../assets/mondocteur.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Mondocteur</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Image
          source={require("../assets/therapeutes.jpeg")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Therapeute.com</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton}>
        <Image source={require("../assets/resalib.png")} style={styles.logo} />
        <Text style={styles.buttonText}>Resalib</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmergencyNumbers = () => {
    const [emergencyNumbers, setEmergencyNumbers] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3002/importantNumbers')
        .then((response) => response.json())
        .then((data) => setEmergencyNumbers(data))
        .catch((error) => console.error('Erreur lors de la récupération des numéros d\'urgence:', error));
    }, []);

    return (
      <View style={styles.contactList}>
        {emergencyNumbers.map((number, index) => (
          <TouchableOpacity key={index} style={styles.contactButton}>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>{number.name}</Text>
            </View>
            <View style={styles.buttonNumberContainer}>
              <Text style={styles.buttonText}>{number.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack("homeScreen")}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => setActiveSection("contactPro")}
          style={styles.iconContainer}
        >
          <Ionicons name="medkit-outline" size={30} color="#fff" />
          <Text style={styles.headerText}>Contact Pro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveSection("emergencyNumbers")}
          style={styles.iconContainer}
        >
          <Ionicons name="apps-outline" size={30} color="#fff" />
          <Text style={styles.headerText}>Numéros D'urgence</Text>
        </TouchableOpacity>
      </View>

      {activeSection === "contactPro" && renderContactPro()}
      {activeSection === "emergencyNumbers" && renderEmergencyNumbers()}

      <View style={styles.footer}>
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120B2D",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#3F317E",
  },
  backButton: {
    color: "#fff",
    fontSize: 24,
  },
  menuButton: {
    color: "#fff",
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  contactList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7259E4",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonNumberContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  footer: {
    backgroundColor: "#3F317E",
  },
});

export default Contact;
