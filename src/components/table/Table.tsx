import React, {useState} from 'react';
import {LoadingTable} from "../common/loading/LoadingTable";
import {TableElemets} from "./TableElemets";
import {PacksBlock} from '../stylesComponents/wrapperAll';
import styled from "styled-components";
import {useAppSelector, useTypedDispatch} from "../../reduxStore/store";
import {setFilterAC} from "../../reduxStore/appReducer";
import {getTodolistsTC} from "../../thunk/todolistThunk";
import {InitialStateTodolistDomainType} from "../../types/reducersType";
import {useTranslation} from "react-i18next";

type CardTableType = {
    itemPack: InitialStateTodolistDomainType[]
    isFetching: boolean
};

export const CardTable = ({itemPack, isFetching}: CardTableType) => {

    const {filter} = useAppSelector(state => state.AppReducer.params);
    const [up, setUp] = useState<boolean>(false);
    const dispatch = useTypedDispatch();
    const { t } = useTranslation();

    const TableList = [
        {id: 1, name: t('name_table') },
        {id: 2, name: t('date_table') },
        {id: 5, name: t('actions_table')},
    ];


    const onFilterColumnClick = () => {
        setUp(!up);
        filter === '0'
            ? dispatch(setFilterAC({filter: '1'}))
            : dispatch(setFilterAC({filter: '0'}))
        dispatch(getTodolistsTC());
    }

    return (
        <PacksBlock>
            <Table>
                <ItemColumn>
                    {TableList.map(el => (
                        <OneColumn key={el.id}>
                            {el.name}
                            {el.id === 2 && <Span up={up} onClick={onFilterColumnClick}/>}
                        </OneColumn>
                    ))
                    }
                </ItemColumn>
                {isFetching
                    ? <LoadingTable/>
                    : itemPack.map(el => <TableElemets key={el._id} el={el}/>)
                }
            </Table>
        </PacksBlock>
    );
};


const Span = styled.span<{ up?: boolean }>`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
  margin-top: 7px;
  border: solid #242524;
  border-width: 0 0.2vw 0.2vw 0;
  padding: 0.2vw;
  margin-left: 0.3vw;
  transform: rotate(${({up}) => up ? 225 : 45}deg);
  cursor: pointer;
  transition: 1s all;

`;

const Table = styled.div`
  min-height: 300px;
  height: auto;
`;

const ItemColumn = styled.div`
  width: 100%;
  height: 2.3vw;
  background-color: #ECECF9;
  font-size: 1vw;
  font-weight: 600;
  display: flex;
  align-items: center;`

const OneColumn = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1.2vw;
  width: 100%;

  :nth-child(1) {
    min-width: 15%;
    justify-content: start;
  }

  :nth-child(2) {
    min-width: 20%;
  }

  :nth-child(3) {
    min-width: 20%;
  }`
