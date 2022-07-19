import { useParams } from "react-router-dom";
import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import { useCallback, useEffect, useState } from "react";
import "ace-builds/src-noconflict/theme-monokai";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectIsUserConnected, setIsUserConnected } from "../redux/features/authentication/authenticationSlice";
import { useAddFileMutation } from "../redux/api/sabycodeApi";
import "./error.css"


export default function EditPage(props) {
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [fontSize, setFontSize] = useState(14);
  const { id } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const [addFile, {isSuccess: isFileAdded}] = useAddFileMutation();
  const isUserConnected = useSelector(selectIsUserConnected);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const addFileAsync = async () => { 
      if (accessToken && !isUserConnected && text) {
        await addFile({id: `${id}.txt`, user: accessToken}).unwrap();
  }}
  addFileAsync();   
  }, [accessToken, isUserConnected, text]);

  useEffect(() => {
    dispatch(setIsUserConnected(false));

},[]);

  useEffect(() => {if (isFileAdded){
    dispatch(setIsUserConnected(true));
  }}, [isFileAdded]);

  const memoizedCallback = useCallback(() => {
    const socket = new WebSocket("ws://localhost:5000/");
    socket.onopen = (event) => {
      socket.send(
        JSON.stringify({
          sessionId: id,
          event: "connection",
          username: localStorage.userName,
        })
      );
    };
    socket.onmessage = (event) => {
      const messageJSON = JSON.parse(event.data);
      console.log(messageJSON);
      switch(messageJSON.event) {
        case "editorUpdate":
          setText(messageJSON.input);
          break;
        case "connection":
          setText(messageJSON.input);
          if (!messageJSON.abilityToEdit) {
            socket.close()
          };
          break;
        case "close":
          socket.close();
          break;
      }  
    };
    setSocket(socket);
  }, [id]);

/*   function handleClose(){

    console.log('closedCon');
          socket.close();
  } */

  useEffect(() => {
        memoizedCallback();
  }, [memoizedCallback, id]);

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
  }
  function closeConnection(){
    socket.send(JSON.stringify({sessionId: id, event: 'close'}));
  }

  return (
    <>
    <button onClick={closeConnection}>CLOSE</button>
   {/*  <button onClick={async() => { const res = await addFile({id: id}).unwrap();console.log(res)}}>ddd</button> */}
        <div className="buttons">
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
        </div>
          <AceEditor
            value={text}
            mode={language}
            theme="monokai"
            height="100%"
            width="100%"
            onChange={onChange}
            fontSize={fontSize}
            markers={[{ startRow: 0, startCol: 2, endRow: 1, endCol: 20, className: 'error-marker', type: 'screenLine' }]}
            name="UNIQUE_ID_OF_DIV"            
            editorProps={{ $blockScrolling: true }}
          />
        </>
  );
}
