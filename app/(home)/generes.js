import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  Entypo,
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

const generes = () => {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 12, backgroundColor: "white" }}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#E8a779",
              padding: 12,
              borderEndStartRadius: 7,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Octicons name="report" size={24} color="black" />
            </View>
            <Text>Tous Rapport Générés</Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 7,
          }}
        >
          <Pressable
            onPress={() => router.push("/(home)/presence")}
            style={{
              backgroundColor: "#Ff7700",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="newspaper-outline" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              Rapport Presence
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/sommaire")}
            style={{
              backgroundColor: "#Ff7700",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Octicons name="repo-pull" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              Rapport Sommaire
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default generes;

const styles = StyleSheet.create({});
