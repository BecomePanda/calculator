import { Paper, Container, Grid, Button, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { GridOperationButtons } from "./Assets/GridOperationButtons";
import { GridButtons } from "./Assets/GridButtons";

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
  marginTop: theme.spacing(20.5),
  borderRadius: 15,
}));

let eventListener: any = null;

function App() {
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState("");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(true);
  const numButtons = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pointRef = useRef<HTMLButtonElement>(null);
  const minusRef = useRef<HTMLButtonElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const multiRef = useRef<HTMLButtonElement>(null);
  const divideRef = useRef<HTMLButtonElement>(null);
  const percRef = useRef<HTMLButtonElement>(null);
  const ACRef = useRef<HTMLButtonElement>(null);
  const equalRef = useRef<HTMLButtonElement>(null);
  const symButtons = {
    ["."]: () => pointRef.current?.click(),
    ["-"]: () => minusRef.current?.click(),
    ["+"]: () => addRef.current?.click(),
    ["*"]: () => multiRef.current?.click(),
    ["/"]: () => divideRef.current?.click(),
    ["%"]: () => percRef.current?.click(),
    ["Backspace"]: () => ACRef.current?.click(),
    ["Enter"]: () => equalRef.current?.click(),
  }

  useEffect(() => {
    if (!eventListener) {
      window.addEventListener("keydown", keyDownEvent);
    }
  }, []);

  const keyDownEvent = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }

    if (!isNaN(Number(event.key))) {
      if (event.key === "5" && event.shiftKey) {
        const symbol: any = symButtons[event.key as keyof typeof symButtons]
        symbol();
      }

      numButtons[Number(event.key)].current?.click()

    } else {
      const symbol: any = symButtons[event.key as keyof typeof symButtons]
      if (symbol) {
        symbol();
      }
    }
  }


  const calculate = () => {
    if (!prevValue || !operation) return currentValue;

    const curr = parseFloat(currentValue ?? "0");
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
    setCurrentValue(null);
    setOverwrite(true);
  };

  const deleteOperation = () => {
    setCurrentValue(null);
    setOverwrite(true);
  };

  const percentOperation = () => {
    const curr = parseFloat(currentValue ?? "0");
    setCurrentValue((curr / 100).toString());
  };

  const selectOperation = (operation: string) => {
    if (prevValue) {
      const val = calculate();
      setCurrentValue(`${val}`);
      setPrevValue(`${val}`);
    } else {
      setPrevValue(currentValue ?? "0");
    }

    setOperation(operation);
    setOverwrite(true);
  };

  const setDigit = (digit: string) => {
    if (currentValue?.[0] === "0" && digit === "0") return;
    if (currentValue?.includes(".") && digit == ".") return;
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
            <OutputContainer>{currentValue ?? "0"}</OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButtons buttonRef={ACRef}
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
              operation={"%"} buttonRef={percRef}
              selectOperation={percentOperation}
              selectedOperation={operation}
            />
            <GridOperationButtons
              operation={"÷"} buttonRef={divideRef}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons buttonRef={numButtons[7]} digit={"7"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[8]} digit={"8"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[9]} digit={"9"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"X"} buttonRef={multiRef}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons buttonRef={numButtons[4]} digit={"4"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[5]} digit={"5"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[6]} digit={"6"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"-"} buttonRef={minusRef}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons buttonRef={numButtons[1]} digit={"1"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[2]} digit={"2"} enterDigit={setDigit} />
            <GridButtons buttonRef={numButtons[3]} digit={"3"} enterDigit={setDigit} />
            <GridOperationButtons
              operation={"+"} buttonRef={addRef}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridButtons buttonRef={numButtons[0]} digit={"0"} enterDigit={setDigit} xs={6} />
            <GridButtons buttonRef={symButtons["."]} digit={"."} enterDigit={setDigit} />
            <Grid item xs={3}>
              <Button fullWidth variant="contained" ref={equalRef} onClick={equals}>
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
