import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Alert, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Quote from "./components/Quote";
import NewQuote from "./components/NewQuote";
import BigButton from "./components/BigButton";
import IconButton from "./components/IconButton";
import Firebase from "./Firebase";

export default function App() {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Firebase.init();
    loadQuotes();
  }, []);

  function addQuoteToList(text, author) {
    setShowNewDialog(false);
    const newQuotes = [
      ...quotes, // Spread-Operator
      { text, author }
    ];
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(text, author, newQuotes);
  }

  function removeQuoteFromList() {
    const newQuotes = [...quotes];
    const id = quotes[index].id;
    newQuotes.splice(index, 1)
    setIndex(0);
    setQuotes(newQuotes);
    Firebase.removeQuotes(id);
  }

  function deleteQuote() {
    Alert.alert(
      'Zitat löschen!',
      'Zitat wirklich löschen?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel'
        },
        {
          text: 'Bestätigen',
          style: 'destructive',
          onPress: removeQuoteFromList,
        },
      ]
    );
  }

  async function saveQuotes(text, author, newQuotes) {
    const id = await Firebase.saveQuote(text, author);
    newQuotes[newQuotes.length - 1].id = id;
    setQuotes(newQuotes);
  }

  async function loadQuotes() {
    const quotesFromDB = await Firebase.getQuotes();
    setQuotes(quotesFromDB);
    setLoading(false);
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="orangered" />
      </View>
    );
  }
  let content = <Text style={styles.noQuote} >Keine Zitate vorhanden.</Text>

  if (quotes.length > 0) {
    const quote = quotes[index];
    content = <Quote
      text={quote.text}
      author={quote.author}
    />
  }

  return (
    <View style={styles.container}>
      {quotes.length === 0 ? null : (
        <IconButton
          onPress={deleteQuote}
          icon="delete"
          style={styles.quoteDelete}
        />
      )}
      <IconButton
        onPress={() => setShowNewDialog(true)}
        icon="add-circle"
        style={styles.newQuote}
      />

      <NewQuote
        visible={showNewDialog}
        onCancel={() => setShowNewDialog(false)}
        onSave={addQuoteToList}
      />
      {content}

      {quotes.length <= 1 ? null : (
        <BigButton
          style={styles.next}
          title="Nächstes Zitat"
          onPress={() => setIndex((index + 1) % quotes.length)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
  },
  newQuote: {
    position: "absolute",
    top: 100,
    right: 30,
  },
  next: {
    position: "absolute",
    bottom: 100
  },
  quoteDelete: {
    position: "absolute",
    top: 100,
    left: 30
  },
  noQuote: {
    fontSize: 26,
    fontWeight: 300
  }
});

