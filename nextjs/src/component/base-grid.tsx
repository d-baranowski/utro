import React from 'react';
import {getMRT_RowSelectionHandler, MaterialReactTable, MRT_RowData, useMaterialReactTable} from "material-react-table";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {Alert} from "@mui/material";
import {errorLog} from "@log";
import toast from "react-hot-toast";

type DeleteHookProps = {
  onSuccess?: (data: any, variables: { ids: string[] }) => void,
  throwOnError: boolean,
  onError: (err: { message: string }) => void
}

type DeleteHookResult = {
  mutateAsync: (props: { ids: string[] }) => Promise<unknown>,
}

interface Props<T extends MRT_RowData> {
  data: T[]
  columns: any
  isLoading: boolean
  error: { message: string } | null
  onAddClick?: () => void
  onEditClick?: (id: string) => void
  deleteHook?: (props: DeleteHookProps) => DeleteHookResult
  invalidateList: () => Promise<void>;
  invalidateById: (props: { id: string }) => Promise<void>;
}

function BaseGrid<T extends MRT_RowData>(props: Props<T>) {
  const {deleteHook = () => ({mutateAsync: () => Promise.resolve()})} = props;

  const {mutateAsync: onDeleteClick} = deleteHook({
    onSuccess: (data: any, variables) => {
      props.invalidateList().catch((err) => {
        errorLog({
          error: err,
          msg: "Failed to invalidate list",
        })
      });
      variables.ids.forEach(id => {
        props.invalidateById({id}).catch((err) => {
          errorLog({
            error: err,
            msg: "Failed to invalidate item",
          })
        });
      })
    },
    throwOnError: false,
    onError: (err) => {
      toast.error("Could not delete due to error - " + err.message)
    }
  });

  const table = useMaterialReactTable({
    columns: props.columns,
    data: props.data,
    initialState: {
      density: "compact",
      columnVisibility: props.columns.reduce((acc: Record<string, boolean>, column: {
        accessorKey?: string,
        id?: string,
        defaultHide: boolean
      }) => {
        let key = column.accessorKey as string
        if (column.id) {
          key = column.id
        }
        acc[key] = !column.defaultHide
        return acc;
      }, {} as Record<string, boolean>)
    },
    state: {
      isLoading: props.isLoading,
    },
    muiSkeletonProps: {
      animation: 'wave',
    },
    positionToolbarAlertBanner: "bottom",
    getRowId: (row) => row.id,
    enableSelectAll: true,
    enableRowSelection: true,
    muiTableBodyRowProps: ({row, staticRowIndex, table}) => ({
      onDoubleClick: props.onEditClick ? () => {
        if (props.onEditClick) {
          props.onEditClick(row.id)
        }
      } : undefined,
      onClick: (event) =>
        getMRT_RowSelectionHandler({row, staticRowIndex, table})(event), //import this helper function from material-react-table
      sx: {cursor: 'pointer'},
    }),
    renderTopToolbarCustomActions: ({table}) => (
      <Box sx={{display: 'flex', gap: '1rem', p: '4px'}}>
        {!!props.onAddClick && <IconButton onClick={props.onAddClick}>
            <AddIcon/>
        </IconButton>
        }
        {!!props.deleteHook && <IconButton
            color="error"
            disabled={!table.getSelectedRowModel().rows.length}
            onClick={() => {
              const ids = Object.keys(table.getSelectedRowModel().rowsById)
              onDeleteClick({ ids }).then(() => {
                table.resetRowSelection();
              }).catch(() => {})
            }}
        >
            <DeleteIcon/>
        </IconButton>}
      </Box>
    ),
  });

  return <>
    {!!props.error && <Alert severity="error">Error loading rows - {props.error.message}</Alert>}
    <MaterialReactTable table={table}/>
  </>;
};

export default BaseGrid;