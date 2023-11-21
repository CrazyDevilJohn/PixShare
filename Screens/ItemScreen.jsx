import React from "react";
import moment from "moment";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { getItemById, urlFor } from "../sanity";

const ItemScreen = ({ route }) => {
  const id = route?.params?.param;
  const navigation = useNavigation();
  const [item, setItem] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#ffffff00");
    StatusBar.setTranslucent(true);
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    getItemById(id)
      .then((data) => setItem(data))
      .catch((e) => alert(e));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    let date = moment().format("YYYYMMDDhhmmss");
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
    try {
      const res = await FileSystem.downloadAsync(
        urlFor(item.image).url(),
        fileUri
      );
      saveFile(res.uri);
    } catch (err) {
      console.log("FS Err: ", err);
    }
    setIsDownloading(false);
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync("Download");
        if (album == null) {
          await MediaLibrary.createAlbumAsync("Download", asset, false);
          Platform.OS === "android" &&
            ToastAndroid.show("Image Saved successfully!", ToastAndroid.LONG);
        } else {
          Platform.OS === "android" &&
            ToastAndroid.show("Image Saved successfully!", ToastAndroid.LONG);
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (err) {
        console.log("Save err: ", err);
      }
    } else if (status === "denied") {
      alert("please allow permissions to download");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#04020d] relative">
      {isLoading ? (
        <ActivityIndicator color={"#ff0000"} size={"large"} />
      ) : (
        item && (
          <>
            <Image
              source={{ uri: urlFor(item.image).url() }}
              className="w-full h-full object-cover"
            />
            <SafeAreaView className="absolute z-10 inset-0 flex items-center justify-start h-full w-full">
              <View className="w-full flex">
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  className="p-4 w-[60px]"
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View className="w-full flex-1 relative">
                <View className="absolute bottom-[20px] inset-x-0 px-4">
                  <BlurView
                    intensity={60}
                    tint="dark"
                    className="p-4 flex-row items-center justify-between"
                  >
                    <View className="flex  justify-between gap-3">
                      <Text className="text-2xl text-white font-bold">
                        {item.title}
                      </Text>
                      <Text className="text-white font-bold">
                        {item.desription}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleDownload}>
                      <Ionicons
                        name="md-cloud-download-sharp"
                        size={24}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </View>
            </SafeAreaView>
            {isDownloading && (
              <View className="absolute w-full h-full z-10 bg-black items-center justify-center opacity-80">
                <ActivityIndicator color={"#ff0000"} size={"large"} />
              </View>
            )}
          </>
        )
      )}
    </View>
  );
};

export default ItemScreen;
