"use client";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { create } from '@mui/material/styles/createTransitions';
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CLINICS, PATIENT_STATUSES } from '@/data/data';

export default function BasicTable() {

  const [rows, setRows] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const fetchRows = async () => {
    try {
      const response = await fetch('/api/patient/');
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRows();
    fetchUsers();
  }, []);

  return (
    <>
      <h2 className='head_text_2 text-left'>
        <span className='blue_gradient'>Patient Triage</span>
      </h2>
      {console.log(users.map((user) => (JSON.stringify(user))))}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Coordinator</TableCell>
              <TableCell align="center">Clinic</TableCell>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Admitted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{row.status}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={row.status} onValueChange={async (value) => {
                        try {
                          await fetch('/api/patient/', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              _id: rows[index]["_id"],
                              status: value,
                            }),
                          });
                          const updatedRows = [...rows];
                          updatedRows[index].status = value;
                          setRows(updatedRows);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                        {PATIENT_STATUSES.map((status) => (
                          <DropdownMenuRadioItem key={status} value={status}>{status}</DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{row.coordinatorId?.name ? row.coordinatorId?.name : 'Unassigned'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={row.coordinatorId?._id} onValueChange={async (value) => {
                        try {
                          await fetch('/api/patient/', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              _id: rows[index]["_id"],
                              coordinatorId: value,
                            }),
                          });
                          const updatedRows = [...rows];
                          updatedRows[index].coordinatorId = value;
                          setRows(updatedRows);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                        {users.filter(user => user.accountType === 'Triage').map((user) => (
                          <DropdownMenuRadioItem key={user._id} value={user}>{user.name}</DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuRadioItem key="unassign" value="unassign">Unassign</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{row.assignedClinic}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={row.assignedClinic} onValueChange={async (value) => {
                        try {
                          await fetch('/api/patient/', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              _id: rows[index]["_id"],
                              assignedClinic: value,
                            }),
                          });
                          const updatedRows = [...rows];
                          updatedRows[index].assignedClinic = value;
                          setRows(updatedRows);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                        {CLINICS.map((clinic) => (
                          <DropdownMenuRadioItem key={clinic} value={clinic}>{clinic}</DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{row.assignedDocId?.name ? row.assignedDocId?.name : 'Unassigned'}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={row.assignedDocId?._id} onValueChange={async (value) => {
                        try {
                          await fetch('/api/patient/', {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              _id: rows[index]["_id"],
                              assignedDocId: value,
                            }),
                          });
                          const updatedRows = [...rows];
                          updatedRows[index].assignedDocId = value;
                          setRows(updatedRows);
                        } catch (error) {
                          console.log(error);
                        }
                      }}>
                        {users.filter(user => user.accountType === 'Doctor').map((user) => (
                          <DropdownMenuRadioItem key={user._id} value={user}>{user.name}</DropdownMenuRadioItem>
                        ))}
                        <DropdownMenuRadioItem key="unassign" value="unassign">Unassign</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell align="center">{new Date(row.admittedDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}