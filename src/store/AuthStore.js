import { makeObservable, observable, action } from "mobx";
import { checkIfEmailExistsAPI, sendEmailAPI, compareCodeAPI, signUpUserAPI } from "../api/auth";

class AuthStoreClass {
    authState = 0;

    emailAuthState = 0;
    emailAuthFlag = 0;
    usernameAuthFlag = 0;
    emailAuthLoadingflag = false;
    emailErrorMessage = '';
    email = '';
    username = ''

    callingEmailAPI = false;
    callingEmailAPIMessage = '';
    callingEmailAPIError = null;
    callingEmailAPISuccess = false;

    callingCompareCodeAPI = false;
    callingCompareCodeAPIMessage = '';
    callingCompareCodeAPIError = null;
    callingCompareCodeAPISuccess = false;

    callingSignUpAPI = false;
    callingSignUpAPIMessage = '';
    callingSignUpAPIError = null;
    callingSignUpAPISuccess = false;

    constructor() {
        makeObservable(this, {
            emailAuthState: observable,
            emailAuthLoadingflag: observable,
            emailErrorMessage: observable,
            email: observable,
            username: observable,
            callingEmailAPI: observable,
            callingEmailAPIMessage: observable,
            callingEmailAPIError: observable,
            callingEmailAPISuccess: observable,
            callingCompareCodeAPI: observable,
            callingCompareCodeAPIMessage: observable,
            callingCompareCodeAPIError: observable,
            callingCompareCodeAPISuccess: observable,
            callingSignUpAPI: observable,
            callingSignUpAPIMessage: observable,
            callingSignUpAPIError: observable,
            callingSignUpAPISuccess: observable,
            authUsername: action.bound,
            authEmail: action.bound,
            authemailCallAuthAPI: action.bound,
            initEmailErrorMessage: action.bound,
            setUserBasicInfo: action.bound,
            requestSendEmailAPI: action.bound,
            initRequestSendEmailAPI: action.bound,
            requsetCompareCodeAPI: action.bound,
            initRequestCompareCodeAPI: action.bound,
            changeAuthState: action.bound,
            requestSignUpAPI:action.bound,
            initRequestSignUpAPI:action.bound
        })
    }

    authUsername(flag) {
        let bitMask = flag ? 1 : 0;
        bitMask = bitMask | this.emailAuthFlag;
        this.emailAuthState = flag ? this.emailAuthState | bitMask : this.emailAuthState & bitMask;
        this.usernameAuthFlag = flag ? 1 : 0;
    }

    authEmail(flag) {
        let bitMask = flag ? 2 : 0;
        bitMask = bitMask | this.usernameAuthFlag;
        this.emailAuthState = flag ? this.emailAuthState | bitMask : this.emailAuthState & bitMask;
        this.emailAuthFlag = flag ? 2 : 0;
    }

    async authemailCallAuthAPI(data) {
        try {
            this.emailAuthLoadingflag = true;
            const respData = await checkIfEmailExistsAPI(data);
            this.authEmail(respData.flag);
            this.emailErrorMessage = respData.message;
        } catch (err) {
            console.log(err.message);
            this.emailErrorMessage = err.message;
        } finally {
            this.emailAuthLoadingflag = false;
        }
    }

    async requsetCompareCodeAPI(data) {
        try {
            this.callingCompareCodeAPI = true;
            const { message } = await compareCodeAPI(data);
            this.callingCompareCodeAPIMessage = message;
            this.callingCompareCodeAPISuccess = true;
            this.callingCompareCodeAPI = false;
        } catch (err) {
            console.log(err.message);
            this.callingCompareCodeAPIMessage = err.message;
            this.callingCompareCodeAPI = false;
            this.callingCompareCodeAPIError = err;
        }
    }

    initRequestCompareCodeAPI() {
        this.callingCompareCodeAPIMessage = '';
        this.callingCompareCodeAPI = false;
        this.callingCompareCodeAPIError = null;
        this.callingCompareCodeAPISuccess = false;
    }


    async requestSendEmailAPI(data) {
        try {
            const { email, username } = data;
            this.callingEmailAPI = true;
            const respData = await sendEmailAPI({ email });
            this.callingEmailAPIMessage = respData.message;
            this.callingEmailAPISuccess = true;
            this.setUserBasicInfo({ email, username });
            this.callingEmailAPI = false;
        } catch (err) {
            console.log(err.message);
            this.callingEmailAPIMessage = err.message;
            this.callingEmailAPIError = err;
            this.callingEmailAPI = false;
        }
    }

    initRequestSendEmailAPI() {
        this.callingEmailAPIMessage = '';
        this.callingEmailAPIError = null;
        this.callingEmailAPISuccess = false;
        this.callingEmailAPISuccess = false;
    }

    async requestSignUpAPI(data) {
        try {
            this.callingSignUpAPI=true;
            const { flag, message } = await signUpUserAPI(data);
            this.callingSignUpAPIMessage=message;
            this.callingSignUpAPI=false;
            if(!flag){
                throw new Error(message);
            }else{
                this.callingSignUpAPISuccess=true;
            }
        } catch (err) {
            console.error(err.message);
            this.callingSignUpAPI=false;
            this.callingSignUpAPIMessage=err.message;
            this.callingSingUpAPIError = err;
        }
    }

    initRequestSignUpAPI(successFlag){
        this.callingSignUpAPI=false;
        this.callingSignUpAPISuccess=false;
        this.callingSignUpAPIMessage='';
        this.callingSingUpAPIError = null;
        if(successFlag){
            this.authState=0;
            this.username='';
            this.email='';
        }
    }

    initEmailErrorMessage() {
        this.emailErrorMessage = null;
    }

    setUserBasicInfo(data) {
        const { username, email } = data;
        this.email = email;
        this.username = username;
    }

    changeAuthState(data) {
        this.authState = data;
    }

}

const authStore = new AuthStoreClass();

export default authStore;