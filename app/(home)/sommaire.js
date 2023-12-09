import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

const sommaire = () => {
  const [presenceData, setPresenceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM-YYYY");
  };
  const fetchRapportPresence = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.248:8000/rapport-presence-employes`,
        {
          params: {
            month: 12,
            year: 2023,
          },
        }
      );

      setPresenceData(response.data.rapport);
    } catch (error) {
      console.log("Erreur de recuperation des presences");
    }
  };
  useEffect(() => {
    fetchRapportPresence();
  }, []);
  console.log(presenceData);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        {presenceData?.map((item, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#Ff7700",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeId})
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                margin: 5,
                padding: 5,
                backgroundColor: "#ABCABA",
                borderRadius: 5,
              }}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>P</DataTable.Title>
                  <DataTable.Title>A</DataTable.Title>
                  <DataTable.Title>DJ</DataTable.Title>
                  <DataTable.Title>VC</DataTable.Title>
                  <DataTable.Title>JV</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.present}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                  <DataTable.Cell>1</DataTable.Cell>
                  <DataTable.Cell>0</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default sommaire;

const styles = StyleSheet.create({});
