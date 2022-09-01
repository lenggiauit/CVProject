import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
import * as signalR from "@microsoft/signalr";
import { AppSetting } from "../../types/type";
import { Conversation } from "../../services/models/conversation";
import { useAppContext } from "../../contexts/appContext";
import { User } from "../../services/models/user";
import { Translation } from "../translation";
import { ConversationMessage } from "../../services/models/conversationMessage";
import ConversationMessageItem from "./conversationMessage";
import { v4 } from "uuid";
import { useDeleteConversationMutation, useGetMessagesByConversationMutation, useInviteToConversationMutation, useRemoveFromConversationMutation, useSearchMessengerByKeywordMutation } from "../../services/chat";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import ConfirmModal from "../modal";
import showConfirmModal from "../modal";
import { dictionaryList } from "../../locales";
import { Messenger } from "../../services/models/messenger";
import showInviteMemberModal from "./inviteMember";
import InviteMember from "./inviteMember";
import RemoveMember from "./removeMember";
import { render } from "@testing-library/react";

const appSetting: AppSetting = require('../../appSetting.json');

interface Props {
    hubConnection: signalR.HubConnection,
    currentConversation?: Conversation | null,
    currentUser: Messenger,
    onDeleteEvent: (conv: Conversation) => void,
    onInviteMemberEvent: (conv: Conversation) => void,
    onRemoveMemberEvent: (conv: Conversation) => void,
}

