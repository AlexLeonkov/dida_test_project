import "./App.css";
import { Typography } from "antd";
import { Button, Checkbox, Input, Form } from "antd";
import { useState } from "react";
import FormLayout from "./components/FormLayout";

function App() {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [english, setEnglish] = useState("checked");
  const [german, setGerman] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <Title>dida Question Answering</Title>
        <Text>
          AI-based Question Answering can be used in various use cases and
          industries. Below is a demo that is just a small sample of what
          Question Answering tailored to your use case can do.
        </Text>

        {/* <Form>
          <Form.item>
            <TextArea
              rows={12}
              style={{ width: 500 }}
              placeholder="Enter a text"
            />
          </Form.item>
          <br />
          <Form.Item>
            <TextArea
              rows={12}
              style={{ width: 500 }}
              placeholder="Enter a question"
            />
          </Form.Item>

          <Form.item>
            <Button type="primary" htmlType="submit">
              Get the answer
            </Button>
          </Form.item>
        </Form> */}

        <FormLayout />
      </div>
    </div>
  );
}

export default App;
