import { PhotoIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react'
const FileUploader = ({ file, setFile }) => {


    const changeHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const [dragActive, setDragActive] = useState(false);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const inputRef = useRef(null);


    return (
        <div className='flex justify-center rounded-full border border-dashed border-gray-900/25 w-72 h-72 text-center'>
            <form className="self-center" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
                <div className=' text-sm leading-6 text-gray-600'>
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <label
                        className={`${dragActive ? "bg-blue-50" : "bg-white"}cursor-pointer rounded-md bg-white font-semibold text-[color:var(--primary-color)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[color:var(--primary-color)] focus-within:ring-offset-2 hover:text-[color:var(--primary-color)]"`}>
                        <p class="flex flex-col items-center space-x-2">

                            <span>Upload a file</span>
                            {dragActive && <div className="absolute width-full h-full" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} ></div>}

                        </p>
                        <input type="file" accept=".png, .jpg, .jpeg" name="importData" class="hidden" onChange={changeHandler} ref={inputRef} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
            </form>
            {/* <Modal setModalOpen={setModalOpen} isModalOpen={isModalOpen}>
    
            </Modal> */}
        </div>
    );
};

export default FileUploader;
