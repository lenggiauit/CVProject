import React, { useEffect, useState } from "react";
import { Translation } from "../translation";
import { useGetTemplateTypesMutation } from "../../services/template";
import { AppSetting, MetaData, Paging } from "../../types/type";
import Pagination from "../pagination";
import { Project } from "../../services/models/project";
import TemplateTypeItem from "./item";
import { v4 } from "uuid";
import PageLoading from "../pageLoading";
import LocalSpinner from "../localSpinner";
import AddProjectButton from "./addEditButton";
import { hasPermission } from "../../utils/functions";
import { TemplateType } from "../../services/models/templateType";
import { PermissionKeys } from "../../utils/constants";
import AddEditTemplateTypeModal from "./modals/addEdit";
const appSetting: AppSetting = require('../../appSetting.json');

const TemplateTypesList: React.FC = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    // get team list
    const [getTemplateTypesList, getTemplateTypesStatus] = useGetTemplateTypesMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [templateTypeList, setTemplateTypeList] = useState<TemplateType[]>([]);

    const [selecttedTemplateType, setSelecttedTemplateType] = useState<TemplateType>();
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);


    useEffect(() => {
        getTemplateTypesList({ payload: { isArchived: isArchived }, metaData: metaData });
    }, [metaData, isArchived]);

    useEffect(() => {
        if (getTemplateTypesStatus.isSuccess && getTemplateTypesStatus.data.resource != null) {
            let data = getTemplateTypesStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setTemplateTypeList(data);
        }
    }, [getTemplateTypesStatus]);

    const onEditHandler = (tempType: TemplateType) => {
        setSelecttedTemplateType(tempType);
        setIsShowModal(true);
    }

    const onCloseHandler = (tempType?: TemplateType) => {
        setIsShowModal(false);
        getTemplateTypesList({ payload: { isArchived: isArchived }, metaData: metaData });
        // if (tempType != null) {
        //     let exitTemp = templateTypeList.findIndex(t => t.id == tempType.id);
        //     if (exitTemp == -1) {
        //         var l = templateTypeList.filter(t => t);
        //         l.push(tempType);
        //         setTemplateTypeList(l);
        //     }
        //     else {
        //         var l = templateTypeList.filter(t => t.id != tempType.id);
        //         if ((isArchived && tempType.isArchived) || !isArchived && !tempType.isArchived) {
        //             l.push(tempType);
        //         }

        //         setTemplateTypeList(l);
        //     }
        // }
    }



    return (<>
        {getTemplateTypesStatus.isLoading && <PageLoading />}
        {isShowModal && <AddEditTemplateTypeModal tempType={selecttedTemplateType} onClose={onCloseHandler} />}
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header mb-0">
                    <h2><Translation tid="TemplateTypesList" /></h2>
                    <hr />
                </header>

                <div data-provide="shuffle">
                    <ul className="nav nav-center nav-bold nav-uppercase nav-pills mb-7 mt-0" data-shuffle="filter">
                        <li className="nav-item">
                            <a className={"nav-link " + (!isArchived ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsArchived(false) }}><Translation tid="all" /></a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (isArchived ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsArchived(true) }} data-group="bag"><Translation tid="archived" /></a>
                        </li>
                    </ul>
                    <div className="row gap-y gap-2" data-shuffle="list">
                        {hasPermission(PermissionKeys.CreateTemplateType) && <AddProjectButton onAdded={onCloseHandler} />}
                        {templateTypeList.map(p => <TemplateTypeItem key={v4().toString()} templateType={p} onSelected={onEditHandler} />)}
                    </div>

                    <div className="mt-7">
                        <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default TemplateTypesList;

