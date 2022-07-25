import { useParams } from "react-router-dom";
import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import { useCallback, useEffect, useState } from "react";
import "ace-builds/src-noconflict/theme-textmate";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectClosedMeeting,
  selectColor,
  selectIsUserConnected,
  selectUserName,
  setColor,
  setCurrentUsers,
  setIsUserConnected,
} from "../redux/features/authentication/authenticationSlice";
import { useAddFileMutation } from "../redux/api/sabycodeApi";
import "../markers.css";

export default function EditPage(props) {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState();
  const [fontSize, setFontSize] = useState(14);
  const { id } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const [addFile, { isSuccess: isFileAdded }] = useAddFileMutation();
  const isUserConnected = useSelector(selectIsUserConnected);
  const dispatch = useDispatch();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [markers, setMarkers] = useState({});
  const isClosedMeeting = useSelector(selectClosedMeeting);
  const color = useSelector(selectColor);


  useEffect(() => {
    return () => setMarkers([]);
  }, []);

  useEffect(() => {
    const addFileAsync = async () => {
      if (accessToken && !isUserConnected) {
        await addFile({
          id: `${id}.txt`,
          user: accessToken,
        }).unwrap();
      }
    };

    addFileAsync();
  }, [accessToken]);

  useEffect(() => {
    dispatch(setIsUserConnected(false)); //?Todo заменить на флаг при connection с веб-сокетом (флаг - есть ли уже такой файл)
  }, []);

  useEffect(() => {
    if (isFileAdded) {
      dispatch(setIsUserConnected(true));
    }
  }, [isFileAdded]);

  useEffect(() => {
    if (isClosedMeeting) {
      socket.send(JSON.stringify({ sessionId: id, event: "close" }));
    }
  }, [isClosedMeeting]);

  const memoizedCallback = useCallback(() => {
    const socket = new WebSocket("ws://localhost:5000/");
    socket.onopen = (event) => {
      socket.send(
        JSON.stringify({
          sessionId: id,
          event: "connection",
          username: localStorage.userName,
          color: ['pink','green', 'yellow','purple'],
        })
      );
    };
    socket.onmessage = (event) => {
      const messageJSON = JSON.parse(event.data);
      switch (messageJSON.event) {
        case "editorUpdate":
          setText(messageJSON.input);
          break;
        case "connection":
          connectionHandler(messageJSON);
          break;
        case "close":
          socket.close();
          setIsReadOnly(true);
          break;
        case "markersUpdate":
          markersUpdateHandler(messageJSON);
          break;
        case "languageUpdate":
          languageUpdateHandler(messageJSON);
          break;
        case "disconnection":
          disconnectionHandler(messageJSON);
          break;
        case "colorUpdate":
          colorUpdateHandler(messageJSON);
          break;
        default:
          break;
      }
    };
    setSocket(socket);
  }, [id]);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback, id]);

  function colorUpdateHandler(message) {
    dispatch(setColor(message.color));
  }

  function connectionHandler(messageJSON) {
    setText(messageJSON.input);
    setLanguage(messageJSON.language);
    if (!messageJSON.abilityToEdit) {
      setIsReadOnly(true);
      socket.close();
    }
    console.log(messageJSON.users);
    /* dispatch(setCurrentUsers(messageJSON.users)); */
  }


  function markersUpdateHandler(message) {
    console.log(message.color);
    setMarkers((markers) => {
      const modified = Object.assign({}, markers);
      modified[message.color] = message.markers;
      return modified;
    });
  }

  function languageUpdateHandler(message) {
    setLanguage(message.language);
  }

  function disconnectionHandler(message) {
    dispatch(setCurrentUsers(message.users));
  }

  function onChange(newValue) {
    socket.send(
      JSON.stringify({
        input: newValue,
        sessionId: id,
        event: "editorUpdate",
      })
    );
    setText(newValue);
  }

  function changeFontSize(event) {
    setFontSize(parseInt(event.target.value));
  }

  function changeLanguage(event) {
    setLanguage(event.target.value);
    socket.send(
      JSON.stringify({
        sessionId: id,
        event: "languageUpdate",
        language: event.target.value,
      })
    );
  }

  function onCursorChange(selection) {
    let cursorMarker = {
      startRow: selection.cursor.row,
      startCol: selection.cursor.column,
      endRow: selection.cursor.row,
      endCol: selection.cursor.column + 1,
      className: `user-cursor_${color}`,
      type: "text",
      inFront: true,
    };
    const message = {
      sessionId: id,
      event: "markersUpdate",
      markers: [cursorMarker],
      color: color,
    };

    if (selection.$cursorChanged) {
      const modified = Object.assign({}, markers);
      modified[color] = [cursorMarker];
      setMarkers(modified);

      socket.send(JSON.stringify(message));
    }
  }

  function onSelectionChange(selection) {
    let message;
    if (
      !(
        selection.anchor.column === selection.cursor.column &&
        selection.anchor.row === selection.cursor.row
      )
    ) {
      let [start, end] =
        selection.anchor.column < selection.cursor.column
          ? [selection.anchor, selection.cursor]
          : [selection.cursor, selection.anchor];
      let cursorMarker = {
        startRow: selection.cursor.row,
        startCol: selection.cursor.column,
        endRow: selection.cursor.row,
        endCol: selection.cursor.column + 1,
        className: `user-cursor_${color}`,
        type: "text",
        inFront: true,
      };
      let selectionMarker = {
        startRow: start.row,
        startCol: start.column,
        endRow: end.row,
        endCol: end.column,
        className: `user-selection_${color}`,
        type: "text",
        inFront: false,
      };

      message = {
        sessionId: id,
        event: "markersUpdate",
        markers: [selectionMarker, cursorMarker],
        color: color,
      };

      if (selection.$cursorChanged) {
        const modified = Object.assign({}, markers);
        modified[color] = [cursorMarker, selectionMarker];
        setMarkers(modified);

        socket.send(JSON.stringify(message));
      }
    }
  }

  function getMarkers() {
    let allMarkersArray = [];
    if (Object.keys(markers).length === 0) return allMarkersArray;
    for (let color in markers) {
      allMarkersArray.push(...markers[color]);
    }
    return allMarkersArray;
  }

  return (
    <>
      <div className="buttons">
        <select
          className="select-fontSize"
          id="fontSize"
          onChange={(event) => changeFontSize(event)}
        >
          <option value="14">14</option>
          <option value="20">20</option>
          <option value="25">30</option>
        </select>
        <select
          value={language}
          defaultValue={language}
          className="select-language"
          id="language"
          onChange={(event) => changeLanguage(event)}
        >
          <option value="javascript">javascript</option>
          <option value="python">python</option>
        </select>
      </div>
      <AceEditor
        value={text}
        mode={language}
        theme="textmate"
        height="100%"
        width="100%"
        onChange={onChange}
        onCursorChange={onCursorChange}
        onSelectionChange={onSelectionChange}
        fontSize={fontSize}
        highlightActiveLine={false}
        readOnly={isReadOnly}
        markers={getMarkers()}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: false }}
      />
    </>
  );
}
