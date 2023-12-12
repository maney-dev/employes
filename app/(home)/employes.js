import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../../components/SearchResults";

const employes = () => {
  const [employes, setEmployes] = useState([]);
  const [input, setInput] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchEmployeData = async () => {
      try {
        const response = await axios.get("http://192.168.1.22:8000/employes");
        setEmployes(response.data);
      } catch (error) {
        console.log("erreur d'extraction des données des employés", error);
      }
      fetchEmployeData();
    };
  }, []);
  console.log(employes);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input.toString()}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Recherche..."
          />
          {employes.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="black" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>

      {employes.length > 0 ? (
        <SearchResults data={employes} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Pas de données</Text>
          <Text>Appuyez sur le bouton plus pour ajouter un employé</Text>
          <Pressable onPress={() => router.push("/(home)/adddetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default employes;

const styles = StyleSheet.create({});
