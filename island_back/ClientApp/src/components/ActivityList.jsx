import { useEffect, useState, useContext, useMemo, useRef } from 'react';
import * as React from 'react';

//import Button from 'react-boostrap/Button' //TODO: fix
import { Card, CardBody, CardHeader, CardFooter, NavItem, Form, } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Button, Modal } from 'reactstrap';
//import { copy, isodate, txtdate } from './lbutils';

export function ActivityList(props) {
    const [tk, setTk] = useState([]);
    const [tktype, setTkType] = useState([]);

    const getTk = async () => {
        const response = await fetch('ticket');
        const data = await response.json();
        setTk(data);
    };

    const getTkType = async () => {
        const response = await fetch('ticket/types');
        const data = await response.json();
        setTkType(data);
    };

    useEffect(() => { getTkType(); }, []);
    useEffect(() => { getTk(); }, []);


    return <>
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    {/*Object.keys(dati[0]).map(k => <th>k</th>)*/}
                    <th>Creation date</th>
                    <th>Due date</th>
                    <th>From</th>
                    <th>Notes</th>
                    <th>Type</th>
                    <th>Done</th>
                    <th>
                        <Button className="form-control btn btn-primary bt-sm"
                            onClick={(evt, dato) => { }}><i class="far fa-file-alt"></i></Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {tk.map((tk, index) =>
                    <tr key={tk.activityID}>
                        <td>{(new Date(tk.activityCreationDate)).toLocaleDateString()}</td>
                        <td>{(new Date(tk.activityDueTime)).toLocaleDateString()}</td>
                        <td>{tk.activityCreatorName}</td>
                        <td>{tk.activityNotes}</td>
                        <td>{tktype[tk.activityTypeID].activityTypeDescription}</td>
                        <td><input type="checkbox" className="form-check-input"  checked={tk.isDone}></input></td>
                        <td><Button className="form-control btn btn-primary bt-sm"
                            onClick={(evt, dato) => { }}>
                            <i class="far fa-file-alt"></i></Button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </>;
}
