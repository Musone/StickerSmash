import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { ImagePickerResult, launchImageLibraryAsync } from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<any>(null);
  const [stickerSize, setStickerSize] = useState<number>(40);

  // useEffect(() => {
  //   console.log(`stickerSize: ${stickerSize}`);
  // }, [stickerSize]);

  const pickImageAsync = async () => {
    const result: ImagePickerResult = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("Image selection canceled.");
      setShowAppOptions(false);
      return;
    }

    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedEmoji(null);
  };

  const onSave = () => {
    alert("Not implemented.");
  };

  const onEmojiPickerClose = () => setShowEmojiPicker(false);

  const onAddSticker = () => setShowEmojiPicker(true);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={require("./assets/images/background-image.png")}
          selectedImage={selectedImage ?? null}
        />
        {selectedEmoji && (
          <EmojiSticker imageSize={stickerSize} stickerSource={selectedEmoji} />
        )}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton label={"Reset"} icon={"refresh"} onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton label={"Save"} icon={"save-alt"} onPress={onSave} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Select image"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this image"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker isVisible={showEmojiPicker} onClose={onEmojiPickerClose}>
        <EmojiList onClose={onEmojiPickerClose} onSelect={setSelectedEmoji} />
      </EmojiPicker>

      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {},
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
