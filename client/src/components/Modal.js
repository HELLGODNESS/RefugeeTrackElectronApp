import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ children, isModalOpen, setModalOpen, containerClass, containerParentClass = "" }) => {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setModalOpen || (() => { })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className={`fixed inset-0 w-screen overflow-y-auto top-0 md:top-0 md:pt-16 z-10 ${containerParentClass}`}>
                    <div className={`${containerClass || ''} h-full md:h-fit flex justify-center text-center p-0`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative w-full max-w-lg p-4 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                    onClick={() => setModalOpen(false)}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Modal;
