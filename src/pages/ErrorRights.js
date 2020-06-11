import React from 'react';
import { Typography } from '@material-ui/core';

export default class ErrorRights extends React.Component {
    render() {
        return(
            <Typography>
                У вас недостаточно прав для просмотра данной страницы. 
                Вам необходимо иметь рейтинг более 2,8 и успешно пройти 
                квалификационное тестирование.
            </Typography>
        )
    }
}