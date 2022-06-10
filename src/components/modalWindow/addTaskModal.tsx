import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {
    ButtonCancel, ButtonSave, ButtonsBlock, Close, Input,
    InputWrapper, Modal, ModalTextWrapper, ModalWindow, ModalWrapper, WrapperTextAndClose
} from "../stylesComponents/modalWrappers";
import {useFormik} from "formik";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {createTodolistTC} from "../../thunk/todolistThunk";
import {Button} from "../common/buttons/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {fileToBase64} from "../../utilsFunction/Error-Utils";
import { FormWrapper, TextAuthWrapper } from '../stylesComponents/taskWrapper';
import { colors } from '../stylesComponents/colors';
import {AppInitialStateType, InitialStateTodolistDomainType} from "../../types/reducersType";

type AddPackModalType = {
    name?: string
    el?: InitialStateTodolistDomainType
    setShow: (show: boolean) => void
}

export type FormikErrorType = {
    nameTask?: string
};

export const AddTaskModal = ({setShow, el, name}: AddPackModalType) => {

    const maxLengthInput = 30;
    const stateApp = useAppSelector<AppInitialStateType>(state => state.AppReducer);
    const dispatch = useTypedDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileURL] = useState<string | null>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(new Date());


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let fileTarget = e.target.files && e.target.files[0];
        if (fileTarget) fileToBase64(fileTarget, (err:any, result: string) => {
            if (result) {
                setFile(fileTarget);
                setFileURL(result);
            }
        })
    };


    const closeModalClick = () => setShow(false);

    const loginForm = useFormik({
        initialValues: {nameTask: ''},
        validate: (values: FormikErrorType) => {
            const errors: FormikErrorType = {};
            if (!values.nameTask) {
                errors.nameTask = "Field is required";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (file && fileUrl) {
                let fileTyped = {
                    name: file?.name,
                    type: file?.type,
                    size: file?.size,
                    lastModified: file?.lastModified,
                    path: fileUrl,
                };
                dispatch(createTodolistTC(values.nameTask, date, fileTyped, el?._id));
            } else {
                dispatch(createTodolistTC(values.nameTask, date, undefined, el?._id));
            }
            setShow(false);
        },
    });

    useEffect(() => {
        loginForm.setFieldValue('nameTask', el?.title);
        loginForm.setFieldValue('date', el?.addedDate);
    }, [el?.title])

    return (
        <ModalWrapper>
            <ModalWindow>
                <FormWrapper onSubmit={loginForm.handleSubmit}>
                    <Modal>
                        <WrapperTextAndClose>
                            <ModalTextWrapper>{name ? name : 'Add Task'}</ModalTextWrapper>
                            <Close onClick={closeModalClick}/>
                        </WrapperTextAndClose>

                        <InputWrapper>
                            <TextAuthWrapper fontSz={13} opacity={0.5} color={colors.DarkBlue}>Name
                                Pack</TextAuthWrapper>
                            <Input maxLength={maxLengthInput}
                                   type="text"
                                   id="nameTask"
                                   placeholder={"New task name"}
                                   {...loginForm.getFieldProps("nameTask")}
                            />
                        </InputWrapper>
                        <div style={{display: "flex", marginTop: "20px"}}>
                            <input type={"file"}
                                   style={{display: "none"}}
                                   ref={fileInput}
                                   onChange={onChange}
                            />
                            <Button bg={colors.FilterButtonColor}
                                    br={5}
                                    width={40}
                                    name={"Uploads File"}
                                    onClick={() => fileInput?.current?.click()}
                                    button={"button"}
                            />
                            <div style={{marginLeft: "30px"}}>
                                <DatePicker id="date"
                                            selected={date}
                                            onChange={(date: Date) => setDate(date)}
                                            value={el?.addedDate.slice(0, 10).split("-").reverse().join("-")}
                                />
                            </div>
                        </div>
                        <ButtonsBlock>
                            <ButtonCancel onClick={closeModalClick}>
                                Cancel
                            </ButtonCancel>
                            <ButtonSave type="submit"
                                        disabled={!(loginForm.isValid && loginForm.values.nameTask?.length > 0)}>
                                Save
                            </ButtonSave>
                        </ButtonsBlock>
                    </Modal>
                </FormWrapper>
            </ModalWindow>
        </ModalWrapper>
    );
};
