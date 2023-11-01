import {AiOutlineClose} from 'react-icons/ai'
import Button from '../Button/Button';
import {useCallback} from 'react'


interface ModalProps {
    isOpen ?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title ?: string;
    body ?: React.ReactElement;
    footer ?: React.ReactElement;
    actionLabel : string;
    disabled ?: boolean;
}

const Modal:React.FC<ModalProps> = ({
    isOpen , onClose , onSubmit , title , body , footer , actionLabel , disabled
}) => {
    const handleSubmit = useCallback(() => {
        if (disabled) {
          return;
        }
    
        onSubmit();
      }, [onSubmit, disabled]);
    

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }
        if(onClose){
            onClose();
        }
    },[onClose , disabled])

    
    if (!isOpen) {
        return null;
    }
    
  return (
    <div className="
         justify-center
         items-center
         flex
         overflow-x-hidden
         overflow-y-auto
         fixed
         inset-0
         z-50
         outline-none
         bg-neutral-800
         bg-opacity-70
         focus:outline-none
    ">
        <div className="
              relative
              w-2/3
              h-auto
              my-6
              mx-auto
              md:max-w-3xl
              md:h-auto
              md:w-1/3
        ">
            {/* content */}
            <div className="
                 h-full
                 lg:h-auto
                 border-0
                 rounded-lg
                 shadow-lg
                 relative
                 flex
                 flex-col
                 w-full bg-black
                 outline-none
                 focus:outline-none
            ">
                {/* header */}

                <div className="
                     flex
                     items-center
                     justify-between
                     p-10
                     rounded-t
                ">
                    <h3 className="text-3xl font-semibold text-white ">
                        {title}
                    </h3>
                    <button 
                    onClick={handleClose}
                    className="
                            p-1
                            ml-auto
                            border-0
                            text-white
                            transition
                            hover:opacity-70
                            hover:text-red-500
                    ">
                     <AiOutlineClose size={20}  />
                    </button>
                </div>

                <div className='relative p-10 flex-auto' >
                    {body}
                </div>

                {/* footer */}
                <div className='flex flex-col gap-2 p-6 md:p-10'>
                    <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit}  />
                    {footer} 
                </div>

            </div>
        </div>
       
    </div>
  )
}

export default Modal
