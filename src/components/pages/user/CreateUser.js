import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { createUser } from "@/services/user";
import { toast } from "react-toastify";

const App = (props) => {
  const { fetchData } = props;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userIf, setUserIf] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    gender: 0,
    phone: 0,
    groupId: 0,
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    const res = await createUser(userIf);
    if (res.status === 200) {
      fetchData();
      toast.success(res.message);
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserIf({ ...userIf, [name]: value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="bg-blue-600">
        New User
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-col space-y-1">
          <Input
            name="username"
            placeholder="Username"
            value={userIf.username}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={userIf.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={userIf.phone}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            value={userIf.password}
            onChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            value={userIf.address}
            onChange={handleChange}
          />
          <Input
            name="gender"
            placeholder="Gender"
            value={userIf.gender}
            onChange={handleChange}
          />
          <Input
            name="groupId"
            placeholder="GroupID"
            value={userIf.groupId}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
