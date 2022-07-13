import { useNavigate, useParams } from "react-router-dom";
import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import { useCallback, useEffect, useState } from "react";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditPage(props) {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const { id } = useParams();
  const navigate = useNavigate();

  const memoizedCallback = useCallback(() => {
    const socket = new WebSocket("ws://localhost:5000/");
    socket.onopen = (event) => {
      socket.send(
        JSON.stringify({
          sessionId: id,
          messageType: "connection",
          userName: localStorage.userName,
        })
      );
    };
    socket.onmessage = (event) => {
      setText(JSON.parse(event.data).text);
    };
    setSocket(socket);
  }, [id]);

  useEffect(() => {
    if (!localStorage.userName) {
      localStorage.sessionId = id;
      navigate("/authentication");
    } else {
      memoizedCallback();
    }
  }, [navigate, memoizedCallback, id]);

  function onChange(newValue) {
    socket.send(
      JSON.stringify({
        text: newValue,
        sessionId: id,
        messageType: "editorUpdate",
      })
    );
    setText(newValue);
  }

  function changeFontSize(event) {
    setFontSize(parseInt(event.target.value));
  }

  function changeLanguage(event) {
    setLanguage(event.target.value);
  }

  return (
    <>
      {localStorage.userName && (
        <>
          <select
            className="select-fontSize"
            id="fontSize"
            onChange={(event) => changeFontSize(event)}
          >
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
          </select>
          <select
            className="select-language"
            id="language"
            onChange={(event) => changeLanguage(event)}
          >
            <option value="javascript">javascipt</option>
            <option value="python">python</option>
          </select>
          <AceEditor
            value={text}
            mode={language}
            theme="monokai"
            height="100%"
            width="100%"
            onChange={onChange}
            fontSize={fontSize}
            markers={[
              {
                startRow: 0,
                startCol: 1,
                endRow: 1,
                endCol: 20,
                className: "warning",
                type: "background",
              },
            ]}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: false }}
          />
        </>
      )}
    </>
  );
}
