import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { TbListDetails } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
// import { FaDownload } from "react-icons/fa";

// import { Link } from "react-router-dom";

export function NotificationDialog({ detail, type }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        size="sm"
        variant="text"
        className="flex items-center gap-2 text-[#222831] bg-[#EEEEEE] hover:bg-[#c6c6c6]"
        onClick={handleOpen}
      >
        Details
      </Button>
      <Dialog open={open} handler={handleOpen} size="md">
        <DialogHeader className="bg-[#222831]">
          <Typography
            variant="h5"
            className="flex text-[#EEEEEE] bg-[#222831]"
            color="blue-gray"
          >
            <TbListDetails className="mr-2 h-7 bg-[#222831]" />
            Transaction Details
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <GrTransaction className="h-28 w-28 text-[#222831]" />
          <Typography className="text-[#222831]" variant="h1">
            {detail.title}
          </Typography>
          <Typography className="font-normal">
            Transaction Id -&gt; {type === "sender" ? detail._id : detail._id}
          </Typography>
          <div className="text-gray-500 font-bold">
            ____________________________________________________________________
          </div>
          <div className="flex  gap-32  w-full text-[#222831]">
            <div className="ml-5 flex flex-col gap-2">
              <Typography variant="h4">
                {type === "sender" ? "Sender's" : "Receiver's"} Details
              </Typography>
              <Typography className="font-normal">
                Name -&gt;{" "}
                {type === "sender"
                  ? detail.senderId.name
                  : detail.receiverId.name}
              </Typography>
              <Typography className="font-normal">
                Account No -&gt;{" "}
                {type === "sender"
                  ? detail.senderId._id
                  : detail.receiverId._id}
              </Typography>
              <Typography className="font-normal">
                Moblie No -&gt;{" "}
                {type === "sender"
                  ? detail.senderId.phone
                  : detail.receiverId.phone}
              </Typography>

              {/* <Typography className="font-normal">
               Transaction id :    {type === "sender"
                  ? detail.senderId._id
                  : detail.receiverId._id}
              </Typography> */}
            </div>

            <div className="gap-2 flex flex-col">
              <Typography variant="h4">Date & Timing</Typography>
              <Typography className="font-normal">
                Date -&gt; {new Date(detail.createdAt).toLocaleDateString()}
              </Typography>
              <Typography className="font-normal">
                Time -&gt; {new Date(detail.createdAt).toLocaleTimeString()}
              </Typography>

              {/* <Link>
                <Button className="flex bg-[#222831] hover:bg-[#393E46]">
                  Download Invoice{" "}
                  <FaDownload className="ml-2 bg-[#222831] text-[#EEEEEE] hover:bg-[#454950]" />{" "}
                </Button>
              </Link> */}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            className="hover:bg-gray-500 text-gray-500 hover:text-[#222831]"
            onClick={handleOpen}
          >
            close
          </Button>
          <Button
            className="bg-[#222831] text-[#EEEEEE] hover:bg-[#454950]"
            onClick={handleOpen}
          >
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
