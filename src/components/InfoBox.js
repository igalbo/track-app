import { Card, CardContent } from "@mui/material/";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

function InfoBox(props) {
  const { type = "Delivered", total = 0 } = props;

  const typeClass = `title-${type}`.toLowerCase();

  return (
    <Card className="infoBox">
      <CardContent>
        <Typography variant="h5">{type}</Typography>
        <h1 className={typeClass}>{total}</h1>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
