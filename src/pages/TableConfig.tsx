import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface TableConfigProps {
  userId: string;
  title: string;
  data: {
    typevalue: any;
    description: any;
    _id: string;
    subtype: string;
  }[];
  typevalue: string;
  updateTypeValue: any;
  addTypeValueMutation: any;
  deleteTypeValueMutation: any;
  token: string;
  updateData: (newData: any, dataType: string) => void;
  refetch: () => void;
}

const TableConfig: FunctionComponent<TableConfigProps> = ({
  userId,
  title,
  data,
  typevalue,
  updateTypeValue,
  addTypeValueMutation,
  deleteTypeValueMutation,
  token,
  updateData,
  refetch,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubtype, setNewSubtype] = useState("");
  const [originalSubtype, setOriginalSubtype] = useState("");
  const [addNewSubtype, setAddNewSubtype] = useState("");
  const tableRef = useRef<HTMLTableElement | null>(null);
  const handleEdit = (id: string) => {
    setEditingId(id);
    const currentItem = data.find((item) => item._id === id);
    if (currentItem) {
      setNewSubtype(currentItem.subtype);
      setOriginalSubtype(currentItem.subtype);
    }
  };
  const handleSave = async (id: string) => {
    try {
      const itemToUpdate = data.find((item) => item._id === id);
      if (!itemToUpdate) {
        console.error("Elemento no encontrado para actualizar");
        return;
      }
      const updatedItem = {
        subtype: newSubtype,
        description: itemToUpdate.description,
        typevalue: itemToUpdate.typevalue,
      };
      await updateTypeValue(
        {
          data: {
            id: id,
            registro: updatedItem,
            token: token
          }
        }
      );
      const updatedData = data.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      );
      setEditingId(null);
      updateData(updatedData, typevalue); // Actualizar los datos en Config
      refetch(); // Refrescar los datos desde la consulta
    } catch (error) {
      console.error("Error al actualizar el valor:", error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteTypeValueMutation(
        {
          data: {
            id: id,
            token: token
          }
        }
      );
      const updatedData = data.filter((item) => item._id !== id);
      updateData(updatedData, typevalue); // Actualizar los datos en Config
      refetch(); // Refrescar los datos desde la consulta
    } catch (error) {
      console.error("Error al eliminar el valor:", error);
    }
  };

  const handleAdd = async () => {
    if (addNewSubtype.trim() !== "") {
      console.log("typevalue: ");
      console.log(typevalue);
      try {
        const response = await addTypeValueMutation(
          {
            registro:
            {
              idUsuario: userId,
              subtype: addNewSubtype,
              typevalue: typevalue,
              description: "value",
            },
            token: token
          }
        );
        console.log("response: ");
        console.log(response);
        const newId = response.data._id;
        const newItem = { _id: newId, subtype: addNewSubtype, typevalue: typevalue };
        const updatedData = [...data, newItem];
        setAddNewSubtype("");
        updateData(updatedData, typevalue); // Actualizar los datos en Config
        refetch(); // Refrescar los datos desde la consulta
      } catch (error) {
        console.error("Error al agregar el nuevo valor:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewSubtype(originalSubtype);
  };
  
  useEffect(() => {
    if (!editingId) {
      setAddNewSubtype("");
    }
  }, [editingId]);
  
  useEffect(() => {
    if (editingId && tableRef.current) {
      const rowElement = tableRef.current.querySelector(`#row-${editingId}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [editingId, tableRef]);
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (editingId) {
        handleSave(editingId);
      } else {
        handleAdd();
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      if (editingId) {
        handleCancelEdit();
      }
    }
  };
  
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>Subtype</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  placeholder="Add New Subtype"
                  value={addNewSubtype}
                  onChange={(e) => setAddNewSubtype(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="add"
                  color="primary"
                  onClick={handleAdd}
                  disabled={editingId !== null}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            {data.map((row) => (
              <TableRow key={row._id} id={`row-${row._id}`}>
                <TableCell component="th" scope="row">
                  {editingId === row._id ? (
                    <TextField
                      fullWidth
                      value={newSubtype}
                      onChange={(e) => setNewSubtype(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  ) : (
                    row.subtype
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingId === row._id ? (
                    <div>
                      <IconButton
                        aria-label="save"
                        color="primary"
                        onClick={() => handleSave(row._id)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        aria-label="cancel"
                        color="default"
                        onClick={handleCancelEdit}
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(row._id)}
                        disabled={editingId !== null}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDelete(row._id)}
                        disabled={editingId !== null}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableConfig;
