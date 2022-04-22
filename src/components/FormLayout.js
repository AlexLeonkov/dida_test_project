import React, { useState } from "react";
import "antd/dist/antd.css";
import data from "../data.json";
import { Form, Input, Button, Checkbox, Radio } from "antd";
import AnswerEditor from "./AnswerEditor";

const API_ROUTES = Object.freeze({
  en: "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
  de: "https://api-inference.huggingface.co/models/deepset/gelectra-large-germanquad",
});

const FormLayout = () => {
  const { TextArea } = Input;

  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = React.useState("en");
  const [output, setOutput] = useState("");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setLanguage(e.target.value);
  };

  const detectLanguage = (field) => {
    if (language === "en") {
      let neededField = data.english[field];

      setDataExamples(neededField);
    }
    if (language === "de") {
      let neededField = data.german[field];
      setDataExamples(neededField);
    }
  };
  console.log(data.english.food);

  const handleData = async () => {
    const response = await fetch(API_ROUTES[language], {
      method: "POST",
      body: JSON.stringify({
        inputs: {
          question: question,
          context: text,
        },
      }),
    });
    const data = await response.json();
    setOutput(data);
  };

  const setDataExamples = (input) => {
    setText(input.text);
    setQuestion(input.question);
  };

  return (
    <Form>
      <div className="background-box">
        <Button
          onClick={() => {
            detectLanguage("food");
          }}
          type="primary"
        >
          Food
        </Button>
        <Button
          onClick={() => {
            detectLanguage("electronics");
          }}
          type="primary"
        >
          Electronics
        </Button>
        <Button
          onClick={() => {
            detectLanguage("techn. Manual");
          }}
          type="primary"
        >
          Tech. Manual
        </Button>

        <Button
          onClick={() => {
            setText("");
            setQuestion("");
          }}
          style={{ marginLeft: 10 }}
          type="dashed"
          danger
        >
          Clear
        </Button>
      </div>
      <Radio.Group onChange={onChange} value={language}>
        <Radio value={"en"}>English</Radio>
        <Radio value={"de"}>German</Radio>
      </Radio.Group>
      <Form.Item>
        <TextArea
          rows={8}
          style={{ width: 700 }}
          placeholder="Enter a text"
          value={text}
        />
      </Form.Item>
      <br />
      <Form.Item>
        <TextArea
          rows={4}
          style={{ width: 700 }}
          placeholder="Enter a question"
          value={question}
        />
      </Form.Item>
      ;
      <AnswerEditor answer={output} context={text} />
      <Form.Item>
        <Button type="primary" onClick={handleData} htmlType="submit">
          Get the answer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormLayout />;
