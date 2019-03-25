import React from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DroneDashboard from './DroneDashboard'
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

const ControlCenter = props => {
  const { 
    classes
  } = props;
  
  return (
    <Card className={classes.card}>
      <CardHeader title="Drone Data" />
      <CardContent>
        <DroneDashboard />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ControlCenter);
