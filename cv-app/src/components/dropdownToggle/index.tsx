import { type } from "os";
import { ReactElement, useEffect, useState } from "react";
import { v4 } from "uuid";

export type DropdownToggleItem = {
    id: any,
    name: any,
    code?: any,
}

type Props = {
    name: any,
    items: DropdownToggleItem[],
    cssClass?: any,
    onSelectHandler: (item: DropdownToggleItem) => void;
    setSelected?: DropdownToggleItem;
}

const DropdownToggle: React.FC<Props> = ({ name, cssClass, items, setSelected, onSelectHandler }): ReactElement => {
    const [isShow, setIshow] = useState(false);
    const [selectedName, setSelectedName] = useState(name);

    useEffect(() => {
        if (setSelected)
            setSelectedName(setSelected.name);
    }, [setSelected]);
    return (
        <>
            <div className={"btn-group dropup" + (isShow ? "show" : "")}>
                <button className={"btn " + cssClass + " dropdown-toggle mw-200"} onClick={(e) => { e.preventDefault(); setIshow(!isShow) }} data-toggle="dropdown" aria-expanded="false">{selectedName}</button>
                <div className={"dropdown-menu mw-200 " + (isShow ? "show" : "")}  >
                    <h6 className="dropdown-header"> {name}</h6>
                    {items.map(i =>
                        <>
                            <a key={v4.toString()} className="dropdown-item" href="#" onClick={(e) => { setIshow(!isShow); setSelectedName(i.name); onSelectHandler(i) }} >{i.name}</a>
                        </>
                    )}
                </div>
            </div>
        </>
    )

};

export default DropdownToggle;
