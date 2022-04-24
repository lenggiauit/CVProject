
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Template } from "../../../services/models/template";
import { TemplateType } from "../../../services/models/templateType";
import { useGetTemplatesByFilterMutation, useGetTemplatesMutation, useGetTemplateTypesMutation } from "../../../services/template";
import { AppSetting, MetaData, Paging } from "../../../types/type";
import PageLoading from "../../pageLoading";
import Pagination from "../../pagination";
import { Translation } from "../../translation";
import TemplateItem from "./item";
const appSetting: AppSetting = require('../../../appSetting.json');

type Props = {
    onSelected: (template: Template) => void,
    onLoading: (value: boolean) => void,
}

const TemplatesList: React.FC<Props> = ({ onSelected, onLoading }) => {

    const [getTemplatesList, getTemplatesStatus] = useGetTemplatesByFilterMutation();
    const [getTemplateTypesList, getTemplateTypesStatus] = useGetTemplateTypesMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [templateList, setTemplateList] = useState<Template[]>([]);
    const [templateTypeList, setTemplateTypeList] = useState<TemplateType[]>([]);

    // filter
    const [currentFilter, setCurrentFilter] = useState<string>('all');

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
        getTemplateTypesList({ payload: { isArchived: false } });
        onLoading(true);
    }, []);

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
            onLoading(false);
        }
    }, [getTemplateTypesStatus]);

    useEffect(() => {
        if (currentFilter == 'all') {
            getTemplatesList({ payload: {}, metaData: metaData });
        }
        else {
            getTemplatesList({ payload: { typeId: currentFilter }, metaData: metaData });
        }
        onLoading(true);
    }, [metaData, currentFilter]);

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
            onLoading(false);
        }
    }, [getTemplatesStatus]);

    const onSelectHandler = (temp: Template) => {
        onSelected(temp);
    }

    return (<>
        <div data-provide="shuffle">
            <ul className="nav nav-center nav-bold nav-uppercase nav-pills mb-7 mt-0" data-shuffle="filter">
                <li className="nav-item">
                    <a className={"nav-link " + (currentFilter == "all" ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setCurrentFilter("all") }}><Translation tid="all" /></a>
                </li>
                {templateTypeList.map((type) => (
                    <>
                        <li className="nav-item">
                            <a className={"nav-link " + (currentFilter == type.id ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setCurrentFilter(type.id) }} data-group="bag">{type.name}</a>
                        </li>
                    </>
                ))}
            </ul>
            <div className="row gap-y gap-2" data-shuffle="list">

                {templateList.map(p => <TemplateItem key={v4().toString()} template={p} onSelected={onSelectHandler} />)}
            </div>

            <div className="mt-7">
                <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
            </div>
        </div>
    </>)
}

export default TemplatesList;

