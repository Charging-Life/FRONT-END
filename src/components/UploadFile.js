import { useRef , useState } from 'react';
import '../styles/components/UploadFile.css';

const UploadFile = ({setFile}) => {

    const selectFile = useRef("");
    const [detailImgs,setDetailImgs] = useState([]); 

    // 업로드 하는 함수
    const handleImageUpload = (e) => {
        const fileArr = e.target.files;
        
        if(fileArr.length > 10) {
            alert(`사진 첨부는 10개 까지 가능합니다.`);
            return;
        }
        setDetailImgs([...e.target.files]);
        setFile([...e.target.files]);
      };

    const removeImage = (ele) => {
        setDetailImgs(detailImgs.filter(x => x !== ele));
        if(detailImgs.length === 1) setFile([]);
    };

    return(
        <>
            { detailImgs.length !== 0 &&
            <div id='preview_box'>
                {
                    detailImgs.map((ele, idx)=>{
                        return <div key={idx}>
                            <img src={`/images/icons/CL_icon_upload_${ele.type === 'application/pdf' ? 'file' : 'image'}.png`} alt="사진미리보기" />
                            <div>{ele.name}</div>
                            <div onClick={() => removeImage(ele)}>x</div>
                        </div>
                    })
                }
            </div>
            }
            {/* 아직 pdf 파일은 추후 추가 예정 (accept에 pdf 추가하기)*/}
            <input type="file" style={{display:'none'}} multiple ref={selectFile} 
                accept="image/jpg,image/png,image/jpeg" onChange={handleImageUpload}/>
            <div id='image_upload_btn' onClick={() => selectFile.current.click()}><img src='/images/icons/CL_icon_file.png' alt='이미지 첨부'/>&nbsp;&nbsp;{detailImgs.length}/10</div> 
        </>
    );
}

export default UploadFile;