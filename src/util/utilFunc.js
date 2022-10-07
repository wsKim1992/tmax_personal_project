export const findElement = (element,findCondition,endCondition)=>{
    const trueFlag = element.classList.contains(findCondition)
        ||element.tagName===findCondition;
    if(trueFlag){
        return element;
    }else{
        const endFlag = element.classList.contains(endCondition)
        ||element.tagName===endCondition;
        if(endFlag){
            return null;
        }else{
            return findElement(element.parentElement,findCondition,endCondition);
        }
    }
}