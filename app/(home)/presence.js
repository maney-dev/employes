import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const presence = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("DD-MMMM-YYYY");
  };

  const [employes, setEmployes] = useState([]);
  useEffect(() => {
    const fetchEmployeData = async () => {
      try {
        const response = await axios.get("http://192.168.1.22:8000/employes");
        setEmployes(response.data);
      } catch (error) {
        console.log("erreur de recuperation des donnees des employes", error);
      }
    };
    fetchEmployeData();
  }, []);
  const [presence, setPresence] = useState([]);
  const fetchPresenceData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.22:8000/presences`, {
        params: {
          date: currentDate.format("DD-MMMM-YYYY"),
        },
      });
      setPresence(response.data);
    } catch (error) {
      console.log("erreur d'extraction des données de présence", error);
    }
  };

  useEffect(() => {
    fetchPresenceData();
  }, [currentDate]);
  const employeWithPresence = employes.map((employe) => {
    const presenceRecord = presence.find(
      (record) => record.employeId === employe.employeId
    );

    return {
      ...employe,
      status: presenceRecord ? presenceRecord.status : "",
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 12 }}>
          {employeWithPresence.map((item, index) => (
            <View
              onPress={() =>
                router.push({
                  pathname: "/[user]",
                  params: {
                    name: item.employeName,
                    id: item.employeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
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
                  {item?.employeName?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item?.employeName}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeId})
                </Text>
              </View>
              {item?.status && (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#1C15DA",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default presence;

const styles = StyleSheet.create({});
