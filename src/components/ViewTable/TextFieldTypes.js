import React, { useState } from 'react';
import { 
    TextField,
    MenuItem
} from '@material-ui/core';
import NumberFormat from 'react-number-format';




export const NumericTextField = (props) => {
    return <TextField
    {...props}
    value= {props.value}
  
    InputProps={{
        inputComponent: NumberFormat,
    }}
    />
}


const mouths = ['Январь', 'Февраль', 'Март', 'Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const districts = ['Норильск', 'Талнах', 'Кайеркан', 'Оганер'];
export const SelectByList = (list) => {
    return (
        (props) => (
            <TextField select {...props}>
            {list.map( (value,index) =>
                <MenuItem key={index} value={value}>
                    {value}
                </MenuItem>
            )}
            </TextField>
        )
    )
}

export const SelectByList_ReturningNumber = (list) => {
    return (
        (props) => (
            <TextField select {...props}>
            {list.map( (value,index) =>
                <MenuItem key={index} value={index+1}>
                    {value}
                </MenuItem>
            )}
            </TextField>
        )
    )
}

export const SelectDistrict = SelectByList(districts);
export const SelectMouth = SelectByList_ReturningNumber(mouths);


export const SelectDate = (props) => {
    const onChanged = (event) => {
        let value = event.target.value;
        let split = value.split('-');
        let sendEvent = {
            target:{value:''}
        };
        sendEvent.target.value = split[2] + '-' + split[1] + '-' + split[0];
        props.onChange && props.onChange(sendEvent)
    }
    
    const value = () => {
        let value = props.value;
        let split = value.split('-');
        return split[2] + '-' + split[1] + '-' + split[0];
    }

    return <TextField
    type='date' 
    {...props}
    onChange={onChanged}
    value={value()}></TextField>
}




export const RangeSelector = (props) => {
    const {
        onChange,
        style,
        Comp
     } = props;
    const value = (props.value.toString().includes(';') && 
                       props.value.toString().includes('[') &&
                       props.value.toString().includes(']') &&
                       props.value)
                       || 
                       '[;]';

    const onTextFieldChange = (textFieldIndex = 0, event) => {
        const oldValue = value;
        let splitValue = value.split(';');
        splitValue[0] = splitValue[0].substr(1);
        splitValue[1] = splitValue[1].slice(0,-1);
        
        if(textFieldIndex==0)
            splitValue[0] = event.target.value;
        else
            splitValue[1] = event.target.value;

        const newValue = '[' + splitValue[0] + ';' + splitValue[1] + ']';
        let onChangeEvent = {};
        if(newValue != '[;]')
            onChangeEvent.target = {value: newValue}
        else
            onChangeEvent.target = {value:''}
        onChange(onChangeEvent);
    } 

    return (
        <React.Fragment>
            [
            <Comp 
            {...props}
            onChange={(event) => onTextFieldChange(0, event)} 
            value={value.split(';')[0].substr(1)}
            style = {style}
            inputProps={{style: { textAlign: 'center' }}}/>
            ;
            <Comp 
            value={value.split(';')[1].slice(0,-1)}
            style = {style}
            onChange={(event) => onTextFieldChange(1, event)} 
            inputProps={{style: { textAlign: 'center' }}}/>
            ]
        </React.Fragment>
    )
}

