import AddTrackingForm from "./components/AddTrackingForm";
import TrackingNumberList from "./components/TrackingNumberList";

import "./App.css";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <h1>Hello I'm track app</h1>

      <AddTrackingForm />
      <TrackingNumberList />
    </Fragment>
  );
}

export default App;
