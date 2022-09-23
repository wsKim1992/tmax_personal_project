import React, { memo, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import SingleMusicComponent from './SingleMusicComponent';

const UploadMusicBox = styled.div`
    width:42.5vw;height:42.5vw;
    margin:0 auto;
    background-image:linear-gradient(311deg,
        #A2A5AF,
        ${props => props.theme.headerBgColor}
    );
    border-radius:12.5px;
    .input-container{
        width:100%;height:48.5%;
        &.on{
            height:38.5%;
        }
        .input-wrapper{
            width:100%;height:100%;
            display:flex;
            align-items:center;
            .input-box{
                margin:0 auto;
                width:38.5vw;height:65.5%;
                border-radius:10.5px;
                border:3.5px dashed #fff;
                display:flex;
                flex-direction:row;
                justify-content:space-between;
                align-item:center;
                &.dragged-over{
                    border:3.5px dashed ${props => props.theme.emphasize};
                }
                .input-drag-box{
                    width:18.5vw;height:100%;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;    
                    input[type="file"]{
                        display:none;
                    }
                    >p{
                        width:100%;height:auto;
                        color:#fff;text-align:center;
                        &.file-drag-text{
                            font-size:var(--body-large-text);
                        }
                        &.available-file-type-text{
                            margin-top:19.5px;
                            font-size:var(--body-text);
                        }
                    }
                }
                .label-box{
                    width:14vw;height:100%;
                    display:flex;
                    align-items:center;
                    .label{
                        display:block;
                        cursor:pointer;
                        height:28.5px;
                        line-height: 16.5px;
                        width:auto;
                        color:#000;
                        padding:5.5px 12.5px;
                        box-sizing:border-box;
                        border-radius:4.5px;
                        font-size:var(--body-text);
                        background:#fff;
                        margin:0 auto;
                        &:hover{
                            color:#fff;
                            background-color:${props => props.theme.emphasize};
                        }
                        >span{
                            margin-left:5.5px;
                        }
                    }
                }
            }
        }
    }
    .music-info-container{
        width:100%;height:48.5%;
        &.on{
            height:58.5%;
        }
        .music-info-wrapper{
            width:100%;height:100%;
            .music-info-box{
                width:38.5vw;height:75.5%;
                border-radius:10.5px;
                margin:0 auto;
                &.on{
                    height:100%;
                }
                .added-playlist-container{
                    width:100%;height:100%;
                    .added-playlist-wrapper{
                        width:100%;height:100%;
                        padding:10.5px;
                        box-sizing:border-box;
                        overflow:auto;
                        border-radius:10.5px;
                        background-color:#000;
                        &::-webkit-scrollbar{
                            width:10px;
                        }
                        &::-webkit-scrollbar-track{
                            width:10px;
                            background-color:#000;
                            border-radius:4.5px;
                        }
                        &::-webkit-scrollbar-thumb{
                            border-radius:4.5px;
                            background:#454545;
                            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                        }
                    }
                }
                .before-uplaod{
                    width:100%;height:100%;
                    .upload-icon{
                        width:100%;height:auto;
                        font-size:var(--body-icon);
                        text-align:center;
                    }
                    .text-area{
                        margin-top:15.5px;
                        width:100%;height:auto;
                        .main-text{
                            width:100%;height:auto;
                            color:#fff;
                            font-size:var(--body-large-text);
                            text-align:center;
                            margin-bottom:15.5px;
                        }   
                        .sub-text{
                            width:100%;height:auto;
                            color:#202323;
                            font-size:var(--body-middle-text);
                            text-align:center;
                        }
                    }
                }
            }
            
        }
    }
    @media screen and (max-width:1405px){
        width: 52.5vw;height: 52.5vw;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        width:48.5vw;
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:48.5vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:940px){
        width: 85.5vw;height: 90%;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        width:58.5vw;
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:58.5vw;
                    }
                }
            }
        }
    }
    @media screen and (max-width:770px){
        width: 85.5vw;height: 90%;
        @media screen and (max-width:1405px){
            .input-container{
                .input-wrapper{
                    .input-box{
                        width:78.5vw;
                    }
                }
            }
            .music-info-container{
                .music-info-wrapper{
                    .music-info-box{
                        width:78.5vw;
                    }
                }
            }
        }
    }
`;

const convertFileSizeIntoStr = (fileObj, size, sizeInMeasurement) => {
    let sizeInByte = fileObj.size;
    let measurementArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB');
    let i = 0;
    let sizeLimit = size;

    while (sizeLimit > sizeInMeasurement) {
        sizeLimit /= 1024;
        i++;
    }
    sizeLimit = `${Math.round(sizeLimit * 100) / 100} ${measurementArr[i]}`;
    let fSize = sizeInByte;
    if (fSize > size) {
        return { measurement: null, memorySize: null };
    } else {
        let j = 0;
        while (fSize > 1024) {
            fSize /= 1024;
            j += 1;
        }

        fSize = `${Math.round(fSize * 100) / 100} ${measurementArr[j]}`;
        return { measurement: measurementArr[j], memorySize: fSize };
    }
}

const onDropFiles = async (dataTransfer, sizeLimit, sizeLimitMB) => {
    const { items } = dataTransfer;
    const fileArr = [];

    const traverseFileTree = (item) => {
        return new Promise((resolve, reject) => {
            const itemObj = item.webkitGetAsEntry ? item.webkitGetAsEntry() : item;
            if (itemObj.isFile) {
                itemObj.file(file => {
                    const { name, type } = file;
                    console.log(file.type.match(/audio/g));
                    if (file.type.match(/audio/g)) {
                        const {
                            measurement,
                            memorySize
                        } = convertFileSizeIntoStr(file, sizeLimit, sizeLimitMB);
                        if (!measurement || !memorySize) {
                            throw new Error('100MB 이상의 파일이 있습니다. 100MB 이하의 파일을 업로드 해주세요!');
                        }
                        fileArr.push({ name, type: type.split('/')[1], size: memorySize });
                        resolve({ name, type: type.split('/')[1], size: memorySize });
                    } else throw new Error('오직 음원파일만 업로드 가능합니다!');
                })
            } else if (itemObj.isDirectory) {
                let entriesPromises = [];
                let dirReader = itemObj.createReader();
                dirReader.readEntries(entries => {
                    entries.forEach(async entry => {
                        try {
                            entriesPromises.push(traverseFileTree(entry));
                        } catch (err) {
                            throw new Error(err);
                        }
                    })
                    resolve(Promise.all(entriesPromises));
                })
            }
        })
    }

    await Promise.all(Array.prototype.map.call(items, (async (item, i) => {
        await traverseFileTree(item);
    })));
    return fileArr;
}

const UploadMusicComponent = memo(() => {
    const [musicFileArr, setMusicFileArr] = useState(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [tempFlag,setTempFlag] = useState(true);
    const sizeLimitNB = useRef(100);
    const sizeLimit = useRef(sizeLimitNB.current * 1024 * 1024);
    
    const onDragOver = useCallback((evt) => {
        evt.preventDefault();
        setIsDraggedOver(true);
    }, []);

    const onDrawleave = useCallback((evt) => {
        evt.preventDefault();
        setIsDraggedOver(false);
    }, []);

    /**
     * 파일 데이터 객체
     * 곡 이름,
     * 아티스트,
     * 앨범,
     * 용량,
     * 이미지,
     * 장르
     */

    const onChangeFile = useCallback(async (evt) => {
        let fileArr = null;
        if (evt.type === 'drop') {
            let { dataTransfer } = evt;
            evt.stopPropagation();
            evt.preventDefault();
            fileArr = await onDropFiles(dataTransfer, sizeLimit.current, sizeLimitNB.current);
            setIsDraggedOver(false);
        } else if (evt.type === 'change') {
            try {
                let { target: { files } } = evt;
                fileArr = Array.prototype.filter.call(files, (elem) => {
                    if (elem.type.match('audio/*')) {
                        return true;
                    } else {
                        throw new Error('오직 음원파일만 업로드 가능합니다!');
                    };
                })

                fileArr = await Promise.all(fileArr.map(ele => {
                    //console.log(ele);

                    sizeLimit.current = sizeLimitNB.current * 1024 * 1024
                    const { name, type } = ele;
                    if (type.search(/audio/g) === -1) {
                        throw new Error('오직 음원 파일만 업로드 가능합니다!');
                    }
                    const { measurement, memorySize } = convertFileSizeIntoStr(ele, sizeLimit.current, sizeLimitNB.current);
                    if (!measurement || !memorySize) {
                        throw new Error('100MB 이상의 파일이 있습니다. 100MB 이하의 파일을 업로드 해주세요!');
                    }
                    let data = { name: name, size: memorySize, type: type.split('/')[1] };
                    return new Promise(resolve => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(ele);
                        fileReader.onload = async (e) => {
                            const url = e.target.result;
                            resolve({ ...data, url });
                        }
                    })
                }));
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        if (!fileArr) { return false; }
        if (!musicFileArr || musicFileArr.length === 0) { setMusicFileArr([...fileArr]); }
        else { setMusicFileArr(prev => [...prev, ...fileArr]) }
    }, [])

    return (
        <UploadMusicBox>
            <div className={`${tempFlag?'input-container on':'input-container'}`}>
                <div className="input-wrapper">
                    <label
                        htmlFor="fileInputElement"
                        className={`${!isDraggedOver ? `input-box` : `input-box dragged-over`}`}
                        onDragLeave={onDrawleave}
                        onDragOver={onDragOver}
                        onDrop={onChangeFile}
                    >
                        <div className='input-drag-box'>
                            <input
                                type="file"
                                multiple="multiple"
                                name="attachments[]"
                                id="fileInputElement"
                                onChange={onChangeFile}
                            />
                            <p className="file-drag-text">
                                Drag Your File Here
                            </p>
                            <p className="available-file-type-text">
                                mp3,&nbsp; wav, MAX 100MB
                            </p>
                        </div>
                        <div className='label-box'>
                            <button className="label">
                                <FontAwesomeIcon icon={faUpload} />
                                <span>
                                    Upload File
                                </span>
                            </button>
                        </div>
                    </label>
                </div>
            </div>
            <div className={`${tempFlag?"music-info-container on":"music-info-container on"}`}>
                <div className="music-info-wrapper">
                    <div className={`${tempFlag?'music-info-box on':'music-info-box'}`}>
                        {
                            /* (!musicFileArr || musicFileArr.length === 0) */ 
                            (!tempFlag)?
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
                            ):(
                                <div className="added-playlist-container">
                                    <div className="added-playlist-wrapper">
                                        <SingleMusicComponent/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </UploadMusicBox>
    )
})

export default UploadMusicComponent;