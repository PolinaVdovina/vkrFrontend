import React from 'react';
import AuthWindow from "./AuthWindow";
import RegWindow from "./RegWindow";
import AuthError from "../components/AuthError";
import { Route } from "react-router";
import Analytics from "./Analytics"
import Cabinet from "./Cabinet"
import IncidentsList from "./IncidentsList"
import Test from "./Test"
import WorkersList from "./WorkersList"
import Home from "./Home"
import ErrorRights from "./ErrorRights"


export const list = {
    homePage: {
        title: 'Домашняя страница',
        path: '/home',
        component: Home,
    },
    authError: {
        title: 'Ошибка регистрации',
        path: '/errorlogin',
        shortPath: '/errorlogin',
        component: AuthError,
    },
    rightsError: {
        title: 'Недостаточно прав',
        path: '/errorrights',
        shortPath: '/errorrights',
        component: ErrorRights,
    },
    auth: {
        title: 'Авторизация',
        path: '/auth',
        shortPath: '/auth',
        component: AuthWindow,
    },
    register: {
        title: 'Регистрация',
        path: '/register',
        component: RegWindow,
    },
    cabinet: {
        title: 'Личный кабинет',
        path: '/cabinet',
        component: Cabinet
    },
    incidents: {
        title: 'Список инцидентов',
        path: '/incidents_list',
        component: IncidentsList
    },
    test: {
        title: 'Квалификационный тест',
        path: '/test',
        component: Test
    },
    analytics: {
        title: 'Аналитика',
        path: '/analytics',
        component: Analytics
    },
    workersList: {
        title: 'Список работников',
        path: '/workers_list',
        component: WorkersList
    }

};

export const getTitleFromPath = (path) => {
    let page = Object.values(list).find(
        element => (
            path===element.path
        )
    );
    return (page && page.title)||('');
}

export const getRouteFromPage = (page) => <Route path={page.path} component={page.component}/>;

export const getAllRoutesFromPages = () => {
    return(
        <React.Fragment>
        {
            Object.keys(list).map(
                index => getRouteFromPage(list[index])
            )
        }
        </React.Fragment>
    );
}