import * as React from 'react';
import Button from '../Shared/Button';
import './Modal.css';

// // const data() => {
// //     data.civilite = civilite;
// //     data.name = name;
// //     data.firstname = firstname;
// //     data.birth = birth;
// //     data.email = email;
// //     data.ville = ville;
// //     data.CP = CP;
// // }

interface ModalProps {
    data: any;
    //     civilite: boolean;
    //     name: string;
    //     firstname : string;
    //     birth:Date;
    //     email: string;
    //     ville: string;
    //     CP: string;
    closeModal: () => void;
    validateModal: () => void;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    return (
        <div>
            <div className={'cont'}>
                <div className={'body'}>
                    <p>Civilité : {props.data.civilite}</p>
                    <p>Nom : {props.data.name}</p>
                    <p>Prénom : {props.data.firstname}</p>
                    <p>Date de naissance : {props.data.birth}</p>
                    <p>Mail : {props.data.email}</p>
                    <p>Ville : {props.data.ville}</p>
                    <p>Code postal : {props.data.CP}</p>
                    {/* <Button
                     color="danger"
                         label={'Close'}
                         onClick={props.closeModal}
                     />
                     <Button
                         label={'Validate'}
                         onClick={props.validateModal}
                     /> */}
                </div>
            </div>
        </div>
    );
};

export default Modal;