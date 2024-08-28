import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import * as React from 'react';

//import Button from 'react-boostrap/Button' //TODO: fix
import { Card, CardBody, CardHeader, CardFooter, NavItem, Form,  } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Button, Modal } from 'reactstrap';
import { ActivityEditor } from './ActivityEditor';
import { copy, isodate, txtdate } from './lbutils';


export  function ActivityList(props) {
    const [tk, setTk] = useState(null);
    const [tktype, setTkType] = useState(null);
    const [edit, setEdit] = useState(false);
    const blank = {
        "activityID": 0,
        "activityTypeID": 0,
        "activityType": {
            "activityTypeID": 0,
            "activityTypeDescription": "",
            "isActive": false
        },
        "activityCreationDate": new Date(),
        "activityDueTime": new Date(),
        "activityDoneTime": new Date,
        "isDeleted": false,
        "isDone": true,
        "activityTargetID": 0,
        "activityTargetName": "",
        "activityCreatorID": 0,
        "activityCreatorName": "",
        "activityAssigneeID": 0,
        "activityAssigneeName": "",
        "activityNotes": ""
    };
    const [curDoc, setCurDoc] = useState(blank);
    
    const newDoc = () => {
        setCurDoc(blank);
    };
    
    const getTk = async () => {
        const response = await fetch('/api/Activities');
        const data = await response.json();
        setTk(data);
    };

    const getTkType = async () => {
        const response = await fetch('/api/Activities/types');
        const data = await response.json();
        console.log(data);
        setTkType(data);
    };

    const editDoc = (evt, tk) => {
        console.log("Edit =>" + JSON.stringify(tk));
        setCurDoc(tk);
        setEdit(true);
    };

    useEffect(() => { getTkType(); }, []);
    useEffect(() => { getTk(); }, [edit]);

    return (tk === undefined || tk == null) ? <></> : <>
        
        <ActivityEditor show={edit} editOff={setEdit} tktypes={tktype} curDoc={curDoc} setCurDoc={setCurDoc} setEdit={setEdit} />
        <h1 className="mt-4 p-5 bg-primary text-white rounded text-center">Current Activities</h1>

        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Creation date</th>
                    <th>Due date</th>
                    <th>From</th>
                    <th>Notes</th>
                    <th>Type</th>
                    <th>Done</th>
                    <th>
                        <Button className="form-control btn btn-primary bt-sm"
                            onClick={(evt, dato) => { setCurDoc(blank); setEdit(true); }}>
                            <i className="far fa-file-alt"></i>
                        </Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {tk.map((tk, index) =>
                    <tr key={tk.activityID}>
                        <td>{txtdate(tk.activityCreationDate)}</td>
                        <td>{txtdate(tk.activityDueTime)}</td>
                        <td>{tk.activityCreatorName}</td>
                        <td>{tk.activityNotes}</td>
                        <td>{(tktype === undefined || tktype == null || tk.activityTypeID==0) ? "" : tktype[tk.activityTypeID-1].activityTypeDescription }</td>
                        <td><input type="checkbox" className="form-check-input" checked={tk.isDone} readOnly></input></td>
                        <td>
                            <Button className="form-control btn btn-primary bt-sm"
                                onClick={(evt) => { editDoc(evt, tk); }}>
                            <i className="far fa-file-alt"></i>
                        </Button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </>;
}
