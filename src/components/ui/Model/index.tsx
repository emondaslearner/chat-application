import React, { ReactNode, useEffect } from "react";
import {
  Modal as Modals,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

interface ModalProps {
    status: 'custom';
    openButton: ReactNode;
    title: string | ReactNode;
    children: ReactNode;
    position: 'right' | 'left' | 'middle';
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"
}

const Modal: React.FC<ModalProps> = ({
    status,
    openButton,
    title,
    children,
    position,
    size = 'md'
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <div className="">
      <span onClick={onOpen}>{openButton}</span>
      <Modals size={size} className={``} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className={`${position === 'right' && 'absolute right-0 top-0 h-full !m-0'}`}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modals>
    </div>
  );
};

export default Modal;
