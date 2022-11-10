import React, { useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import UploadStore from '../../../store/UploadStore';

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
                    console.log(file.value);
                    if (file.type.match(/audio/g)) {
                        const {
                            measurement,
                            memorySize
                        } = convertFileSizeIntoStr(file, sizeLimit, sizeLimitMB);
                        if (!measurement || !memorySize) {
                            throw new Error('100MB 이상의 파일이 있습니다. 100MB 이하의 파일을 업로드 해주세요!');
                        }
                        fileArr.push({ name, type: type.split('/')[1], size: memorySize,key:`${Date.now()}` });
                        resolve({ name, type: type.split('/')[1], size: memorySize,key: `${Date.now()}` });
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

const UploadMusicInput = observer(() => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const sizeLimitNB = useRef(100);
    const sizeLimit = useRef(sizeLimitNB.current * 1024 * 1024);
    const { musicListToBeUpload, updateMusiclistToBeUpload } = UploadStore;

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

                fileArr = await Promise.all(fileArr.map((ele,idx) => {
                    console.log(ele);

                    sizeLimit.current = sizeLimitNB.current * 1024 * 1024
                    const { name, type } = ele;
                    if (type.search(/audio/g) === -1) {
                        throw new Error('오직 음원 파일만 업로드 가능합니다!');
                    }
                    const { measurement, memorySize } = convertFileSizeIntoStr(ele, sizeLimit.current, sizeLimitNB.current);
                    if (!measurement || !memorySize) {
                        throw new Error('100MB 이상의 파일이 있습니다. 100MB 이하의 파일을 업로드 해주세요!');
                    }
                    let data = { name: name, size: memorySize, type: type.split('/')[1], key: `${Date.now()}_${idx}` };
                    return new Promise(resolve => {
                        let fileReader = new FileReader();
                        fileReader.readAsDataURL(ele);
                        fileReader.onload = async (e) => {
                            const url = e.target.result;
                            resolve({ ...data, url ,file:ele});
                        }
                    })
                }));
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        if (!fileArr) { return false; }

        updateMusiclistToBeUpload(fileArr);
        /* if (!musicFileArr || musicFileArr.length === 0) { 
            setMusicFileArr([...fileArr]); 
        }else { 
            setMusicFileArr(prev => [...prev, ...fileArr]) 
        } */
    }, [])

    const onDragOver = useCallback((evt) => {
        evt.preventDefault();
        setIsDraggedOver(true);
    }, []);

    const onDrawleave = useCallback((evt) => {
        evt.preventDefault();
        setIsDraggedOver(false);
    }, []);

    return (
        <div className={`${musicListToBeUpload && musicListToBeUpload.length > 0 ? 'input-container on' : 'input-container'}`}>
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
    )
});

export default UploadMusicInput;
