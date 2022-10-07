import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import SingleMusicComponent from './SingleMusicComponent';
import UploadStore from '../../../store/UploadStore';

const UploadMusicList = observer(() => {
    const { musicListToBeUpload } = UploadStore;
    return (
        <div className={`${musicListToBeUpload && musicListToBeUpload.length > 0 ? "music-info-container on" : "music-info-container on"}`}>
            <div className="music-info-wrapper">
                <div className={`${musicListToBeUpload && musicListToBeUpload.length > 0 ? 'music-info-box on' : 'music-info-box'}`}>
                    {
                        /* (!musicFileArr || musicFileArr.length === 0) */
                        (!(musicListToBeUpload && musicListToBeUpload.length > 0)) ?
                            (
                                <div className='before-uplaod'>
                                    <p className="upload-icon">
                                        <FontAwesomeIcon icon={faCloudUpload} />
                                    </p>
                                    <div className="text-area">
                                        <p className="main-text">
                                            Hi, Welcome To My-MP3 Player Page
                                        </p>
                                        <p className="sub-text">
                                            Start Uploading Your Music Right Now!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="added-playlist-container">
                                    <div className="added-playlist-wrapper">
                                        {
                                            musicListToBeUpload.map((v, i) => (
                                                <SingleMusicComponent idx={i} key={`${v.name}_${v.type}_${v.key}`} musicInfo={v} />
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
});

export default UploadMusicList;
