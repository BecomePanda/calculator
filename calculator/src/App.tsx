import { Paper, Container, Grid, Button, styled } from "@mui/material";
import { useState } from "react";
import { GridOperationButtons } from "./assets/GridOperationButtons";
import { GridButtons } from "./assets/GridButtons";

const OutputContainer = styled("div")(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

function App() {
  const [currentValue, setCurrentValue] = useState("0");
  const [prevValue, setPrevValue] = useState("");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!prevValue || !operation) return currentValue;

    const curr = parseFloat(currentValue);
    const prev = parseFloat(prevValue);

    let result;

    switch (operation) {
      case "÷":
        return (result = prev / curr);
      case "X":
        return (result = prev * curr);
      case "-":
        return (result = prev - curr);
      case "+":
        return (result = prev + curr);
    }

    return result;
  };

  const equals = () => {
    const val = calculate();
    setCurrentValue(`${val}`);
    setPrevValue("");
    setOperation("");
    setOverwrite(true);
  };

  const clearOperation = () => {
    setPrevValue("");
    setOperation("");
    setCurrentValue("0");
    setOverwrite(true);
  };

  const deleteOperation = () => {
    setCurrentValue("0");
    setOverwrite(true);
  };

  const percentOperation = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
  };

  const selectOperation = (operation: string) => {
    if (prevValue) {
      const val = calculate();
      setCurrentValue(`${val}`);
      setPrevValue(`${val}`);
    } else {
      setPrevValue(currentValue);
    }

    setOperation(operation);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue[0] === "0" && digit === "0") return;
    if (currentValue.includes(".") && digit == ".") return;
    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer>{currentValue}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButtons
              operation={"AC"}
              selectOperation={clearOperation}
              selectedOperation={operation}
            />
            <GridOperationButtons
              operation={"C"}
              selectOperation={deleteOperation}
              selectedOperation={operation}
            />
            <GridOperationButtons
              operation={"%"}
              selectOperation={percentOperation}
              selectedOperation={operation}
            />
            <GridOperationButtons
              operation={"÷"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons digit={"7"} enterDigit={setDigit} />
            <GridButtons digit={"8"} enterDigit={setDigit} />
            <GridButtons digit={"9"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"X"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons digit={"4"} enterDigit={setDigit} />
            <GridButtons digit={"5"} enterDigit={setDigit} />
            <GridButtons digit={"6"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"-"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons digit={"1"} enterDigit={setDigit} />
            <GridButtons digit={"2"} enterDigit={setDigit} />
            <GridButtons digit={"3"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"+"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons digit={"0"} enterDigit={setDigit} xs={6} />
            <GridButtons digit={"."} enterDigit={setDigit} />
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
