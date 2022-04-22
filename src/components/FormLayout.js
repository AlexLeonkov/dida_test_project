import React, { useState } from "react";

import data from "../data.json";
import { Form, Input, Button, Radio } from "antd";
import AnswerEditor from "./AnswerEditor";

const API_ENDPOINTS = Object.freeze({
  en: "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
  de: "https://api-inference.huggingface.co/models/deepset/gelectra-large-germanquad",
});

const TOPICS = ["Food", "Electronics", "Techn. Manual"];

const { TextArea } = Input;

const FormLayout = () => {
  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setLanguage(e.target.value);
    setText("");
    setQuestion("");
  };

  const updateInputs = (field) => {
    setText(data[language][field].text);
    setQuestion(data[language][field].question);
  };

  const handleData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS[language], {
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Form>
      <Form.Item className="examples">
        {TOPICS.map((topic) => (
          <Button
            style={{ marginRight: 10 }}
            key={topic}
            onClick={() => {
              updateInputs(topic.toLowerCase());
            }}
            type="primary"
          >
            {topic}
          </Button>
        ))}

        <Button
          onClick={() => {
            setText("");
            setQuestion("");
            setOutput(null);
          }}
          style={{ marginLeft: 10 }}
          type="dashed"
          danger
        >
          Clear
        </Button>
      </Form.Item>

      <Form.Item>
        <Radio.Group onChange={onChange} value={language}>
          <Radio value={"en"}>English</Radio>
          <Radio value={"de"}>German</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <TextArea
          onChange={(e) => setText(e.target.value)}
          rows={8}
          style={{ width: "100%" }}
          placeholder="Enter a text"
          value={text}
        />
      </Form.Item>
      <br />
      <Form.Item>
        <TextArea
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          style={{ width: 700 }}
          placeholder="Enter a question"
          value={question}
        />
      </Form.Item>

      {output && <AnswerEditor answer={output} context={text} />}

      <Form.Item>
        <Button
          type="primary"
          onClick={handleData}
          loading={isLoading}
          htmlType="submit"
        >
          {isLoading ? "Loading..." : "Get the answer"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLayout;
