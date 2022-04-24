import { AppSetting } from "../types/type";
import { decrypt, encrypt } from "./crypter";
import { Cookies } from 'react-cookie';
import { GlobalKeys } from "./constants";
import { User } from "../services/models/user";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import React from "react";
import { ProjectStatus } from "../services/models/projectStatus";

var cookies = new Cookies();
const bgColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
export function GetRandomBgColor() {
    return bgColors[Math.floor(Math.random() * bgColors.length)];;
}

let appSetting: AppSetting = require('../appSetting.json');

export const getLoggedUser = () => {
    try {
        const loggedUser = localStorage.getItem(GlobalKeys.LoggedUserKey);
        //const loggedUser = cookies.get(GlobalKeys.LoggedUserKey); 
        if (loggedUser) {
            return <User>JSON.parse(JSON.stringify(decrypt(loggedUser)));
        }
        else {
            return null;
        }
    }
    catch (e) {
        console.log(e);
        return null;
        //window.location.href = "/login";
    }
}

export const setLoggedUser = (user: any) => {

    localStorage.setItem(GlobalKeys.LoggedUserKey, encrypt(user));

    // var expiresDate = new Date();
    // expiresDate.setMinutes(expiresDate.getMinutes() + 30);
    // cookies.set(GlobalKeys.LoggedUserKey, encrypt(user), {
    //     expires: expiresDate,
    //     secure: true,
    //     httpOnly: true,
    //     sameSite: 'none'
    // });
}

export const logout = () => {
    cookies.remove(GlobalKeys.LoggedUserKey);
    localStorage.clear();
}

export function paginationRange(size: number, startAt: number = 0): ReadonlyArray<number> {
    return Array.from({ length: size }, (x, i) => i + startAt);
}

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function hasPermission(per: string) {
    const user = getLoggedUser();
    if (user) {
        return user.permissions.filter(p => p.code.toLocaleUpperCase() === per.toLocaleUpperCase()).length > 0;
    }
    else {
        return false;
    }
}

export function hasPermissions(per: string[]) {
    const user = getLoggedUser();
    if (user) {
        return user.permissions.filter(p => per.findIndex(pe => p.code.toLocaleUpperCase() === pe.toLocaleUpperCase()) > -1).length > 0;
    }
    else {
        return false;
    }
}

