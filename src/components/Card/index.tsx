import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cart.slice'
import { setItem } from '@/utils/localStorage'

type CardProps = {
  image: string
  name: string
  species: string
  status: string
  id: number
}

export const CardComponent: React.FC<CardProps> = ({ image, name, species, status, id }) => {
  const [disableButton, setDisableButton] = useState<boolean>(false)
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, info: status }))
  }

  const itemExists = useAppSelector((state) => state.cartReducer)

  useEffect(() => {
    setDisableButton(itemExists.some((item) => item.id === id))
    setItem('cart', itemExists)
  }, [itemExists, id])

  return (
    <Card>
      <CardMedia component="img" height="194" image={image} alt="character" />
      <CardContent>
        <Typography sx={{ mb: 1.5, wordWrap: 'break-word' }} variant="h4">
          {name}
        </Typography>
        <Divider />
        <Typography sx={{ mt: 1.5 }}>Specie: {species}</Typography>
        <Typography sx={{ mt: 1.5 }}>Status: {status}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" size="small" onClick={() => navigate(`/character/${id}`)}>
          More Info
        </Button>
        <Button fullWidth variant="outlined" size="small" onClick={handleAddToCart} disabled={disableButton}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  )
}
