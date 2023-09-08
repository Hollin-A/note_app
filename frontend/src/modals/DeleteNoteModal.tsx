import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";

import BASE_URL from "../config/apiConfig";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true);
        }
      },
    });

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  },
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Note = {
  _id: string;
  title: string;
  content: string;
  createDate: string;
  updatedDate: string;
};

type DeleteNoteModelProps = {
  note: Note;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyaXlhd2Fuc2Fob2xsaW5AZ21haWwuY29tIiwiaWF0IjoxNjk0MTkyNTY4LCJleHAiOjE2OTQyNzg5Njh9._tpvbzjVGxZP5JuiQeMFP139ZaaagIsVdQ8i84isDhM";

const DeleteNoteModal = (props: DeleteNoteModelProps) => {
  const { note, open, setOpen } = props;
  const handleClose = () => setOpen(false);

  const deleteNote = async () => {
    const axiosConfig = {
      method: "delete",
      url: `${BASE_URL}/notes/${note._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(axiosConfig)
      .then((response: AxiosResponse<{ note: Note }>) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Alert !
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete {note.title} note ?
          </Typography>
          <Button onClick={() => deleteNote()}>delete</Button>
          <Button>cancel</Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteNoteModal;
