import { StyleSheet, Text, View } from "react-native";

export default function Quote({ text, author }) {
  //const { text, author } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    //borderWidth: 2,   
  },
  text: { 
    fontSize: 26, 
    fontStyle: "italic" ,
    //borderWidth: 2,
    marginBottom: 30,
    textAlign: "center"
  },
  author: { 
    fontSize: 18,
    marginBottom: 30,
    textAlign: "right" 
  },
});
