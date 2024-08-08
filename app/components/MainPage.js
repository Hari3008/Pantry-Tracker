
import { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton,Box} from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { firestore } from '@/firebase';
 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function MainPage() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'items'));
    setItems(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (input) {
      if (editingId) {
        await updateDoc(doc(firestore, 'items', editingId), { product: input });
        setEditingId(null);
      } else {
        await addDoc(collection(firestore, 'items'), { product: input, quantity: 1 });
      }
      setInput('');
      fetchItems();
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(firestore, 'items', id));
    fetchItems();
  };

  const handleEditItem = (item) => {
    setInput(item.product);
    setEditingId(item.id);
  };

  const handleIncreaseQuantity = async (id, currentQuantity) => {
    await updateDoc(doc(firestore, 'items', id), { quantity: currentQuantity + 1 });
    fetchItems();
  };

  const handleDecreaseQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      await updateDoc(doc(firestore, 'items', id), { quantity: currentQuantity - 1 });
    } else {
      await deleteDoc(doc(firestore, 'items', id));
    }
    fetchItems();
  };

  return (
    <Box 
      sx={{
        minHeight: '91.1vh',
        backgroundImage: 'url(/background_image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)', // Shadow effect
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1>Products Available</h1>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="New Item"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 ,mt:3}}
        />
        <Button onClick={handleAddItem} variant="contained" color="primary" sx={{ mb: 2 }}>
          {editingId ? 'Update' : 'Add'}
        </Button>
        <List>
          {items.map(item => (
            <ListItem key={item.id} secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEditItem(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDecreaseQuantity(item.id, item.quantity)}>
                  <RemoveIcon />
                </IconButton>
              </>
            }>
              <ListItemText primary={item.product} secondary={`Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}