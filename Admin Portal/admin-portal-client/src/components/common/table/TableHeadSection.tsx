import React from "react";
import {
    TableHead, TableRow, TableCell, Stack, Typography
} from "@mui/material";
import { TableHeadPropsType } from "../../../constants/CustomTypes";

// Table Head
const TableHeadSection = ({ HeadData }: { HeadData: Array<TableHeadPropsType> }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    HeadData.map((item: TableHeadPropsType, index: number) => (
                        <React.Fragment key={index}>
                            <TableCell>
                                <Stack direction='row' gap={2}>
                                    {
                                        item?.icon && item.icon
                                    }
                                    <Typography sx={{ fontWeight: "700", textAlign:"center" }}>{item.name}</Typography>
                                </Stack>
                            </TableCell>
                        </React.Fragment>
                    ))
                }
            </TableRow>
        </TableHead>
    )
}
// Table Head

export default TableHeadSection;