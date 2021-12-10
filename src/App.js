import AddTrackingForm from "./components/AddTrackingForm";
import TrackingNumberList from "./components/TrackingNumberList";

import "./App.css";
import { Fragment, useState } from "react";

function App() {
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <Fragment>
      <h1>Hello I'm track app</h1>

      <AddTrackingForm updateList={setIsUpdated} />
      <TrackingNumberList updateVal={isUpdated} />
    </Fragment>
  );
}

export default App;
