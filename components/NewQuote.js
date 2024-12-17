import {
  KeyboardAvoidingView,
  Platform,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import BigButton from "./BigButton";
import IconButton from "./IconButton";

export default function newQuote({ visible, onCancel, onSave }) {
  const [name, setName] = useState("");
  const [zitat, setZitat] = useState("");

  function saveQuote() {
    const newZitat = zitat.trim()
    const newName = name.trim()

    if(newZitat.length === 0 || newName.length === 0) {
      alert("Zitat / Autor fehlen!")
      return;
    }
    onSave(newZitat, newName);
    setZitat("");
    setName("");   
  }

  function cancelEditing() {
    onCancel();
    setName("");
    setZitat("");
  }

  return (
    <Modal visible={visible} onRequestClose={onCancel} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >

        <IconButton
          onPress={cancelEditing}
          icon="backspace"
          style={styles.back}

        />

        <TextInput
          placeholder="neues Zitat"
          multiline={true}
          onChangeText={setZitat}
          style={[styles.Input, styles.newQuoteInput]}
        />

        <TextInput
          placeholder="Autor"
          returnKeyType="done"
          onChangeText={setName}
          onSubmitEditing={() => saveQuote()}
          style={styles.Input}
        />

        <BigButton
          title="speichern"
          onPress={() => saveQuote()}
        />

      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "grainsboro",
    width: "80%",
    marginBottom: 10,
    fontSize: 20,
  },
  newQuoteInput: {
    height: 150,
    textAlignVertical: "top",
  },
  back: {
    position: "absolute",
    top: 100,
    left: 30
  }
});
