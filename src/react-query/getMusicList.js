import React from 'react';
import { useQueryClient, useInfiniteQuery } from 'react-query';
import { useCookies } from 'react-cookie';
import { MUSICLIST, COOKIE_USER_KEY } from './keys';
import { getMusicListAPI } from '../api/music';
import {LIMIT_NUMBER_OF_MUSICLIST} from '../constant/SettingConstantNumbers'
const GetMusicList = () => {
    const queryClient = useQueryClient();
    const [cookies, ,] = useCookies([COOKIE_USER_KEY]);
    const limit = LIMIT_NUMBER_OF_MUSICLIST;
    console.log(`limit : ${limit}`);
    const {
        data: MusicListData,
        isLoading: loadingMusicListData,
        isFetching: fetchingMusicListData,
        isError: isMusicListError,
        error: musicListError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(
        [MUSICLIST],
        async({pageParam=1}) => {
            const respData = await getMusicListAPI({ limit, pageNum:pageParam });
            console.log(respData);
            return{
                result:respData.musicList,
                nextPage:pageParam+1,
                isLast:respData.isLast,
            }
        },
        {
            getNextPageParam:(lastPage,pages)=>{
                if(!lastPage.isLast) return lastPage.nextPage;
                return undefined;
            },
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            retry: 2,
            retryDelay: 0,
            cacheTime: 1000 * 60 * 8,
            staleTime: Infinity,
            enabled: cookies.UserData !== undefined && cookies.UserData !== null,
            
            onError: (err) => {
                console.error(err);
                if (err?.response?.status === 401) {
                    queryClient.setQueryData([MUSICLIST], null);
                    queryClient.removeQueries([MUSICLIST]);
                }
            }
        }
    )
    return {
        MusicListData,
        loadingMusicListData,
        fetchingMusicListData,
        isMusicListError,
        musicListError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}

export default GetMusicList