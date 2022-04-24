import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout';
import { getLoggedUser } from '../../utils/functions';
import { Translation } from '../../components/translation';
import Conversationer from '../../components/messages/conversationer';
//@ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';
import ConversationDetail from '../../components/messages/conversationDetail';
import { signalRHubConnection, StartSignalRHubConnection, StopSignalRHubConnection, useConversationalSearchKeywordMutation, useCreateConversationMutation, useGetConversationListByUserMutation } from '../../services/chat';
import { ResultCode } from '../../utils/enums';
import { Conversation } from '../../services/models/conversation';
import { v4 } from 'uuid';
import LocalSpinner from '../../components/localSpinner';
import * as signalR from "@microsoft/signalr";
import { AppSetting } from '../../types/type';
import { toast } from 'react-toastify';
import { dictionaryList } from '../../locales';
import { useAppContext } from '../../contexts/appContext';
import { InputFiles } from 'typescript';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
const appSetting: AppSetting = require('../../appSetting.json');

const Message: React.FC = (): ReactElement => {

    const { locale, } = useAppContext();
    const currentUser = getLoggedUser()!;
    const txtSearchRef = useRef<HTMLInputElement>(null);
    const [GetConversationListByUser, GetConversationListByUserStatus] = useGetConversationListByUserMutation();
    const [conversationalSearchKeyword, ConversationalSearchKeywordStatus] = useConversationalSearchKeywordMutation();
    const [CreateConversation, CreateConversationStatus] = useCreateConversationMutation();
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>();
    const [isSearchingUser, setIsSearchingUser] = useState<boolean>(false);
    const [currentListConversations, setCurrentListConversations] = useState<Conversation[]>([]);
    const [currentSearchListConversations, setCurrentSearchListConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        if (GetConversationListByUserStatus.isSuccess && GetConversationListByUserStatus.data.resultCode == ResultCode.Success && GetConversationListByUserStatus.data.resource) {

            setCurrentListConversations(GetConversationListByUserStatus.data.resource);
        }
    }, [GetConversationListByUserStatus])

    useEffect(() => {
        if (ConversationalSearchKeywordStatus.isSuccess && ConversationalSearchKeywordStatus.data.resultCode == ResultCode.Success && ConversationalSearchKeywordStatus.data.resource) {

            setCurrentSearchListConversations(ConversationalSearchKeywordStatus.data.resource);
        }
    }, [ConversationalSearchKeywordStatus])


    const selectedConversationHandler = (conv: Conversation) => {
        setSelectedConversation(conv);
        // if (signalRHubConnection.state === 'Connected' && conv) {
        //     signalRHubConnection.send("startConversation", conv?.id, JSON.stringify(conv));
        // }
    };

    const createConversationHandler = (conv: Conversation) => {
        CreateConversation({ payload: { id: conv.id, users: Array.from(conv.conversationers.map(c => { return c.id })) } });

    };

    const onDeleteConversationHandler = (conv: Conversation) => {
        let listConv = currentListConversations.filter(c => c.id != conv.id);
        setCurrentListConversations([...listConv]);
        setSelectedConversation(null);
    };

    const onInviteMemberToConversationHandler = (conv: Conversation) => {
        let listConv = currentListConversations.filter(c => c.id != conv.id);
        listConv.splice(0, 0, conv);
        setCurrentListConversations([...listConv]);
        setSelectedConversation(conv);
    };

    const onRemoveMemberToConversationHandler = (conv: Conversation) => {
        let listConv = currentListConversations.filter(c => c.id != conv.id);
        listConv.splice(0, 0, conv);
        setCurrentListConversations([...listConv]);
        setSelectedConversation(conv);
    };

    //
    useEffect(() => {
        if (CreateConversationStatus.isSuccess && CreateConversationStatus.data.resultCode == ResultCode.Success && CreateConversationStatus.data.resource) {
            var listConv = currentListConversations;
            var conv = CreateConversationStatus.data.resource;
            setIsSearchingUser(false);
            setCurrentListConversations([...listConv, conv]);
            setSelectedConversation(conv);
            if (signalRHubConnection.state === 'Connected') {
                signalRHubConnection.send("startConversation", conv.id, JSON.stringify(conv));
            }
        }
    }, [CreateConversationStatus])

    // setCurrentListConversations when GetConversationListByUser compeleted 
    useEffect(() => {
        if (GetConversationListByUserStatus.isSuccess && GetConversationListByUserStatus.data && GetConversationListByUserStatus.data.resultCode == ResultCode.Success) {
            setCurrentListConversations(GetConversationListByUserStatus.data.resource);
        }
    }, [GetConversationListByUserStatus])
    // Start onload
    useEffect(() => {
        StartSignalRHubConnection();
        GetConversationListByUser({ payload: { userId: currentUser?.id } });

        return () => {
            StopSignalRHubConnection();
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (signalRHubConnection.state === 'Connected' && currentListConversations.length > 0) {
                signalRHubConnection.send("initConversations", currentListConversations.map((conv) => conv.id));
                //console.log("init Conversations: " + currentListConversations.map((conv) => conv.id));
            }
        }, 1000);
    }, [currentListConversations])

    useEffect(() => {

        //if (signalRHubConnection.state === 'Connected') { 
        signalRHubConnection.on("onStartConversation", (conversation) => {
            console.log("onStartConversation");
            try {
                GetConversationListByUser({ payload: { userId: currentUser?.id } });
                // const convStart = JSON.parse(conversation) as Conversation;
                // console.log(convStart);
                // let listConv = currentListConversations;

                // if (convStart != null && listConv.filter(c => c.id === convStart.id).length == 0) {
                //     //let listConv = currentListConversations;
                //     //listConv.push(conv);
                //     //listConv.splice(0, 0, conv);
                //     setCurrentListConversations(prev => [...prev, convStart]);
                //     //setSelectedConversation(conv);
                // }
            }
            catch {
                console.log("error onStartConversation");
            }
        });

        signalRHubConnection.on("onInviteToConversation", (conversation) => {
            GetConversationListByUser({ payload: { userId: currentUser?.id } });
        });
        signalRHubConnection.on("onRemoveFromConversation", (conversation) => {
            GetConversationListByUser({ payload: { userId: currentUser?.id } });
        });
        //}

    }, [signalRHubConnection])

    useEffect(() => {


    }, []);

    // handle user focus on chat message
    let windowIsOnFocus = true;
    const onWindowFocus = () => {
        StartSignalRHubConnection();
        windowIsOnFocus = true;
    };

    const onWindowBlur = () => {

        setTimeout(() => {
            if (!windowIsOnFocus) {
                StopSignalRHubConnection();
                windowIsOnFocus = false;
            }
        }, 15000);

    };
    // 
    const WindowFocusHandler = () => {
        useEffect(() => {
            window.addEventListener('focus', onWindowFocus);
            window.addEventListener('blur', onWindowBlur);
            return () => {
                window.removeEventListener('focus', onWindowFocus);
                window.removeEventListener('blur', onWindowBlur);
            };
        });
    };
    WindowFocusHandler();

    // handle searching user 
    const handleSeachingUser: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        let searchkeys = e.currentTarget.value;
        if (searchkeys.length >= 2 && e.key !== 'Backspace') {
            setIsSearchingUser(true);
            conversationalSearchKeyword({ payload: { keyword: searchkeys } });
        }
        if (searchkeys.length == 0) {
            setIsSearchingUser(false);
        }
    }
    // render
    return (
        <>
            <Layout>
                <div className="container height-100vh-60px">
                    <div className="row h-100">
                        <div className="col-sm-3 border-right p-0 pt-2">
                            <h2><Translation tid="Chats" /></h2>
                            <div className="input-group input-group-search m-2 mb-5">
                                {isSearchingUser &&
                                    <div className="input-group-prepend">
                                        <span><a href="#" onClick={() => { if (txtSearchRef.current) { txtSearchRef.current.value = ''; } setIsSearchingUser(false) }}> <i className="bi bi-arrow-left" style={{ fontSize: 20, marginRight: 5 }} ></i> </a></span>
                                    </div>
                                }
                                <input type="text" ref={txtSearchRef} className="form-control border-1 form-control-sm rounded-pill" onKeyDown={handleSeachingUser} placeholder="Search messenger" />

                            </div>
                            {((GetConversationListByUserStatus.isLoading) || (ConversationalSearchKeywordStatus.isLoading)) &&
                                <>
                                    <LocalSpinner />
                                </>
                            }
                            <div className="conversationer-container overflow-auto">
                                {!isSearchingUser && <>
                                    <Scrollbars key={"message-scrollbars-" + v4().toString()} >
                                        {currentListConversations
                                            .map((item, index) => (
                                                <Conversationer key={"conversationer-" + index + v4().toString() + item.id} hubConnection={signalRHubConnection} data={item} selectedConversationEvent={selectedConversationHandler} currentUser={currentUser} selectedConversation={selectedConversation} />
                                            ))}
                                    </Scrollbars>
                                </>}
                                {isSearchingUser && <>
                                    <Scrollbars key={"message-search-scrollbars-" + v4().toString()} >
                                        {
                                            currentSearchListConversations.map((item, index) => (
                                                <Conversationer key={"conversationer-" + index + v4().toString() + item.id} data={item} hubConnection={signalRHubConnection} selectedConversationEvent={createConversationHandler} currentUser={currentUser} selectedConversation={selectedConversation} />
                                            ))
                                        }
                                    </Scrollbars>
                                </>}
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <ConversationDetail key={v4()} hubConnection={signalRHubConnection} currentConversation={selectedConversation} currentUser={currentUser} onDeleteEvent={onDeleteConversationHandler} onInviteMemberEvent={onInviteMemberToConversationHandler} onRemoveMemberEvent={onRemoveMemberToConversationHandler} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Message;


