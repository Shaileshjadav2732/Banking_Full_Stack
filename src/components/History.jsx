import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PiArrowSquareDownRightLight } from "react-icons/pi";
import { PiArrowSquareUpRightLight } from "react-icons/pi";
import React, { useEffect, useState } from "react";
import { NotificationDialog } from "./Dilog";
import { getTransaction } from "../https/transaction";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { fetchUser } from "../https/auth";

export default function History() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  // For Active Tab(i.e sent history or received history)
  const [activeTab, setActiveTab] = useState("send");
  const changePaymentMethod = (method) => {
    method === "receive" ? setActiveTab("receive") : setActiveTab("send");
  };

  // For dilog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [sentMoney, setSentMoney] = useState([]);
  const [receivedMoney, setReceivedMoney] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const transcations = await getTransaction(
        auth.userId,
        authHeader,
        "sent"
      );
      setSentMoney(transcations.transcations);
    }
    fetchTransactions();

    async function fetchReceived() {
      const transcations = await getTransaction(
        auth.userId,
        authHeader,
        "receive"
      );
      setReceivedMoney(transcations.transcations);
    }
    fetchReceived();
  }, []);

  // This variable shows ReceivedHistory of transaction
  const showReceivedHistory =
    receivedMoney.length === 0
      ? "You did not receive money yet!"
      : receivedMoney.map((receivedTranscation) => {
          return (
            <Card
              key={receivedTranscation._id}
              className="mt-6 w-96 bg-transparent"
              shadow={false}
            >
              <CardBody className="bg-[#222831] rounded-t-3xl text-[#EEEEEE]">
                <PiArrowSquareDownRightLight className="h-16 w-16 mb-3 bg-[#222831]" />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 bg-[#222831] text-[#EEEEEE]"
                >
                  from
                </Typography>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 bg-[#222831] text-[#EEEEEE]"
                >
                  {receivedTranscation.senderId.name}
                </Typography>
                <div className="flex gap-4 bg-[#222831]">
                  <Typography variant="h6" className=" bg-[#222831]">
                    Amount: ₹{receivedTranscation.amount}
                  </Typography>
                  <Typography variant="h6" className=" bg-[#222831]">
                    Title : {receivedTranscation.title}
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="pt-0 bg-[#222831] ">
                <NotificationDialog
                  type={"sender"}
                  detail={receivedTranscation}
                />
              </CardFooter>
            </Card>
          );
        });

  const showSentHistory =
    sentMoney.length === 0
      ? "You did not sent money yet!"
      : sentMoney.map((sentTranscation) => {
          return (
            <Card
              key={sentTranscation._id}
              className="mt-6 w-96 bg-transparent"
              shadow={false}
            >
              <CardBody className="bg-[#222831] rounded-t-3xl text-[#EEEEEE]">
                <PiArrowSquareUpRightLight className="h-16 w-16 mb-3 bg-[#222831]" />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 bg-[#222831] text-[#EEEEEE]"
                >
                  sent to
                </Typography>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="mb-2 bg-[#222831] text-[#EEEEEE]"
                >
                  {sentTranscation.receiverId.name}
                </Typography>
                <div className="flex gap-4 bg-[#222831]">
                  <Typography variant="h6" className=" bg-[#222831]">
                    Amount: ₹{sentTranscation.amount}
                  </Typography>
                  <Typography variant="h6" className=" bg-[#222831]">
                    Title : {sentTranscation.title}
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="pt-0 bg-[#222831] ">
                <NotificationDialog
                  type={"receiver"}
                  detail={sentTranscation}
                />
              </CardFooter>
            </Card>
          );
        });

  return (
    <div className="mt-10 ml-10 mb-20">
      <Button
        className={` ${
          activeTab === "receive"
            ? "bg-[#222831] text-[#EEEEEE]  hover:bg-[#393E46]"
            : ""
        }  mr-4 `}
        variant="text"
        onClick={() => {
          changePaymentMethod("receive");
        }}
      >
        Received
      </Button>
      <Button
        className={` ${
          activeTab === "send"
            ? "bg-[#222831] text-[#EEEEEE]  hover:bg-[#393E46]"
            : ""
        }   `}
        variant="text"
        onClick={() => {
          changePaymentMethod("send");
        }}
      >
        Sent
      </Button>

      {/* History */}
      <div className="flex justify-center items-center gap-36 flex-wrap mt-10 mr-14">
        {activeTab === "receive" ? showReceivedHistory : showSentHistory}
      </div>
    </div>
  );
}
