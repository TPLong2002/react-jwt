import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { addGroups } from "@/services/group";
import { toast } from "react-toastify";

const App = (prop) => {
  const { rerender } = prop;
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState([{ name: true, description: true }]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [groups, setGroups] = useState([
    {
      name: "",
      description: "",
    },
  ]);

  const showModal = () => {
    setOpen(true);
  };
  const handleValid = () => {
    let check = true;
    const newValid = [...valid];
    groups.map((groups, index) => {
      if (groups.name === "") {
        newValid[index] = { ...newValid[index], name: false };
        check = false;
      } else {
        newValid[index] = { ...newValid[index], name: true };
      }
      if (groups.description === "") {
        newValid[index] = { ...newValid[index], description: false };
        check = false;
      } else {
        newValid[index] = { ...newValid[index], description: true };
      }
    });
    setValid(newValid);
    return check;
  };
  const handleOk = async () => {
    const check = handleValid();

    if (check) {
      setConfirmLoading(true);
      const res = await addGroups(groups);
      if (res) {
        toast.success(res.message);
        setOpen(false);
        setConfirmLoading(false);
        rerender();
      }
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");

    setOpen(false);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValid = [...valid];
    const newGroups = [...groups];
    if (value === "") {
      newValid[index] = { ...newValid[index], [name]: false };
    } else {
      newValid[index] = { ...newValid[index], [name]: true };
    }
    newGroups[index] = { ...newGroups[index], [name]: value };
    setValid(newValid);
    setGroups(newGroups);
  };
  const handleAdd = () => {
    setGroups([...groups, { name: "", description: "" }]);
    valid.push({ name: true, description: true });
  };
  const handleDelete = (index) => {
    const newGroups = groups.filter((group, i) => i !== index);
    setGroups(newGroups);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue-600">
        Add Group
      </Button>
      <Modal
        title="Add new role"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="space-y-2">
          {groups.map((group, index) => (
            <div key={index} className="flex flex-row items-center space-x-1">
              <Input
                name="name"
                placeholder="name"
                status={`${valid[index].name ? "" : "error"}`}
                value={group.name}
                onChange={(e) => handleChange(e, index)}
              />
              <Input
                name="description"
                placeholder="Description"
                status={`${valid[index].description ? "" : "error"}`}
                value={group.description}
                onChange={(e) => handleChange(e, index)}
              />
              {index === groups.length - 1 ? (
                <AddCircleOutlineIcon
                  onClick={handleAdd}
                  className=" hover:cursor-pointer"
                />
              ) : (
                <button onClick={() => handleDelete(index)}>
                  <DeleteIcon className=" hover:cursor-pointer" />
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default App;
