import { Pressable, Text, StyleSheet } from "react-native";

export default function BigButton({ onPress, title, style }) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.button, style]}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        padding: 10,
        backgroundColor: "grey",
        borderRadius: 10,
    },
    title: {
        color: "gainsboro",
        fontSize: 18
    }
})