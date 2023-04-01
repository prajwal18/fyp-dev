import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  DialogActions, Button, Dialog,
  Box, Stack, Typography, Table, TableBody, TableRow, TableCell
} from '@mui/material';
// MUI ICON
import EditIcon from '@mui/icons-material/Edit';
// MUI ICON
import { selectOpenProfile, selectUser, updateOpenProfile } from '@/redux/general/general.slice';

import { baseURL } from '@/utils/endpoints';
import { CustomImage } from '../Common/components/ProfileImage';
import { selectSelectedMember } from '@/redux/people/people.slice';



const CustomStyleHeading = ({ title }: { title: string }) => {
  return (
    <Box sx={{ paddingBottom: '10px', borderBottom: '5px dashed #3399FF' }}>
      <Typography sx={{ fontWeight: '700', fontSize: "22px", textTransform: 'uppercase' }}>{title}</Typography>
    </Box>
  )
}



const HeadSection = ({ handleOpenEdit, userName }: { handleOpenEdit?: () => void, userName: string }) => {
  return (
    <Stack direction={'row'} gap={4} alignItems='center' justifyContent='space-between'>
      <Typography sx={{ color: 'rgba(0,0,0,0.5)', fontSize: "22px", fontWeight: "700" }}>View Profile - {userName}</Typography>
      {
        handleOpenEdit &&
        <Stack sx={{
          justifyContent: 'center', alignItems: 'center', padding: '20px', background: 'rgba(28, 175, 229, 0.1)', borderRadius: "50%",
          cursor: 'pointer', '&:hover': { background: 'rgba(28, 175, 229, 0.5)' }, '&:active': { background: 'rgba(28, 175, 229, 0.7)' }
        }}
          onClick={handleOpenEdit}
        >
          <EditIcon />
        </Stack>
      }
    </Stack>
  )
}

const ImageCourseSection = ({ user }: { user: any }) => {
  return (
    <Stack sx={{ minWidth: "200px", maxWidth: "250px" }} spacing={3}>
      <CustomImage
        src={baseURL + (user?.profilePicture || '/abc.jpg')}
        alt='Profile'
        rest={{
          height: 200, width: 200,
          style: { objectFit: 'Cover' }
        }}
      />

      <Stack spacing={2}>
        <CustomStyleHeading title='Courses' />
        <Box sx={{ color: 'rgba(0,0,0,0.5)' }}>
          {
            user?.courses && user.courses.map((item: any, index: number) => (
              <Typography key={index}>{item.name}</Typography>
            ))
          }
        </Box>
      </Stack>
    </Stack>
  )
}


const InformationSection = ({ user }: { user: any }) => {
  return (
    <Stack sx={{ minWidth: "500px", maxWidth: "550px" }} spacing={3}>

      <Stack spacing={2}>
        <CustomStyleHeading title='Personal Info' />
        <Table sx={{ padding: '10px 20px' }}>
          <TableBody>

            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Role: '}</TableCell>
              <TableCell>{user?.role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Address: '}</TableCell>
              <TableCell>{user?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Zip Code: '}</TableCell>
              <TableCell>{user?.zipcode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Contact No: '}</TableCell>
              <TableCell>{user?.contact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Email: '}</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Stack>

      <Stack spacing={2}>
        <CustomStyleHeading title='About Myself' />
        <Box sx={{ padding: '10px 20px' }}>
          <Typography>
            {user?.aboutMe}
          </Typography>
        </Box>
      </Stack>

    </Stack>
  )
}


const ContentSection = ({ handleOpenEdit }: { handleOpenEdit?: () => void }) => {
  const user = useSelector(selectUser);
  return (
    <Stack spacing={4} sx={{ padding: "15px 30px" }}>
      {
        handleOpenEdit ?
          <HeadSection handleOpenEdit={handleOpenEdit} userName={user?.name || ''} />
          :
          <HeadSection userName={user?.name || ''} />
      }
      <Stack direction='row' gap={5}>

        <ImageCourseSection user={user} />

        <InformationSection user={user} />

      </Stack>
    </Stack>
  )
}

const ActionButtons = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Button onClick={handleClose} color="error">Close</Button>
    </DialogActions>
  );
}

const ViewProfileModal = ({ handleOpenEdit }: { handleOpenEdit?: () => void }) => {
  const open = useSelector(selectOpenProfile);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(updateOpenProfile(false));
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth={false}>
      {
        handleOpenEdit ?
          <ContentSection handleOpenEdit={handleOpenEdit} />
          :
          <ContentSection />
      }
      <ActionButtons
        handleClose={handleClose}
      />
    </Dialog>
  )
}

/*This one will specially be used for people in people's page only*/
const InformationSectionViewOnly = ({ user }: { user: any }) => {
  return (
    <Stack sx={{ minWidth: "500px", maxWidth: "550px" }} spacing={3}>

      <Stack spacing={2}>
        <CustomStyleHeading title='Personal Info' />
        <Table sx={{ padding: '10px 20px' }}>
          <TableBody>

            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Name: '}</TableCell>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Role: '}</TableCell>
              <TableCell>{user?.role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'rgba(0,0,0,0.7)', textTransform: 'capitalize' }}>{'Email: '}</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Stack>

      <Stack spacing={2}>
        <CustomStyleHeading title='About Myself' />
        <Box sx={{ padding: '10px 20px' }}>
          <Typography>
            {user?.aboutMe}
          </Typography>
        </Box>
      </Stack>

    </Stack>
  )
}

const HeadSectionViewOnly = ({ userName }: { userName: string }) => {
  return (
    <Stack direction={'row'} gap={4} alignItems='center' justifyContent='space-between'>
      <Typography sx={{ color: 'rgba(0,0,0,0.5)', fontSize: "22px", fontWeight: "700" }}>View Profile - {userName}</Typography>
    </Stack>
  )
}

const ContentSectionViewOnly = () => {
  const selectedMember = useSelector(selectSelectedMember);
  return (
    <Stack spacing={4} sx={{ padding: "15px 30px" }}>
      <HeadSectionViewOnly userName={selectedMember?.name || ''} />
      <Stack direction='row' gap={5}>

        <ImageCourseSection user={selectedMember} />

        <InformationSectionViewOnly user={selectedMember} />

      </Stack>
    </Stack>
  )
}

export const ViewProfileModalOnly = ({ open, setOpen }: { open: boolean, setOpen: (value: any) => void }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth={false}>
      <ContentSectionViewOnly />
      <ActionButtons
        handleClose={handleClose}
      />
    </Dialog>
  )
}
/*This one will specially be used for people in people's page only*/


export default ViewProfileModal;