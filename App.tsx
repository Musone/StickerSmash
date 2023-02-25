import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("Image selection canceled.");
      return;
    }

    setSelectedImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={require("./assets/images/background-image.png")}
          selectedImage={selectedImage ?? null}
        />
        <Button label="Select image" theme="primary" onPress={pickImageAsync} />
        <Button
          label="Use this image"
          onPress={() => alert("You pressed the button. Good job.")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
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
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 10,
//   },
//   image: {
//     width: 100,
//     height: 200,
//     borderRadius: 20,
//   }
// });
