import { Card, CardContent } from "@mui/material/";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

function InfoBox({ type, total = 0 }) {
  let color = "#F3AA18";

  switch (type) {
    case "Delivered":
      color = "#2FA84F";
      break;
    case "Late":
      color = "#EA3D2F";
      break;
    case "On Schedule":
      color = "#367BF5";
      break;
    case "Unknown":
      color = "#5E6366";
      break;
    default:
      color = "#F3AA18";
  }

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
