import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

export default function MasonaryLayout({ data, screen }) {
  return (
    <MasonryList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <CardItem data={item} screen={screen} />}
    />
  );
}

const CardItem = ({ data, screen }) => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate(screen, { param: data._id });
  };
  return (
    <TouchableOpacity
      style={{ height: Math.round(Math.random() * 100) + 200 }}
      className="bg-[#111] m-1 rounded-md relative overflow-hidden"
      onPress={handleClick}
    >
      <Image
        source={{ uri: urlFor(data.image).url() }}
        className="w-full h-full object-cover"
      />
    </TouchableOpacity>
  );
};
