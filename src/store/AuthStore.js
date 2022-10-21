import {makeObservable,observable,action} from "mobx";
import {checkIfEmailExistsAPI} from "../api/auth";

class AuthStoreClass{
    emailAuthState = 0;
    emailAuthFlag = 0;
    usernameAuthFlag = 0;
    emailAuthLoadingflag=false;
    emailErrorMessage='';

    constructor(){
        makeObservable(this,{
            emailAuthState:observable,
            emailAuthLoadingflag:observable,
            emailErrorMessage:observable,
            authUsername:action.bound,
            authEmail:action.bound,
            authemailCallAuthAPI:action.bound,
            initEmailErrorMessage:action.bound

        })
    }

    authUsername(flag){
        let bitMask = flag?1:0;
        bitMask=bitMask|this.emailAuthFlag;
        this.emailAuthState=flag?this.emailAuthState|bitMask:this.emailAuthState&bitMask;
        this.usernameAuthFlag=flag?1:0;
        console.log(flag)
        console.log(this.emailAuthState);
        console.log(bitMask)
    }

    authEmail(flag){
        let bitMask = flag?2:0;
        bitMask=bitMask|this.usernameAuthFlag;
        this.emailAuthState=flag?this.emailAuthState|bitMask:this.emailAuthState&bitMask;
        this.emailAuthFlag = flag?2:0;
        console.log(flag);
        console.log(this.emailAuthState);
        console.log(bitMask)
    }

    async authemailCallAuthAPI(data){
        try{
            this.emailAuthLoadingflag=true;
            const respData = await checkIfEmailExistsAPI(data);
            this.authEmail(respData.flag);
            this.emailErrorMessage=respData.message;
        }catch(err){
            console.log(err.message);
            this.emailErrorMessage=err.message;
        }finally{
            this.emailAuthLoadingflag=false;
        }
    }

    initEmailErrorMessage(){
        this.emailErrorMessage=null;
    }

}

const authStore = new AuthStoreClass();

export default authStore;