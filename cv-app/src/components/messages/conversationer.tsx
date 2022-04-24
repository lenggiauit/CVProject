import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAppContext } from "../../contexts/appContext";
import { dictionaryList } from "../../locales";
import { StartSignalRHubConnection } from "../../services/chat";
import { Conversation } from "../../services/models/conversation";
import { ConversationMessage } from "../../services/models/conversationMessage";
import { Messenger } from "../../services/models/messenger";
import { User } from "../../services/models/user";

type Props = {
    data?: Conversation,
    selectedConversationEvent(arg?: Conversation): void,
    selectedConversation?: Conversation | null,
    currentUser: Messenger,
    hubConnection: signalR.HubConnection,
}

const Conversationer: React.FC<Props> = ({ hubConnection, data, selectedConversationEvent, currentUser, selectedConversation }) => {
    const { locale } = useAppContext();

    const [lastcurrentMessage, setlastcurrentMessage] = useState<string>(data?.lastMessage);

    const [isReceivedMessageButNotActive, setIsReceivedMessageButNotActive] = useState<boolean>(false);

    useEffect(() => {

        if (hubConnection.state == 'Connected') {
            hubConnection.on("onConversationReceivedMessage", receivedMessage => {
                try {
                    const convMessage = JSON.parse(receivedMessage) as ConversationMessage;
                    if (convMessage) {
                        if (convMessage.conversationId == data?.id) {
                            setlastcurrentMessage(convMessage.message);
                        }
                        if (convMessage.conversationId == data?.id && data?.id != selectedConversation?.id) {
                            setIsReceivedMessageButNotActive(true);
                        }
                    }
                }
                catch {
                    console.log("error");
                }
            });

            hubConnection.on("onConversationTyping", (conversationId, userId) => {

                if (conversationId === data?.id && userId != currentUser.id) {
                    setlastcurrentMessage('Typing...');
                }
            });

        }
    }, [hubConnection])
    if (data) {
        let title: string = data.title;
        if (title == null) {
            title = data.conversationers?.filter(c => c.id != currentUser.id).map(c => { return c.fullName ?? c.name }).join(', ');
            title = title?.length > 20 ? title?.substring(0, 20) + ", ..." : title;
        }
        return (<>
            <div className={"conversationer-item-container " + (data.id == selectedConversation?.id ? "active-conversation" : "") + (isReceivedMessageButNotActive ? "receiving-message" : "")} onClick={() => { selectedConversationEvent(data) }}>
                <div className="conversationer-item-body-container p-2">
                    <div className="row m-0">
                        <div className="col-md-4 m-0 pl-0 conversation-avatars-container">
                            {data.conversationers?.filter(c => c.id != currentUser.id)
                                .map((c, i) =>
                                    <img key={"avatar-" + i + v4().toString()} src={c.avatar ?? "/assets/images/Avatar.png"} className="rounded-circle multiple conversation-avatars" />
                                )}
                        </div>
                        <div className="col-md-8 text-left m-0 pr-0 pl-0 align-self-center">
                            <div>{title}</div>
                            <div>{lastcurrentMessage != null && lastcurrentMessage.length > 20 ? lastcurrentMessage.substring(0, 20) : lastcurrentMessage}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    else {
        return (<> </>);
    }

}

export default Conversationer;