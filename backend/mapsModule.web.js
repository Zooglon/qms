/************
.web.js file
************

Backend '.web.js' files contain functions that run on the server side and can be called from page code.

Learn more at https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules/calling-backend-code-from-the-frontend

****/

/**** Call the sample multiply function below by pasting the following into your page code:

import { mapHelper } from 'backend/new-module.web';
console.log(await mapHelper());

$w.onReady(async function () {
});

****/

import { Permissions, webMethod } from "wix-web-module";
import { secrets } from "wix-secrets-backend.v2";
import { elevate } from "wix-auth";

export const mapHelper = webMethod(
  Permissions.Anyone, 
  async () => { 
    // const mapSecret = await getSecretValue(name: string)
    const getMapSecretValue = await elevate(secrets.getSecretValue);    
    return getMapSecretValue("google_mapis_api_key")
    .then((secret) => {getMapSecretValue
      return secret
    })
    .catch((error) => {
      console.error(error);
    });
  }
);
