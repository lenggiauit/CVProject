import React, { useEffect, useState } from "react";
import { useDeleteMessageMutation } from "../../services/chat";
import { ConversationMessage } from "../../services/models/conversationMessage";
import { Messenger } from "../../services/models/messenger";
import { User } from "../../services/models/user";
import LocalSpinner from "../localSpinner";
import { Translation } from "../translation";

type Props = {
    hubConnection: signalR.HubConnection,
    message: ConversationMessage,
    user: Messenger,
    currentUser: Messenger,
}

const ConversationMessageItem: React.FC<Props> = ({ hubConnection, message, user, currentUser }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const onDeleteMessage: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        if (hubConnection.state === 'Connected') {
            hubConnection.send("deleteMessage", message.conversationId, message.id);
            setIsLoading(true);
        }
    }
    useEffect(() => {

        if (hubConnection.state === 'Connected') {
            hubConnection.on("onDeleteMessage", (convId, messageId) => {
                try {
                    if (convId == message.conversationId && messageId == message.id) {
                        setTimeout(() => {
                            setIsDeleted(true);
                            setIsLoading(false);
                        }, 1000);
                    }
                }
                catch {
                    console.log("error");
                }
            });
        }
    }, [hubConnection])

    if (message && user) {
        return (<>

            <div className="row m-0 conversation-item-container">
                {user.id != currentUser.id && <>
                    <div className="col-md-1 ">
                        <img src={user.avatar ?? "/assets/images/Avatar.png"} className="rounded-circle conversation-avatars-item" />
                    </div>
                    <div className="col-md-11 text-left m-0 pr-0 pl-0 message-content">
                        {!isDeleted && message.message}
                        {isDeleted && <>
                            <p className="bg-secondary d-inline p-2" >
                                <Translation tid="MessageIsDeleted" />
                            </p>
                        </>
                        }
                    </div>
                </>}
                {user.id == currentUser.id && <>
                    <div className="col-md-12 text-right m-0 pr-0 pl-0 message-content">

                        {!isDeleted && <>
                            <div className="bg-primary rounded text-white d-inline p-1">
                                {message.message}
                            </div>
                        </>
                        }
                        {isDeleted && <>
                            <p className="bg-secondary d-inline p-2" >
                                <Translation tid="MessageIsDeleted" />
                            </p>
                        </>
                        }
                        <div className={"message-content-controls " + (isDeleted ? " deleted " : "")}>
                            {!isLoading &&
                                <a className="btn btn-link m-0 p-2" href="#" onClick={onDeleteMessage}><Translation tid="btnDelete" /></a>
                            }
                            {isLoading &&
                                <div className="m-2 align-self-center">
                                    <LocalSpinner />
                                </div>
                            }
                        </div>
                    </div>
                </>}
            </div>
        </>);
    }
    else {
        return (<></>);
    }

}

export default ConversationMessageItem;