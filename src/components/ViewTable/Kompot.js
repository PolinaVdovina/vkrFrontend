import ViewTable from "./ViewTable";
import React from 'react';
import { getHouseList, deleteHouse, changeHouse } from "../../https/houses";
import { getTubeList, deleteTube, changeTube } from "../../https/tubes";
import { getSampleList, changeSample, deleteSample } from "../../https/tubeSamples";
import { Backdrop, CircularProgress, DialogTitle, DialogActions, Dialog, Button, DialogContent } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";

const defaultSettings = {
    title: 'Дома',
    headers: {
        street:   {value: 'Улица',    type: 'text' },         //ключ столбца, который будет показываться в таблице, является ключом из json
        district: {value: 'Район',    type: 'district' },         //type будет использоваться для коррекции ввода фильтра, выбора типа фильтра ( для строк и цифр = , >, <, диапазон)
        number:   {value: 'Дом',      type: 'text' },         
        id:       {value: 'Айдишник', type: 'integer' },
    },

    //Функции, которые вызываются при обращении к бакенду
    fetchFunctions: {
        getList: getHouseList,
        deleteRow: deleteHouse,
        changeRow: changeHouse,
    },

    //Действие, которое вызывается, когда мы 'входим в сущность' (Например, при входе в дом показываются его замеры)
    enterButtonHandler: (id) => alert('Ты вошёл в дом ' + id + ', долбаёб'),
}


//Table Fetcher
export class Kompot extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isFetching: false,
            fetchErrorDialog: false,
            tableData: [],
            rowCount: 0,
        };
    }
    
    getData = (filter, pagination, next) => {
        this.setState({isFetching: true});
        const {
            root = 'entities',
            settings = defaultSettings,      
            staticFilters,   
        } = this.props

        return settings.fetchFunctions.getList({
            onSuccess: (data) => {
                this.setState({
                    tableData: data[root], 
                    filter: filter, 
                    rowCount: data.count,
                    isFetching: false,
                });
            },
            onFailed: () => {
                this.setState({isFetching: false, fetchErrorDialog: true});
            },
            filter: staticFilters ? {...filter, ...staticFilters} : filter,
            pagination: pagination,
            next: next,
        });
    }


    componentDidMount() {
        const {
            defaultPagination = {
                currentPage: 0, 
                rowsPerPage:10,
                rowCount: 0,
            },
            defaultFilter = {},
        } = this.props;
        this.getData(defaultFilter, defaultPagination);
    }

    onReloadData = (filter, pagination, next) => {
        return this.getData(filter, pagination, next);
    }

    deleteRowHandler = (rowIndex, rowData, next) => {
        const {
            settings = defaultSettings,
        } = this.props;

        return settings.fetchFunctions.deleteRow({
            id: rowData.id,
            next: next,
        });
    }

    changeRowAcceptHandler = (id, value, next) => {
        const {
            settings = defaultSettings,
        } = this.props;
        
        this.setState({});
        settings.fetchFunctions.changeRow({value:value,next: next});
        
    }
    
    render() {
        const {
            settings = defaultSettings,                      //Адрес функции для получения списка сущностей в бакенде
            defaultPagination = {
                currentPage: 0, 
                rowsPerPage:10,
            },
        } = this.props;
        
        const {
            tableData = [],
            rowCount = 0,
            isFetching,
            fetchErrorDialog
        } = this.state;


        return (
            <React.Fragment>
                
                <Dialog open={fetchErrorDialog==true}>
                    <DialogTitle>Ошибка</DialogTitle>
                    <DialogContent>
                        Не удалось подключиться к серверу. Проверьте ваше соединение.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({fetchErrorDialog:false}) }> ОК</Button>
                    </DialogActions>
                </Dialog>
                
                {
                isFetching &&
                <Backdrop open={true} style={{zIndex:1000}}>
                    <CircularProgress/>
                </Backdrop>
                }
                <ViewTable 
                settings = {settings}
                tableData={tableData}
                onReloadData={this.onReloadData}
                defaultPagination={defaultPagination}
                rowCount={rowCount}
                onDeleteRow = {this.deleteRowHandler}
                onChangeRowAccept = {this.changeRowAcceptHandler}
                />
            </React.Fragment>
        )
    }
}