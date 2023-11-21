import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { getCategoryItems } from "../sanity";
import { Entypo } from "@expo/vector-icons";
import MasonaryLayout from "./MasonaryLayout";

const Items = ({ route }) => {
  const id = route?.params?.param;
  const [items, setItems] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getCategoryItems(id)
      .then((data) => setItems(data))
      .catch((e) => alert(e));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      <StatusBar backgroundColor={"#04020d"} barStyle={"light-content"} />
      {isLoading ? (
        <ActivityIndicator color={"#ff0000"} size={"large"} />
      ) : (
        <>
          {items && items.length > 0 ? (
            <>
              <SafeAreaView className="flex w-full flex-1 items-center justify-start gap-4 bg-[#04020d]">
                <View className="w-full px-6 flex-row items-center justify-between">
                  <Text className="text-2xl text-gray-50 font-semibold">
                    4K Wallpaper
                  </Text>
                  <TouchableOpacity>
                    <Entypo
                      name="dots-three-vertical"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView className="w-full h-full px-4">
                  {items ? (
                    <>
                      <MasonaryLayout data={items} screen={"ItemScreen"} />
                    </>
                  ) : (
                    <>
                      <ActivityIndicator color={"#ff0000"} size={"large"} />
                    </>
                  )}
                </ScrollView>
              </SafeAreaView>
            </>
          ) : (
            <Text className="text-3xl font-bold text-white">
              No Items Found
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Items;
