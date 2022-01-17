import { Card, CardContent } from "@mui/material/";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

function InfoBox({ type, total = 0 }) {
  const color =
    type === "Delivered"
      ? "#2FA84F"
      : type === "Late"
      ? "#EA3D2F"
      : type === "On Schedule"
      ? "#367BF5"
      : type === "Unknown"
      ? "#5E6366"
      : "#F3AA18";

  return (
    <Card className="infoBox" style={{ border: "none", boxShadow: "none" }}>
      <CardContent m={550}>
        <Typography variant="h5" style={{ fontWeight: 600 }}>
          {type}
        </Typography>
        <br />
        <Typography variant="h3" style={{ fontWeight: 600, color }}>
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
