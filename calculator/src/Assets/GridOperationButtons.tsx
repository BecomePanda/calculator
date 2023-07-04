import { Grid, Button, styled } from "@mui/material";

interface GridOperationButtonsProps {
  operation: string;
  selectOperation: (operation: string) => void;
  selectedOperation: string;
  buttonRef?: any;
}

const StyledButton = styled(Button)<{ selected: boolean }>((props) => ({
  backgroundColor: "rgb (254, 241, 71,.1)",
  borderColor: props.selected ? "#FFF" : "rgb (254, 241, 71, 0.5)",
}));

export const GridOperationButtons: React.FC<GridOperationButtonsProps> = ({
  operation,
  selectOperation,
  selectedOperation,
  buttonRef,
}) => {
  return (
    <Grid item xs={3}>
      <StyledButton ref = {buttonRef}
        fullWidth
        variant="outlined"
        onClick={() => selectOperation(operation)}
        selected={selectedOperation === operation}
      >
        {operation}
      </StyledButton>
    </Grid>
  );
};
