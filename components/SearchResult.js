import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import Fuse from "fuse.js";

const SearchResult = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  const window = Dimensions.get("window");
  const windowWidth = window.width;
  const windowHeight = window.height;

  const results = useMemo(() => {
    const options = {
      shouldSort: true,
      isCaseSensitive: false,
      threshold: 0.25,
      includeScore: true,
      keys: ["species"],
    };
    const fuse = new Fuse(data, options);
    const res = fuse.search(input).map((i) => i.item);
    return res;
  }, [data, input]);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ padding: 10, width: windowWidth / 1.3 }}>
        <FlatList
          data={results}
          renderItem={({ item }) => {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                onPress={() => {
                  setInput(item.species);
                  navigation.navigate("Main", {
                    screen: "Market",
                    params: { input: item.species },
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    {item.species}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
