import { dirname } from "path";
import { FunctionComponent } from "react";
import { StyleSheet, Image, View } from "react-native";

interface ImageViewerProps {
  placeholderImageSource: any; // require(<string of image path here>)
  selectedImage?: string | null; // require(<string of image path here>)
}

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: ImageViewerProps) {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : placeholderImageSource}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    // height: 440,
    height: 600,
    borderRadius: 18,
  },
});
