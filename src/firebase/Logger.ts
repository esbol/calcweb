import { user } from '@/models/settings/user';
import { initializeApp } from 'firebase/app'

import { getDatabase, ref, set, push, remove } from "firebase/database"



const firebaseConfig = {
    apiKey: "AIzaSyCNSutKsBdJ3KRP5mlN-tbjNJNdbHxRA8w",
    authDomain: "voltcad-9c89d.firebaseapp.com",
    databaseURL: "https://voltcad-9c89d-default-rtdb.firebaseio.com",
    projectId: "voltcad-9c89d",
    storageBucket: "voltcad-9c89d.appspot.com",
    messagingSenderId: "50611959255",
    appId: "1:50611959255:web:5324eec7a7f2c832a34792",
    measurementId: "G-0BJSLE1D2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export enum LogType {
    Info = 1,
    Warn = 2,
    Error = 3
}

export function Log(type: LogType, message: string) {
    const db = getDatabase();

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    const milliseconds = currentDate.getMilliseconds()

    const date = year + "_" + month + '_' + day + '-|-' + hours + 'ч_' + minutes + 'м_' + seconds + 'с_' + milliseconds+'мс'




    const path = 'users/' + user.id + '/Log/' + date

    const mess = type.toString() + '_|_' + message


    set(ref(db, path), mess)
}
export function SendOnline() {
    const db = getDatabase();

    const path = 'onlineUsers/' + user.id 

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    const milliseconds = currentDate.getMilliseconds()

    const mess =   year + "_" + month + '_' + day + '-|-' + hours + 'ч_' + minutes + 'м_' + seconds + 'с_' + milliseconds+'мс'


    set(ref(db, path), mess)
}
export function SendLeave() {
    const db = getDatabase();

    const path = 'onlineUsers/' + user.id

    remove(ref(db, path)).then(() => {
        console.log('removed');

    })
        
}