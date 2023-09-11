import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteNote } from "../features/notes/noteSlice";
import { userSelector } from "../features/user/userSlice";

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
  }
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

type DeleteNoteModelProps = {
  note: INote;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteNoteModal = (props: DeleteNoteModelProps) => {
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  const selectedUsers = useAppSelector(userSelector);

  useEffect(() => {
    setJwt(selectedUsers.jwt);
  }, [selectedUsers]);

  const { note, open, setOpen } = props;
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  function handleDeleteNote() {
    const noteID = {
      _id: note._id,
      jwt: jwt,
    };
    dispatch(deleteNote(noteID));
  }

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
          <Button onClick={() => handleDeleteNote()}>delete</Button>
          <Button>cancel</Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteNoteModal;
