import { View, Image } from "react-native";
import Animated from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface EmojiStickerProps {
  imageSize: number;
  stickerSource: any;
}

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: EmojiStickerProps) {
  return (
    <View style={{ top: -350 }}>
      <AnimatedImage
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
