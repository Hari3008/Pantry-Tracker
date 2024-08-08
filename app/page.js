'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
export default function Home() {
  const [searchTerm, setSearchTerm] = useState(''); 
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainPage searchTerm={searchTerm}/>
    </>
  );
}
