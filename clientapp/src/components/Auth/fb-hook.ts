import React from "react";

// Injects the Facebook SDK into the page
const injectFbSDKScript = () => {
  try{
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as any;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if(fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "facebook-jssdk");
  } catch(error) {
    console.log('error while injecting FB: '+ error);
  }
  
};

export const useInitFbSDK = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initializes the SDK once the script has been loaded
  // https://developers.facebook.com/docs/javascript/quickstart/#loading
  try {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        // Find your App ID on https://developers.facebook.com/apps/
        appId: process.env.REACT_APP_APPID,
        cookie: true,
        xfbml: true,
        version: "v8.0",
      });
  
      (window as any).FB.AppEvents.logPageView();
      setIsInitialized(true);
    };
    injectFbSDKScript();
  } catch(error) {
    console.log('error while FB hook: '+ error);
    console.log('is initialized: '+ isInitialized);
  }

  return isInitialized;
};