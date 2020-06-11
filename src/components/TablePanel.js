import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Typography, Grid, TextField, TablePagination } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import NewRequest from './NewRequest'
import RequestComplete from './RequestComplete'
import EngineerShare from './EngineerShare'
import SearchIcon from '@material-ui/icons/Search';

const settings = {
    'user': {
        'url': '/api/user_table',
        'in_works': {
            'date_reg': {
                'label':'Дата регистрации'
            },
            'description': {
                'label':'Описание'
            },
            'date_start': {
                'label':'Дата начала'
            },
            'status': {
                'label':'Статус'
            },           
        },
        'will_estimate': {
            'description': {
                'label':'Описание'
            },
            'date_end': {
                'label': 'Дата завершения'
            },
            'work_group': {
                'label':'Рабочая группа'
            },
            'executor': {
                'label':'Исполнитель'
            },
            'solution': {
                'label':'Решение'
            },
            'rating': {
                'label':'Рейтинг',
                'component': RatingButton
            }
        },
        'complete': {
            'description': {
                'label':'Описание'
            },
            'date_end': {
                'label':'Дата завершения'
            },
            'work_group': {
                'label':'Рабочая группа'
            },
            'executor': {
                'label':'Исполнитель'
            },
            'solution': {
                'label':'Решение'
            },
            'rating_user': {
                'label': 'Рейтинг',
                'component': RatingComp
            }
        }
    },
    'engineer': {
        'url': '/api/engineer_table',
        'new': {
            'date_deadline': {
                'label': 'Крайний срок'
            },
            'description': {
                'label': 'Описание'
            },
            'priority': {
                'label': 'Приоритет'
            },
            'button_towork': {
                'label': 'Действия',
                'component': ButtonStartWork
            }
        },
        'in_work': {
            'date_deadline': {
                'label': 'Крайний срок'
            },
            'date_start': {
                'label': 'Дата начала'
            },
            'description': {
                'label': 'Описание'
            },
            'priority': {
                'label': 'Приоритет'
            },
            'button_towork': {
                'label': 'Действия',
                'component': Actions
            }
        },
        'complete': {
            'date_start': {
                'label': 'Дата начала'
            },
            'date_end': {
                'label': 'Дата завершения'
            },           
            'description': {
                'label': 'Описание'
            },
            'solution': {
                'label': 'Решение'
            },
            'rating_user': {
                'label': 'Рейтинг взаимодействия',
                'component': RatingComp
            }
        }
    },
    'dispatcher': {
        'url': '/api/disp_table',
        'in_process': {
            'date_reg': {
                'label':'Дата регистрации'
            },
            'user': {
                'label': 'Пользователь'
            },
            'description': {
                'label':'Описание'
            },
            'extra_description': {
                'label':'Дополнительная информация'
            }
        },
        'appointed': {
            'date_reg': {
                'label':'Дата регистрации'
            },
            'description': {
                'label':'Описание'
            },
            'work_group': {
                'label':'Рабочая группа'
            }, 
            'executor': {
                'label': 'Исполнитель'
            }          
        },
        'refuse': {
            'description': {
                'label':'Описание'
            },
            'work_group': {
                'label':'Рабочая группа'
            },
            'executor': {
                'label':'Исполнитель'
            },
            'delay_reason': {
                'label':'Причина отказа'
            },
        },
        'delay': {
            'description': {
                'label':'Описание'
            },
            'work_group': {
                'label':'Рабочая группа'
            },
            'executor': {
                'label':'Исполнитель'
            },
            'delay_reason': {
                'label':'Причина отсрочки'
            },
        },
        'arbitr': {
            'description': {
                'label':'Описание'
            },
            'executor': {
                'label':'Исполнитель'
            },
            'user': {
                'label': 'Пользователь'
            },
            'rating_isp': {
                'label': 'Рейтинг исполнения',
                'component': RatingComp
            },
            'rating_user': {
                'label': 'Рейтинг взаимодействия',
                'component': RatingComp
            }
        }
    }
}

function ButtonStartWork(props) {
    return(
        <Button 
            variant="outlined" 
            color="primary"
            style={{'margin': '15px'}}
            onClick = {() => props.onClick(props.type, props.index)}
        >
            Приступить
        </Button> 
    )
}


