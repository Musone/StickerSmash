import { useState } from "react";
import { Image, Pressable, StyleSheet, FlatList, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface EmojiListProps {
  onSelect?: (arg1: any) => any;
  onClose: () => any;
}

export default function EmojiList({
  onSelect,
  onClose
}: EmojiListProps) {
  const [emojis] = useState([
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
  ]);

  return (
    <FlatList 
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              if (onSelect) onSelect(item);
              onClose();
            }}
          >
            <Image key={index} source={item} style={styles.image} />
          </Pressable>
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});