import { useEffect, useState, useContext, useRef } from 'react';
import * as React from 'react';

//import DevicEditor from './deviceeditor.jsx';
//import GenOpt from './genoptt';

//import Button from 'react-boostrap/Button' //TODO: fix
import { Card, CardBody, CardHeader, CardFooter, NavItem, Form, } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Button, Modal } from 'reactstrap';

import { copy, isodate, txtdate } from './lbutils';

export function ActivityEditor(props) {
    const tktypes = (props.tktypes === undefined || props.tktypes == null) ? []:props.tktypes;
    const curDoc = props.curDoc;
    const setCurDoc = props.setCurDoc;
    const setEdit = props.setEdit;
    const show = props.show;
    //const save = props.save;
    const activity = (props.curDoc === undefined) ? null : copy(props.curDoc);
    //const CTypes = (props.contract_types === undefined) ? [{ PKey: 0, Desc: "F.T.L." }] : props.contract_types;

    const editOff =async (write) => {
        //save(saving);
        //Update or save
        if (write === true) {
            let cur = copy(curDoc);
            //Reconvert date
            //cur.contractStartDate = isodate(cur.contractStartDate);
            //cur.contractEndDate = isodate(cur.contractEndDate);
            //
            //cur.deviceId = curDev.deviceId;
            let url = (cur.activityID > 0) ? "/api/Activities/" + cur.activityID : "/api/Activities" ;
            const res = await fetch(url, {
                method: (cur.activityID > 0) ? 'PUT' : 'POST',
                headers: {
                    'Content-type': 'application/json',
                    //'Authorization': "Bearer " + JWT,
                },
                body: JSON.stringify(cur)
            });
        }
        setEdit(false);

    };

    const OnChangeHandler = (evt) => {
        //evt.preventDefault();
        const nm = evt.target.name;
        const vl = evt.target.value;
        let tmp = activity; // JSON.parse(JSON.stringify(contract));
        tmp[nm] = vl;

        if (nm.slice(0, 2).toLowerCase() == "is") {
            tmp[nm] = evt.target.checked;
        }
        //* DEBUG
        console.log(nm + "==" + vl + "\n" +
            curDoc[nm]+ " => " + tmp[nm]);
        //*/
        setCurDoc(tmp);
    };

    return (<>
            <Modal isOpen={show}>
            <h3 className="mt-4 p-5 bg-info text-white rounded text-center">Activity Editor</h3>
                 <div>
                    <input type="hidden" className="form-control" name="activityID" value={curDoc.activityID} readOnly />
                    <Row className="input-group  mb-3 input-group-sm">
                        <Col>
                            <label className="from-label" htmlFor="serviceContractTypeid">Contract Type</label>
                        </Col>
                    <Col xs={9}>
                        <select value={curDoc.activityTypeID} name="activityTypeID" disabled={curDoc.activityID > 0} onChange={(evt) => OnChangeHandler(evt)} >
                            {(tktypes === undefined) ? "" : tktypes.map((tk, index) => <option key={tk.activityTypeID} value={tk.activityTypeID }>{tk.activityTypeDescription}</option> ) }
                        </select>
                    </Col>
                    </Row>
                    <Row className="input-group  mb-3 input-group-sm">
                        <Col>
                            <label className="from-label" htmlFor="activityCreationDate">Activity Date</label>
                        </Col>
                    <Col xs={9}><input type="date" className="form-control" name="activityCreationDate" disabled={curDoc.activityID > 0}
                        value={txtdate(curDoc.activityCreationDate)} onChange={(evt) => OnChangeHandler(evt)} />
                        </Col>
                    </Row>
                    <Row className="input-group  mb-3 input-group-sm">
                        <Col>
                        <label className="from-label" htmlFor="activityNotes">Activity</label>
                        </Col>
                        <Col xs={9}><textarea className="form-control" name="activityNotes"
                            value={curDoc.activityNotes} onChange={(evt) => OnChangeHandler(evt)} />
                        </Col>
                </Row>
                <Row className="input-group  mb-3 input-group-sm">
                    <Col>
                        <label className="from-label" htmlFor="isDone">Done</label>
                    </Col>
                    <Col xs={9} className="form-check form-switch">
                        <input type="checkbox" className="form-check-input" name="isDone"
                            value={curDoc.isDone} checked={curDoc.isDone} onChange={(evt) => OnChangeHandler(evt)} />
                    </Col>
                </Row>


                    {/* Buttons area */ }
                    <Row className="input-group  mb-3 input-group-sm">
                        <Col>
                            <button className="form-control btn btn-success" name="Save" onClick={(evt) => editOff(true)}>Save</button>
                        </Col>
                        <Col>
                            <button className="form-control btn btn-danger" onClick={(evt) => editOff(false)}>Cancel</button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </>
    );
}
