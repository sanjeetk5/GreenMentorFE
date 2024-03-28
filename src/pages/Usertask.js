import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, getTask } from "../redux/authReducer/action";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Delete from "@mui/icons-material/Delete";

import EditNoteIcon from "@mui/icons-material/EditNote";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Usertask = () => {
  const dispatch = useDispatch();
  const { isLoading, gettask , task } = useSelector((store) => store.authReducer);
  console.log(gettask);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = (taskId) => {
    setOpen(true);
    // Set the initial values for the title and description based on the task being edited
    const task = gettask.find(task => task._id === taskId);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const handleDeleteTask = (userID) => {
    dispatch(deleteTask(userID))
      .then(() => {
        dispatch(getTask());
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Handle error, if needed
      });
    console.log(userID);
  };

  const handleTaskEdit = (taskId) => (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Collect updated task data from form fields
    const updatedTaskData = {
      title,
      description,
    };
  
    // Dispatch an action to edit the task with the new data
    dispatch(editTask(taskId, updatedTaskData))
      .then(() => {
        // After successful task edit, dispatch an action to fetch updated task list
        dispatch(getTask());
        handleClose(); // Close the dialog
      })
      .catch((error) => {
        console.error("Error editing task:", error);
        // Handle error, if needed
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", margin: "auto", marginTop: "100px" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gettask?.map((task) => (
            <StyledTableRow key={task._id}>
              <StyledTableCell component="th" scope="row">
                {task.title}
              </StyledTableCell>
              <StyledTableCell>{task.description}</StyledTableCell>

              <StyledTableCell>
                <Delete onClick={() => handleDeleteTask(task._id)} />
              </StyledTableCell>

              <StyledTableCell>
                <EditNoteIcon onClick={() => handleClickOpen(task._id)} />
              </StyledTableCell>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: "form",
                  onSubmit: handleTaskEdit(task._id)
                }}
              >
                <DialogTitle>Edit your content</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    
                    margin="dense"
                    id="name"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="desc"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Update</Button>
                </DialogActions>
              </Dialog>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Usertask;