const ConversationDetail: React.FC<Props> = ({ hubConnection, currentConversation, currentUser, onDeleteEvent, onInviteMemberEvent, onRemoveMemberEvent }) => {

    const { locale } = useAppContext();
    const scrollbarsRef = useRef<Scrollbars>(null);
    const [listTypingUsers, setListTypingUsers] = useState<string>();
    const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [listReceivedMessage, setListReceivedMessage] = useState<ConversationMessage[]>([]);
    const [getMessagesByConversation, getMessagesByConversationStatus] = useGetMessagesByConversationMutation();
    const [deleteConversation, deleteConversationStatus] = useDeleteConversationMutation();
    const [inviteToConversation, inviteToConversationStatus] = useInviteToConversationMutation();
    const [removeFromConversation, removeFromConversationStatus] = useRemoveFromConversationMutation();

    let currentTypingMessage = '';
    const handleOnTyping: React.KeyboardEventHandler<HTMLInputElement> = (e) => {

        if (e.key === 'Enter') {
            let message = e.currentTarget.value;
            if (message != '') {
                let convMessage: ConversationMessage = { id: v4(), conversationId: currentConversation?.id, userId: currentUser.id, message: message };
                if (hubConnection.state === 'Connected') {
                    hubConnection.send("sendMessage", JSON.stringify(convMessage));
                }
                e.currentTarget.value = currentTypingMessage = '';
            }
        }
        else {
            if (e.currentTarget.value.length > currentTypingMessage.length + 10) {
                currentTypingMessage = e.currentTarget.value;
                if (hubConnection.state === 'Connected') {
                    hubConnection.send("OnTyping", currentConversation?.id, currentUser.id);
                }
            }
            if (e.currentTarget.value.length < currentTypingMessage.length) {
                currentTypingMessage = e.currentTarget.value;
            }
        }
    }
    // invite
    const onInviteMember: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        setShowInviteModal(current => !current);
    }
    const onCloseInviteMember: any = () => {
        setShowInviteModal(current => !current);
    }

    const onSelectedInviteMember: any = (ms: Messenger[]) => {
        setShowInviteModal(current => !current);
        //inviteToConversation({ payload: { conversationId: currentConversation?.id, users: ms.map(m => m.id) } });
        if (hubConnection.state === 'Connected') {
            hubConnection.send("inviteToConversation", currentConversation?.id, ms.map(m => m.id));
        }

        if (currentConversation) {
            let inviteConv: Conversation = {
                id: currentConversation.id,
                title: currentConversation.title,
                createdBy: currentConversation.createdBy,
                conversationers: currentConversation.conversationers.concat(ms),
                createdDate: currentConversation.createdBy,
                lastMessage: currentConversation.lastMessage,
                lastMessageDate: new Date(),
                updatedBy: currentConversation.updatedBy
            };
            onInviteMemberEvent(inviteConv);
        }
    }
    // remove
    const onRemoveMember: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        setShowRemoveModal(true);
    }
    const onCloseRemoveMember: any = () => {
        setShowRemoveModal(false);

    }

    const onSelectedRemoveMember: any = (ms: Messenger[]) => {
        setShowRemoveModal(false);
        //removeFromConversation({ payload: { conversationId: currentConversation?.id, users: ms.map(m => m.id) } });
        if (hubConnection.state === 'Connected') {
            hubConnection.send("removeFromConversation", currentConversation?.id, ms.map(m => m.id));
        }
        if (currentConversation) {
            let removeConv: Conversation = {
                id: currentConversation.id,
                title: currentConversation.title,
                createdBy: currentConversation.createdBy,
                conversationers: currentConversation.conversationers.filter(u => !ms.includes(u)),
                createdDate: currentConversation.createdBy,
                lastMessage: currentConversation.lastMessage,
                lastMessageDate: new Date(),
                updatedBy: currentConversation.updatedBy
            };
            onRemoveMemberEvent(removeConv);
        }
    }
    //

    useEffect(() => {
        if (inviteToConversationStatus.isSuccess) {


        }
    }, [inviteToConversationStatus])
    useEffect(() => {
        if (removeFromConversationStatus.isSuccess) {

        }
    }, [removeFromConversationStatus])



    const onDeleteConversation: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        showConfirmModal({
            message: dictionaryList[locale]["deleteConversationmsg"],
            onConfirm: () => {
                deleteConversation({ payload: currentConversation?.id });
                onDeleteEvent(currentConversation!);
            }
        });
    }

    useEffect(() => {
        if (deleteConversationStatus.isSuccess) {
            onDeleteEvent(currentConversation!);
        }
    }, [deleteConversationStatus])

    let isOnHandleTyping = false;
    const handleTyping = () => {
        if (isOnHandleTyping) {
            setTimeout(function () {
                setListTypingUsers('');
                isOnHandleTyping = false;
            }, 2000);
        }
    }

    useEffect(() => {
        if (currentConversation) {
            getMessagesByConversation({ payload: { conversationId: currentConversation.id } });
        }
    }, [])

    useEffect(() => {
        if (scrollbarsRef.current != null) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [getMessagesByConversationStatus.data])

    useEffect(() => {
        if (scrollbarsRef.current != null) {
            scrollbarsRef.current.scrollToBottom();
        }
        if (hubConnection.state === 'Connected') {

            hubConnection.on("onUserTyping", (conversationId, userId) => {
                if (conversationId == currentConversation?.id && currentUser.id != userId) {
                    setListTypingUsers(userId);
                    isOnHandleTyping = true;
                    handleTyping();
                }
            });
        }
    }, [hubConnection])

    useEffect(() => {
        if (scrollbarsRef.current != null) {
            scrollbarsRef.current.scrollToBottom();
        }
    }, [listReceivedMessage])

    useEffect(() => {
        if (scrollbarsRef.current != null) {
            scrollbarsRef.current.scrollToBottom();
        }
        if (hubConnection.state === 'Connected') {
            hubConnection.on("onReceivedMessage", receivedMessage => {
                try {
                    const convMessage = JSON.parse(receivedMessage) as ConversationMessage;
                    if (convMessage) {
                        hubConnection.send("setUserSeenMessages", [currentUser.id], convMessage.id);
                        let listMessages = listReceivedMessage;
                        listMessages.push(convMessage);
                        setListReceivedMessage([...listMessages]);
                        if (scrollbarsRef.current != null) {
                            scrollbarsRef.current.scrollToBottom();
                        }
                    }
                }
                catch {
                    console.log("error");
                }
            });
        }
    }, [hubConnection])


    if (currentConversation) {
        let title: string = currentConversation.title;
        if (title == null || title.trim().length == 0) {
            title = currentConversation.conversationers.filter(c => c.id != currentUser.id).map(c => { return c.fullName ?? c.name }).join(', ');
            title = title.length > 50 ? title.substring(0, 50) + ", ..." : title;
        }
        return (<>
            {showInviteModal === true &&
                <InviteMember isShow={showInviteModal} conv={currentConversation} onClose={onCloseInviteMember} onSelected={onSelectedInviteMember} />
            }

            {showRemoveModal === true &&
                <RemoveMember conv={currentConversation} currentUser={currentUser} onClose={onCloseRemoveMember} onSelected={onSelectedRemoveMember} />

            }
            <div className="conversation-detail-container mt-2">
                <div className="message-header-container p-2">
                    <div className="row m-0" key={"message-header-container-" + v4().toString()}>
                        <div className="col-md-10 m-0 pl-0 ">
                            <div className="row m-0 p-0">
                                <div className="col-md-2 m-0 pl-0 ">
                                    <div className="conversation-avatars-container">
                                        {currentConversation.conversationers
                                            .filter(c => c.id != currentUser.id)
                                            .map((c, i) =>
                                                <img key={"avatar-detail-" + i + v4().toString()} src={c.avatar ?? "/assets/images/Avatar.png"} className="rounded-circle multiple conversation-avatars" />
                                            )}
                                    </div>
                                </div>
                                <div className="col-md-10 m-0 pl-0 ">
                                    <div>{title}</div>
                                    <div>{new Date(currentConversation?.lastMessageDate).toLocaleDateString(locale)}</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 text-left m-0 pr-0 pl-0 text-right">
                            <a className="btn btn-link p-0 m-1 d-inline align-baseline " href="#" onClick={onInviteMember} > <i className="bi bi-person-plus" style={{ fontSize: 18 }} ></i> </a>
                            <a className="btn btn-link p-0 m-1 d-inline align-baseline " href="#" onClick={onRemoveMember} > <i className="bi bi-person-x" style={{ fontSize: 18 }} ></i> </a>
                            <a className="btn btn-link p-0 m-1 d-inline align-baseline " href="#" onClick={onDeleteConversation}> <i className="bi bi-trash" style={{ fontSize: 18 }} ></i> </a>
                        </div>
                    </div>
                </div>
                <div className="conversation-detail-body-container p-2 ">
                    <div className="conversation-list-container overflow-auto">
                        {getMessagesByConversationStatus.isLoading && <>
                            <LocalSpinner />
                        </>}
                        {getMessagesByConversationStatus.isSuccess && <>
                            <Scrollbars ref={scrollbarsRef} >
                                {getMessagesByConversationStatus.data && getMessagesByConversationStatus.data.resource.map((item, index) =>
                                    <ConversationMessageItem key={"message-" + index + v4().toString()} hubConnection={hubConnection} message={item} currentUser={currentUser} user={currentConversation.conversationers.filter(c => c.id == item.userId)[0]} />
                                )}
                                {listReceivedMessage.map((item, index) =>
                                    <ConversationMessageItem key={"message-" + index + v4().toString()} hubConnection={hubConnection} message={item} currentUser={currentUser} user={currentConversation.conversationers.filter(c => c.id == item.userId)[0]} />
                                )}
                            </Scrollbars>
                        </>}
                    </div>
                    <div className="conversation-detail-typing-users">
                        {listTypingUsers && <> <div>
                            <div className="d-inline">
                                {currentConversation.conversationers
                                    .filter(c => listTypingUsers == c.id)
                                    .filter(c => c.id != currentUser.id)
                                    .map((c, i) =>

                                        <img key={"avatar-detail-" + i + v4().toString()} src={c.avatar ?? "/assets/images/Avatar.png"} className="rounded-circle typing-avatar" />

                                    )}
                            </div>
                            <div className="d-inline"><Translation tid="isTyping" /></div>
                        </div>
                        </>}
                    </div>
                </div>

                <div className="message-bottom-container p-2">
                    <div className="d-inline">
                        <input type="text" onKeyDown={handleOnTyping} className="form-control form-control-md rounded-pill" placeholder="Aa" />
                    </div>
                </div>
            </div>

        </>);
    }
    else {
        return (<> </>)
    }
}

export default ConversationDetail;