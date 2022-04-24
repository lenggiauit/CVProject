import React, { useEffect, useState } from "react";
import { Translation } from "../translation";
import { useGetTemplatesMutation } from "../../services/template";
import { AppSetting, MetaData, Paging } from "../../types/type";
import Pagination from "../pagination";
import { Project } from "../../services/models/project";
import TemplateItem from "./item";
import { v4 } from "uuid";
import PageLoading from "../pageLoading";
import LocalSpinner from "../localSpinner";
import AddProjectButton from "./addEditButton";
import { hasPermission } from "../../utils/functions";
import { TemplateType } from "../../services/models/templateType";
import { PermissionKeys } from "../../utils/constants";
import AddEditTemplateTypeModal from "./modals/addEdit";
import AddEditTemplateModal from "./modals/addEdit";
import { Template } from "../../services/models/template";
const appSetting: AppSetting = require('../../appSetting.json');

const TemplatesList: React.FC = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    // get team list
    const [getTemplatesList, getTemplatesStatus] = useGetTemplatesMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [templateList, setTemplateList] = useState<Template[]>([]);
    const [selecttedTemplate, setSelecttedTemplate] = useState<Template>();

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
        getTemplatesList({ payload: { isArchived: isArchived }, metaData: metaData });
    }, [metaData, isArchived]);

    useEffect(() => {
        if (getTemplatesStatus.isSuccess && getTemplatesStatus.data.resource != null) {
            let data = getTemplatesStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setTemplateList(data);
        }
    }, [getTemplatesStatus]);

    const onEditHandler = (temp: Template) => {
        setSelecttedTemplate(temp);
        setIsShowModal(true);
    }

    const onCloseHandler = (temp?: Template) => {
        setIsShowModal(false);
        getTemplatesList({ payload: { isArchived: isArchived }, metaData: metaData });
    }



    return (<>
        {getTemplatesStatus.isLoading && <PageLoading />}
        {isShowModal && <AddEditTemplateModal temp={selecttedTemplate} onClose={onCloseHandler} />}
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header mb-0">
                    <h2><Translation tid="TemplatesList" /></h2>
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
                        {templateList.map(p => <TemplateItem key={v4().toString()} template={p} onSelected={onEditHandler} />)}
                    </div>

                    <div className="mt-7">
                        <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default TemplatesList;

