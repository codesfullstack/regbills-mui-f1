import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import TableConfig from "./TableConfig";
import {
  useGetTypeValuesByUserIdQuery,
  useDeleteTypeValueMutation,
  useUpdateTypeValueMutation,
  useAddTypeValueMutation,
} from '../slices/typeValuesApiSlice';
import { useSelector } from "react-redux";

const Config: FunctionComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [spentData, setSpentData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const [deleteTypeValue] = useDeleteTypeValueMutation();
  const [updateTypeValue] = useUpdateTypeValueMutation();
  const [addTypeValueMutation] = useAddTypeValueMutation();
  
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const token = useSelector((state: any) => state.auth.token);
  
  const { data: dataResponse, refetch } = useGetTypeValuesByUserIdQuery({
    idUsuario: userId,
    token: token,
  });

  useEffect(() => {
    if (dataResponse) {
      const spentDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Spent').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
        _id: item._id,
        subtype: item.subtype,
        description: item.description,
        typevalue: item.typevalue
      }));
      const incomeDataMapped = dataResponse.filter((item: { typevalue: string; }) => item.typevalue === 'Income').map((item: { _id: any; subtype: any; description: any; typevalue: any; }) => ({
        _id: item._id,
        subtype: item.subtype,
        description: item.description,
        typevalue: item.typevalue
      }));
      setSpentData(spentDataMapped);
      setIncomeData(incomeDataMapped);
    }
  }, [dataResponse]);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const handleClickOpen = (title: string) => {
    setDialogTitle(title);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const updateData = (newData: any, dataType: any) => {
    if (dataType === "Spent") {
      setSpentData(newData);
    } else if (dataType === "Income") {
      setIncomeData(newData);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={`fade-in-vertical ${isVisible ? 'active' : ''} common-styles`}>
      <CssBaseline />
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Settings
        </Typography>
        <form className={"form"}>
          <div className={"buttonsContainer"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen("Spent")}
              startIcon={<ShoppingCartIcon />}
            >
              New Spent
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickOpen("Income")}
              startIcon={<PaidIcon />}
            >
              New Income
            </Button>
          </div>
          <Dialog
            open={openDialog}
            TransitionComponent={Slide}
            keepMounted
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent style={{ maxHeight: 400, overflowY: 'scroll' }}>
              {dialogTitle === "Spent" && (
                <TableConfig
                  userId={userId}
                  title={dialogTitle}
                  typevalue="Spent"
                  data={spentData}
                  updateTypeValue={updateTypeValue}
                  addTypeValueMutation={addTypeValueMutation}
                  deleteTypeValueMutation={deleteTypeValue}
                  token={token}
                  updateData={updateData}
                  refetch={refetch}
                />
              )}
              {dialogTitle === "Income" && (
                <TableConfig
                  userId={userId}
                  title={dialogTitle}
                  typevalue="Income"
                  data={incomeData}
                  updateTypeValue={updateTypeValue}
                  addTypeValueMutation={addTypeValueMutation}
                  deleteTypeValueMutation={deleteTypeValue}
                  token={token}
                  updateData={updateData}
                  refetch={refetch}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </Container>
  );
};

export default Config;