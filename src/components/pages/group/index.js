import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AddRole from "@/components/pages/group/AddGroup";
import { getGroups, delGroups } from "@/services/group";
import { toast } from "react-toastify";

export default function BasicTable() {
  const [groups, setGroups] = React.useState([
    { id: 0, name: "", description: "", checked: true },
    { id: 1, name: "", description: "", checked: true },
  ]);
  const fetch = async () => {
    const [groups] = await Promise.all([getGroups()]);
    setGroups(groups.data);
  };

  React.useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const res = await delGroups(id);
    if (res) {
      toast.success(res.message);
      fetch();
    }
  };
  return (
    <div className="container mx-auto pt-5">
      <div className="py-4 flex flex-row space-x-1">
        <AddRole rerender={fetch} />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((role, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {role.name}
                    </TableCell>
                    <TableCell align="right">{role.description}</TableCell>
                    <TableCell align="right">
                      <div>
                        <IconButton
                          onClick={() => handleDelete(role.id)}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small">
                          Edit
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
