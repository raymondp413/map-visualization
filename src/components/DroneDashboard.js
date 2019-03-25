import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";

class DroneDashboard extends Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const {
      loading,
      //data,
      lastDronePosition
    } = this.props;

    if (loading) return <LinearProgress />;

    const currentDate = new Date();
    const elapsedSeconds = Math.ceil((currentDate.getTime() - lastDronePosition.timestamp)/1000);
    const elapsedTimeStr = `${elapsedSeconds} second` + (elapsedSeconds > 1 ? 's' : '') + ' ago';

    return (
      <div>
        <span>Temperature: </span>{lastDronePosition.metric } <br />
        <span>Latitude: </span>{lastDronePosition.latitude } <br />
        <span>Longitude: </span>{lastDronePosition.longitude } <br />
        <span>Last Received: </span>{elapsedTimeStr}<br />
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    //data,
    lastDronePosition
  } = state.drone;

  return {
    loading,
    //data,
    lastDronePosition 
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE
    })
});

export default connect(
  mapState,
  mapDispatch
)(DroneDashboard);
