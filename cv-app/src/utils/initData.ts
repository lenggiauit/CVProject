import { ProjectStatus } from "../services/models/projectStatus";
import { GlobalKeys } from "./constants";
import { decrypt } from "./crypter";

export const getProjectStatus = async () => {
    try {
        const projectStatus = localStorage.getItem(GlobalKeys.ProjectStatus);

        if (projectStatus) {
            return <ProjectStatus[]>JSON.parse(JSON.stringify(decrypt(projectStatus)));
        }
        else {
            // fetch(appSetting.BaseUrl + "account/LoginWithGoogle?access_token=" + access_token)
            // .then(response => response.json())
            // .then((jsonData) => {
            //     if (jsonData.resultCode == ResultCode.Success) {
            //         setLoggedUser(jsonData.resource);
            //         window.location.href = "/";
            //     }
            // }).catch(() => {
            //     console.log('Error');
            // })
        }
    }
    catch (e) {
        console.log(e);
    }
}



