import "./App.css";
import { Typography } from "antd";

import FormLayout from "./components/FormLayout";

const { Title, Text } = Typography;

function App() {
  return (
    <div className="App">
      <div className="container">
        <Title>dida Question Answering</Title>
        <Text>
          AI-based Question Answering can be used in various use cases and
          industries. Below is a demo that is just a small sample of what
          Question Answering tailored to your use case can do.
        </Text>
        <FormLayout />
      </div>
    </div>
  );
}

export default App;
