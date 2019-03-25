import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import DroneMap from './DroneMap';

class DroneDashboard extends Component {

  componentDidMount() {
    this.props.onLoad();

    this.timer = setInterval(() => this.props.onLoad(), 3000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const {
      loading,
      //data,
      lastDronePosition
    } = this.props;

    // Only show the loading indicator if this is the
    // first time data has been acquired.
    if (loading && lastDronePosition.timestamp === null) return <LinearProgress />;

    const currentDate = new Date();
    const elapsedSeconds = Math.ceil((currentDate.getTime() - lastDronePosition.timestamp)/1000);
    const elapsedTimeStr = `${elapsedSeconds} second` + (elapsedSeconds > 1 ? 's' : '') + ' ago';

    return (
      <div>
        <DroneMap
          markerLatitude={lastDronePosition.latitude}
          markerLongitude={lastDronePosition.longitude}
        />
        <div style={{marginTop: `20px`}}>
          <span>Temperature: </span>{lastDronePosition.metric } <br />
          <span>Latitude: </span>{lastDronePosition.latitude } <br />
          <span>Longitude: </span>{lastDronePosition.longitude } <br />
          <span>Last Received: </span>{elapsedTimeStr}<br />
        </div>
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
