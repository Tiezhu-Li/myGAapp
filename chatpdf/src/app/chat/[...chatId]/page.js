import ChatComponent from "/src/components/ChatComponent";
import ChatSideBar from "/src/components/ChatSideBar";
import PDFViewer from "/src/components/PDFViewer";
import { db } from "/src/lib/db";
import { chats } from "/src/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const ChatPage = async ({ params: { chatId } }) => {
  const { userId } = await auth();
  console.log(userId);
  console.log(chatId);

  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }
  // console.log(_chats);
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  console.log(currentChat);
  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
        </div>

        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>

        <div className="flex-[3] border-l-4 border-l-slate-200 max-h-screen">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
