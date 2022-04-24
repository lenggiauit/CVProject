
import React, { useState } from "react";
import { v4 } from "uuid";
import { number } from "yup";
import { AppSetting, MetaData, Paging } from "../../types/type";
import { paginationRange } from "../../utils/functions";
import { Translation } from "../translation";

const appSetting: AppSetting = require('../../appSetting.json');

type Props = {
    totalRows: number,
    pageChangeEvent: (metaData: Paging) => void,
}
const Pagination: React.FC<Props> = ({ totalRows, pageChangeEvent }) => {

    let totalPages = Math.ceil(totalRows / appSetting.PageSize);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const nextPageHandle = () => {
        let p = currentPage + 1;
        setCurrentPage(p);
        pageChangeEvent({ index: p, size: appSetting.PageSize });
    }
    const prevPageHandle = () => {
        let p = currentPage - 1;
        setCurrentPage(p);
        pageChangeEvent({ index: p, size: appSetting.PageSize });
    }
    const moveToPageHandle: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        var p = parseInt((e.target as HTMLAnchorElement).target);
        setCurrentPage(p);
        pageChangeEvent({ index: p, size: appSetting.PageSize });

    }

    if (totalPages > 1) {
        return (
            <>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
                            <a className="page-link pl-2 pr-2 noselect" href="#" onClick={prevPageHandle} ><Translation tid="btnPrev" /></a>
                        </li>
                        {paginationRange(totalPages >= 5 ? 5 : totalPages, (currentPage - 4) < 1 ? 1 : (currentPage - 4)).map(p =>
                            <li key={v4().toString()} className={"page-item  " + (currentPage === p ? "active" : "")}><a className="page-link noselect" href="#" target={p.toString()} onClick={moveToPageHandle} >{p}</a></li>
                        )}
                        <li className={"page-item " + (currentPage === totalPages ? "disabled" : "")}>
                            <a className="page-link pl-2 pr-2 noselect" href="#" onClick={nextPageHandle}><Translation tid="btnNext" /></a>
                        </li>
                    </ul>
                </nav>
            </>);
    }
    else {
        return (<></>);
    }
}

export default Pagination;