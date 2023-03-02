import React from "react";
import {
    TableBody, TableRow, TableCell, Stack
} from "@mui/material";
import { TableBodyPT } from "@/constants/CustomTypes";
import { StackDirection } from "@/constants/Constants";
import { TCRowStack, renderActionBtn } from './TableActionCells';

const TableBodySection = ({
    skip, includeSN, dataList, keyValues, actionData
}: TableBodyPT) => {
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {
                            includeSN &&
                            <TableCell>
                                {((skip && skip) || 0) + indexOuter + 1}
                            </TableCell>
                        }

                        {
                            keyValues.map((item: string, indexInner: number) => (
                                <TableCell key={`${item}${indexOuter}${indexInner}`}>
                                    {row[item]}
                                </TableCell>
                            ))
                        }
                        {
                            actionData &&
                            <TCRowStack direction={StackDirection.ROW} gap={2}>
                                {
                                    actionData.map((item: any, index: number) => (
                                        <React.Fragment key={index}>
                                            {renderActionBtn(item.name, () => item.callback(row))}
                                        </React.Fragment>
                                    ))
                                }
                            </TCRowStack>
                        }

                    </TableRow>
                ))
            }
        </TableBody >
    )
}

export default TableBodySection;