import React from "react";
import {
    TableHead, TableRow, TableCell, Stack, Typography
} from "@mui/material";
import { TableHeadPT } from "../../../constants/CustomTypes";

// Table Head
const TableHeadSection = ({ HeadData }: { HeadData: Array<TableHeadPT> }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    HeadData.map((item: TableHeadPT, index: number) => (
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