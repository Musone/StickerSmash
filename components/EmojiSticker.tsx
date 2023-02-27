import { StyleSheet, View, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { createRef, useState } from "react";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

interface EmojiStickerProps {
  imageSize: number;
  stickerSource: any;
}

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: EmojiStickerProps) {
  const imagePinch = createRef();
  const imagePan = createRef();

  const imageScale = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastEventScale = useSharedValue(-1);

  const adjustImageScale = async (newImageScale: number) => {
    "worklet";
    if (newImageScale > 30 && newImageScale < 300) {
      imageScale.value = newImageScale;
    }
  };

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (imageScale.value) {
        adjustImageScale(imageScale.value * 2);
      }
    },
  });

  const onDrag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart(event, context: any) {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive(event, context: any) {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const onPinch = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      // console.log({pinchScale: event.scale});

      const dScale = Math.abs(lastEventScale.value - event.scale);
      // console.log ({dScale})

      if (imageScale.value && dScale > 0.01) {
        lastEventScale.value = event.scale;
        adjustImageScale(event.scale * imageScale.value);
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: imageScale.value + 100,
      width: imageScale.value + 100,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(imageScale.value),
      height: withSpring(imageScale.value),
    };
  });

  return (
    <PinchGestureHandler
      ref={imagePinch}
      onGestureEvent={onPinch}
      simultaneousHandlers={imagePan}
    >
      <AnimatedView>
        <PanGestureHandler
          ref={imagePan}
          onGestureEvent={onDrag}
          simultaneousHandlers={imagePinch}
        >
          <AnimatedView style={[containerStyle, styles.emojiStickerContainer]}>
            <TapGestureHandler
              onGestureEvent={onDoubleTap as () => void}
              numberOfTaps={2}
            >
              <AnimatedImage
                source={stickerSource}
                resizeMode="contain"
                style={[imageStyle, { width: imageSize, height: imageSize }]}
              />
            </TapGestureHandler>
          </AnimatedView>
        </PanGestureHandler>
      </AnimatedView>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  emojiStickerContainer: {
    top: -250,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
