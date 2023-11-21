import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import MasonaryLayout from "./MasonaryLayout";
import { getCategory } from "../sanity";

function HomeScreen() {
  const [categories, setCategories] = useState(null);
  React.useEffect(() => {
    getCategory()
      .then((data) => setCategories(data))
      .catch((e) => alert(e));
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      <SafeAreaView className="flex w-full flex-1 items-center justify-start gap-4 bg-[#04020d]">
        <View className="w-full px-6 flex-row items-center justify-between">
          <Text className="text-2xl text-gray-50 font-semibold">
            4K Wallpaper
          </Text>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView className="w-full h-full px-4">
          {categories ? (
            <>
              <MasonaryLayout data={categories} screen={"Items"} />
            </>
          ) : (
            <>
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator color={"#ff0000"} size={"large"} />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default HomeScreen;