function Actions(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isOpenDelay, setIsOpenDelay] = React.useState(false)
    const [isOpenShare, setIsOpenShare] = React.useState(false)
    const [isOpenComplete, setIsOpenComplete] = React.useState(false)
    const [isOpenRefuse, setIsOpenRefuse] = React.useState(false)
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleClickRefuse = (event) => {
        setIsOpenRefuse(true);
        setAnchorEl(null);
    };

    const handleClickDelay = (event) => {
        setIsOpenDelay(true);
        setAnchorEl(null);
    };

    const handleClickShare = (event) => {
        setIsOpenShare(true);
        setAnchorEl(null);
    };

    const handleClickComplete = (event) => {
        setIsOpenComplete(true);
        setAnchorEl(null);
    };

    const saveDelay = (delayReason) => {
        const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                'id': props.id,
                'delay_reason': delayReason
            })
        }

        fetch('/api/update_work_task', (postSend)).then(response=>response.json()).then(() => setIsOpenDelay(false))
    }

    const saveComplete = (solution, rating) => {
        const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                'id': props.id,
                'solution': solution,
                'date_end': new Date(),
                'rating': rating
            })
        }

        fetch('/api/update_work_task', (postSend)).then(response=>response.json()).then(() => setIsOpenComplete(false))
    }

    const saveShare = (delayReason) => {
        /*const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                'id': props.id,
                'delay_reason': delayReason
            })
        }

        fetch('/api/update_work_task', (postSend)).then(response=>response.json()).then(() => setIsOpenShare(false))*/
        setIsOpenShare(false)
    }

    const saveRefuse = (refuseReason) => {
        const postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                'id': props.id,
                'delay_reason': refuseReason,
                'date_start': null,
                'date_deadline': null
            })
        }

        fetch('/api/update_work_task', (postSend)).then(response=>response.json()).then(() => setIsOpenRefuse(false))
    }
  
    return (
        <>           
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{'margin': '10px'}}>
                <MenuOpenIcon/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClickDelay}>Отсрочить</MenuItem>
                <MenuItem onClick={handleClickRefuse}>Отказаться</MenuItem>
                <MenuItem onClick={handleClickShare}>Разделить</MenuItem>
                <MenuItem onClick={handleClickComplete}>Завершить</MenuItem>
            </Menu>
            <Dialog open={isOpenDelay} onClose={() => setIsOpenDelay(false)}>
                <DialogTitle>Отсрочка задания</DialogTitle>
                <DialogContent>
                    <NewRequest onClickSave={saveDelay} label='Укажите причину отсрочки:'></NewRequest>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpenShare} onClose={() => setIsOpenShare(false)}>
                <DialogTitle>Разделение задания</DialogTitle>
                <DialogContent>
                    <EngineerShare onClickSave={saveShare} label='Выберите, с кем хотите разделить задание'></EngineerShare>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpenComplete} onClose={() => setIsOpenComplete(false)}>
                <DialogTitle>Завершить выполнение</DialogTitle>
                <DialogContent>
                    <RequestComplete onClickSave={saveComplete} label='Опишите решение проблемы:'></RequestComplete>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpenRefuse} onClose={() => setIsOpenRefuse(false)}>
                <DialogTitle>Отказ от задания</DialogTitle>
                <DialogContent>
                    <NewRequest onClickSave={saveRefuse} label='Укажите причину отказа:'></NewRequest>
                </DialogContent>
            </Dialog>
        </>
    );
}

function RatingButton(props) {
    return(
        <Rating
            value={props.value}
            style={{'padding': '15px'}}
            onChange={(event) => props.onClick(props.type, props.index, event.target.value)}            
        /> 
    )
}

function RatingComp(props) {
    return(
        <Rating
            value={props.value}
            //style={{'padding': '15px'}} 
            readOnly        
        /> 
    )
}

export default class TablePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'data': [],
            'settings': settings[props.role][props.type],
            'isOpenDelay': false,
            'isOpenShare': false,
            'isOpenComplete': false
        }
    }

    componentWillMount() {
        let postSend = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                'id': this.props.id,
                'type': this.props.type 
            })
        }

        fetch(settings[this.props.role].url, (postSend)).then(response=>response.json()).then(resp=>this.setState({'data': resp}))
    }

    onClick = (type, index, value) => {
        let postSend = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        }
        
        switch(type) {
            case 'rating': {
                let tempData = this.state.data;
                tempData[index][type] = value;
                this.setState({'data': tempData});
                postSend.body = JSON.stringify(this.state.data[index]);
                fetch('/api/set_rating', (postSend)).then(response=>response.json());
                break;
            }
            case 'button_towork': {
                let tempData = this.state.data;
                tempData[index].date_start = new Date();
                this.setState({'data': tempData});
                postSend.body = JSON.stringify(this.state.data[index]);
                fetch('/api/update_work_task', (postSend)).then(response=>response.json());
                break;
            }
        }
        
    }

    render() {
        return(
            <>
            <Grid container justify="flex-end" direction='row' style={{'padding': '10px', 'width':'100%'}}>
                
                <Grid item>
                    <TextField></TextField>
                </Grid>
                <Grid item>
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    
                        
                        
                        <TableRow>
                            {Object.keys(this.state.settings).map(key => 
                                <TableCell>{this.state.settings[key].label}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>                        
                            {(this.state.data.map((el,index) => 
                                <TableRow>
                                    {Object.keys(this.state.settings).map(key => {
                                        const Component = this.state.settings[key].component;
                                        return this.state.settings[key].component ?                                     
                                            <TableCell>
                                                <Component
                                                    value={el[key] ? el[key] : ''}
                                                    onClick={this.onClick}
                                                    type={key}
                                                    index={index}
                                                    key={key}
                                                    id={el.id}
                                                />
                                            </TableCell> :
                                            <TableCell>{el[key] ? el[key] : ''}</TableCell>                                                                             
                                    })}
                                </TableRow>                               
                            ))}                           
                        
                    </TableBody>                   
                </Table>
                {/*<TablePagination
                    //rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    //count={rows.length}
                    rowsPerPage={10}
                    page={1}
                    //onChangePage={handleChangePage}
                    //onChangeRowsPerPage={handleChangeRowsPerPage}
                />*/}
            </TableContainer> 
            </>
        )
    }
}
