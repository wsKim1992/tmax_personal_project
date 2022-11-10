import {useQueryClient,useMutation} from "react-query";
import {MUSICLIST, COOKIE_USER_KEY} from './keys';
import {deleteMusicAPI} from '../api/music';

const DeleteMusicMutate = ()=>{
    const queryClient = useQueryClient();
    const {
        mutate:DeleteMusicMutateFn,
        isLoading:DeleteMusicLoading,
        isError: DeleteMusicError,
        isSuccess: DeleteMusicSuccess,
        error: DeleteMusicErrorObj,
    } = useMutation(
        (data)=>deleteMusicAPI(data),
        {
            onSuccess:(resultData,context)=>{
                queryClient.invalidateQueries([MUSICLIST]);
            }
        }
    )
    return {
        DeleteMusicMutateFn,
        DeleteMusicLoading,
        DeleteMusicError,
        DeleteMusicSuccess,
        DeleteMusicErrorObj
    }
}

export default DeleteMusicMutate;