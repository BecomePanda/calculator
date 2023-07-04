import { Grid, Button } from "@mui/material";

interface GridButtonsProps {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
  buttonRef: any;
}

export const GridButtons: React.FC<GridButtonsProps> = ({
  digit,
  enterDigit,
  xs = 3,
  buttonRef,
}) => {
  return (
    <Grid item xs={xs}>
      <Button fullWidth ref = {buttonRef} variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid>
  );
};
