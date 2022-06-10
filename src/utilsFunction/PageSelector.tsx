import React, {useState, KeyboardEvent, useEffect} from "react";
import OutsideAlerter from "./hook/useClose";
import styled from "styled-components";
import {colors} from "../components/stylesComponents/colors";

type SelectPropsType = {
    pd?: number
    value: string | number
    onChange: (value: any) => void
    items: any[]
}

export const PageSelect = ({pd, value, onChange, items}: SelectPropsType) => {
    const [active, setActive] = useState(false)
    const [hoveredElement, setHoveredElement] = useState(value)

    const selectedItem = items.find(i => i === value)
    const hoveredItem = items.find(i => i === hoveredElement)

    useEffect(() => {
        setHoveredElement(value)
    }, [value])

    const onClickItems = (value: any) => {
        onChange(value);
        setActive(!active)
    }


    const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        for (let i = 0; i < items.length; i++) {
            if (e.key === 'ArrowDown') {
                if (items[i] === hoveredItem) {
                    if (items[i + 1]) {
                        setHoveredElement(items[i + 1])
                        return
                    }
                }
            }
            if (e.key === 'ArrowUp') {
                if (items[i] === hoveredItem) {
                    if (items[i - 1]) {
                        setHoveredElement(items[i - 1])
                        return
                    }
                }
            }
            if (!selectedItem) {
                onChange(items[0])
            }
        }
        if (e.key === 'Enter') {
            setActive(false)
            onChange(hoveredElement)
        }
        if (e.key === 'Escape') {
            setActive(false)
        }
    }

    const outsideHandler = () => {
        setActive(false)
    }

    return (
        <OutsideAlerter outsideHandler={outsideHandler}>
            <Select
                onKeyUp={onKeyUp} tabIndex={0}>
                <Main
                    pd={pd}
                    active={active}
                    onClick={() => setActive(!active)}>
                    {selectedItem && selectedItem}
                </Main>

                {active &&
                    <Items pd={pd}>
                        {items.map(i =>
                            <Option
                                active={hoveredItem === i}
                                key={i}
                                onClick={() => {
                                    onClickItems(i)
                                }}>
                                {i}
                            </Option>)}
                    </Items>}
            </Select>
        </OutsideAlerter>
    )
}

const Select = styled.div`
`

const Items = styled.div<{pd?:number}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3vw;
  color: black;
  padding: ${({pd}) => pd ? pd : 0}px;
  position: absolute;
  border: 0.15vw solid ${colors.Blue};
  border-top: none;
  border-radius: 0 0 0.15vw 0.15vw;
  background-color: ${colors.Lavender};
  cursor: pointer;`

const Main = styled.span<{pd?: number, active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.15vw solid ${colors.Blue};
  height: 1.5vw;
  padding: ${({pd}) => pd ? pd : 0}px;
  width: 3vw;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: ${({active}) => active ? '0.2vw 0.2vw 0 0' : '0.2vw'};
  border-bottom: ${({active}) => active && 'none'};
  background-color: ${({active}) => active && colors.Lavender};
  color: ${({active}) => active && 'black'};
  
  :hover {
    box-shadow: 0 0 10px black;
    cursor: pointer;
  }
`

const Option = styled.div<{ active: boolean }>`
  display: flex;
  width: 100%;
  padding: 0 22px;
  align-items: center;
  justify-content: center;
  color: ${({active}) => active && 'black'};

  :hover {
    box-shadow: 0 0 10px #000000;
  }
`