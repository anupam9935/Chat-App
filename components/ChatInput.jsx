import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";


function ChatInput({handleSendMsg}) {

  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPIckerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji; // Use emojiObject directly
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };


  return (
   <Container>
         <div className="button-container">
                <div className="emoji">
                  <BsEmojiSmileFill
                 onClick={handleEmojiPIckerHideShow} />
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                
                </div>
          </div>

          <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                type="text"
                placeholder="type your message here"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
              <button type="submit">
                <IoMdSend />
                </button>
         </form>
   </Container>
  )
}


const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
   padding-bottom:0.3rem;
   @media screen and (min-width:720px) and (max-width:1080px) { 
    padding: 0 1rem;
    gap : 1rem;
   }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
       }
      .EmojiPickerReact {
        position: absolute;
        bottom: 60px;
      }
      }
    }
    .input-container{
      width:100%;
      border-radius:2rem;
      display:flex;
      align-items: center;
      gap: 2rem;
      background-color: #ffffff34;
      input{
        width:90%;
        background-color:transparent;
        color:white;
        border:none;
        padding-left: 1rem;
        font-size:1.2rem;
        &::selection{
            background-color:#9a86f3;
        }
        &:focus{
          outline:none;
        }

      }
      button{
        padding:0.3rem 2rem;
        border-radius: 2rem;
        display:flex;
        justify-content: center;
        align-items:center;
        background-color: #9a86f3;
        border:none;
        @media screen and (min-width:720px) and (max-width:1080px) { 
            padding: 0.3rem  1rem;
            svg{
              font-size:1rem;
            }
        }
        svg{
          font-size: 2rem;
          color:white;

        }

      }
    }
`;

export default ChatInput;