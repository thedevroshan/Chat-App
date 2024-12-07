import React from "react";

const ChatBox = ({SendMessage}) => {
  return (
    <div className="w-[60vw] xl:w-[52vw] h-[100vh] flex flex-col px-4 rounded-tl-3xl rounded-bl-3xl bg-foreground ml-2 gap-3 py-4">
      <section id="chat-section" className="w-full h-full"></section>

      <section id="message-input-section" className="w-full h-12 shadow-md">
        <div className="bg-foreground w-full h-full flex rounded-xl border border-border items-center justify-between gap-3">
          <input type="text" className="h-full w-full rounded-xl bg-background placeholder:text-secondary-text px-3 text-lg text-white outline-none border-r border-border" placeholder="Message..."/>
          <img src="/send-icon.png" alt="Send" className="w-9 h-9 aspect-square hover:bg-primary-nav-hover px-2 py-2 rounded-md cursor-pointer" onClick={SendMessage}/>
        <img src="/attachment-icon.png" alt="Attachment" className="w-9 h-9 aspect-square px-2 py-2 rounded-md mr-1 cursor-pointer hover:bg-primary-nav-hover"/>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
