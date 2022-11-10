import { useQueryClient, useMutation } from "react-query";
import { MUSICLIST } from './keys';
import { uploadMusicDB } from '../api/music';

const MutateMusicList = () => {
    const queryClient = useQueryClient();

    const {
        mutate: MutateMusicListFn,
        isLoading:MutateMusicListLoading,
        isError: MutateMusicListError,
        isSuccess: MutateMusicListSuccess,
        error: MutateMusicListErrorObj,
    } = useMutation(
        (data) => uploadMusicDB(data),
        {
            onSuccess: (resultData, context) => {
                queryClient.invalidateQueries([MUSICLIST]);
               /*  const newPageNum = prevMusicListData?
                1:(prevMusicListData.length/LIMIT_NUMBER_OF_MUSICLIST);
                queryClient.invalidateQueries([MUSICLIST,{pageNum:newPageNum}]); */
            }
        }
    )
    return {
        MutateMusicListFn,
        MutateMusicListError,
        MutateMusicListSuccess,
        MutateMusicListErrorObj,
        MutateMusicListLoading
    }
}

export default MutateMusicList;

