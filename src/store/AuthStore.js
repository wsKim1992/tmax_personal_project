import {makeObservable,observable,action} from "mobx";

const callEmailAuthApi = (data)=>{
    return Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(data);
            resolve({flag:true})
        })
    })
}

class AuthStoreClass{
    emailAuthState = 0;
    emailAuthFlag = 1;
    usernameAuthFlag = 2;
    emailAuthLoadingflag=false;

    constructor(){
        makeObservable(this,{
            emailAuthState:observable,
            emailAuthLoadingflag:observable,
            authUsername:action.bound,
            authEmail:action.bound,
            authemailCallAuthAPI:action.bound
        })
    }

    authUsername(flag){
        this.emailAuthState=flag?this.emailAuthState|(1<<0):this.emailAuthState|(0<<0);
        console.log(this.emailAuthState);
    }

    authEmail(flag){
        this.emailAuthState=flag?this.emailAuthState|(1<<1):this.emailAuthState|(0<<1);
        console.log(this.emailAuthState);
    }

    async authemailCallAuthAPI(data){
        try{
            this.emailAuthLoadingflag=true;
            const respData = await callEmailAuthApi(data)
            if(respData.flag===true){
                this.emailAuthState=this.emailAuthState|(1<<1);
            }else if(!respData.flag){

            }
        }catch(err){
            
        }finally{
            this.emailAuthLoadingflag=false;
        }
    }

}

const authStore = new AuthStoreClass();

export default authStore;