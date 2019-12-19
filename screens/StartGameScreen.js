import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
  const [enterValue, setEnterValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnterValue(inputText.replace(/[^0-9]/, ""));
  };

  const resetInputHandler = () => {
    setEnterValue("");
    setConfirm(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enterValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      return Alert.alert(
        "Invalid Number",
        "A number has to be a number between 1 to 99 !",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
    }
    setConfirm(true);
    setSelectedNumber(parseInt(enterValue));
    setEnterValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirm) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enterValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.myButton}>
              <Button
                title="Reset"
                onPress={resetInputHandler}
                color={Colors.accent}
              />
            </View>
            <View style={styles.myButton}>
              <Button
                title="Confirm"
                onPress={() => {}}
                color={Colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  myButton: {
    width: "40%"
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  summaryContainer: {
    margin: 20,
    alignItems: "center"
  }
});

export default StartGameScreen;
