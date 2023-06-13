import { Grid, Button } from "@mui/material";

interface GridButtonsProps {
  digit: string;
  enterDigit: (digit: string) => void;
  xs?: number;
}

export const GridButtons: React.FC<GridButtonsProps> = ({
  digit,
  enterDigit,
  xs = 3,
}) => {
  return (
    <Grid item xs={xs}>
      <Button fullWidth variant="outlined" onClick={() => enterDigit(digit)}>
        {digit}
      </Button>
    </Grid>
  );
};
