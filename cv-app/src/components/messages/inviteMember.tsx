import React, { useRef, useState, useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { v4 } from "uuid";
import { useSearchMessengerByKeywordMutation } from "../../services/chat";
import { Conversation } from "../../services/models/conversation";
import { Messenger } from "../../services/models/messenger";
import { ResultCode } from "../../utils/enums";
import LocalSpinner from "../localSpinner";
import { Translation } from "../translation";
//@ts-ignore
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
    isShow: boolean,
    conv: Conversation,
    onClose: () => void,
    onSelected: (ms: Messenger[]) => void,
}

const InviteMember: React.FC<Props> = ({ isShow, conv, onClose, onSelected }) => {
    const txtSearchRef = useRef<HTMLInputElement>(null);
    const [messengerSearchByKeyword, messengerSearchByKeywordStatus] = useSearchMessengerByKeywordMutation();
    const [messengers, setMessengers] = useState<Messenger[]>([]);
    const [seletedMessengers, setSeletedMessengers] = useState<Messenger[]>([]);

    // handle searching user 
    const handleSeachingMessenger: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        let searchkeys = e.currentTarget.value;
        if (searchkeys.length >= 2 && e.key !== 'Backspace') {
            messengerSearchByKeyword({ payload: { keyword: searchkeys, currentIds: conv.conversationers.map(c => c.id) } });
        }
    }

    useEffect(() => {
        if (messengerSearchByKeywordStatus.isSuccess && messengerSearchByKeywordStatus.data.resultCode == ResultCode.Success) {
            setMessengers(messengerSearchByKeywordStatus.data.resource);
        }
    }, [messengerSearchByKeywordStatus])

    const onCloseHandler: any = () => {
        onClose();
    }
    const onSelectedMessenger: any = (messenger: Messenger) => {

        let listselectedMessengers = seletedMessengers;
        if (listselectedMessengers.filter(m => m.id == messenger.id).length > 0) {
            listselectedMessengers = listselectedMessengers.filter(m => m.id != messenger.id)
        }
        else {
            listselectedMessengers.push(messenger);
        }
        setSeletedMessengers([...listselectedMessengers]);
    }
    const onCancelHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClose();
    }
    const onConfirmHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onSelected(seletedMessengers);
    }
    if (isShow) {
        return (<>
            <div className="modal fade show" role="dialog" aria-labelledby="inviteModalLabel" aria-modal="true"  >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="inviteModalLabel"><Translation tid="InviteToConversation" /></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseHandler} >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body pb-0 pt-2">
                            <div className="input-group input-group-search mb-2">
                                <input type="text" ref={txtSearchRef} className="form-control border-1 form-control-sm rounded-pill" onKeyDown={handleSeachingMessenger} placeholder="Search messenger" />
                            </div>
                            <div>
                                {messengerSearchByKeywordStatus.isLoading && <>
                                    <LocalSpinner />
                                </>}
                                <div style={{ height: 200 }} className=" p-0 list-messenger">
                                    <Scrollbars>
                                        {messengers.map((c, i) =>
                                            <div key={i + v4().toString()} className={"container m-0 messenger-item " + (seletedMessengers.filter(m => m.id == c.id).length > 0 ? "selected" : "")} onClick={() => onSelectedMessenger(c)}>
                                                <div className="row">
                                                    <div className="col-md-2 m-0 pl-0 conversation-avatars-container">

                                                        <img key={"avatar-" + i + v4().toString()} src={c.avatar ?? "/assets/images/Avatar.png"} className="rounded-circle conversation-avatars" /></div>
                                                    <div className="col-md-10 text-left m-0 pr-0 pl-0 align-self-center"> {c.fullName}
                                                    </div>
                                                </div>
                                            </div>)}
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" onClick={onCancelHandler} data-dismiss="modal"><Translation tid="btnClose" /></button>
                            <button type="button" className="btn btn-primary" onClick={onConfirmHandler} ><Translation tid="btnInvite" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
    else {
        return (<></>);
    }
}

export default InviteMember;
