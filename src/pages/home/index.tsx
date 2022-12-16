import { characters } from '@/api/characters'
import { CardComponent, HeaderComponent } from '@/components'
import { Box, Button, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TypeCharacter } from './interface/character.interface'

export const HomePage: React.FC = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [allCharacters, setAllCharacters] = useState<TypeCharacter[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    characters
      .getAll({ page })
      .then((r) => {
        setCount(r.data.info.pages)
        setAllCharacters(r.data.results)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [page])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <HeaderComponent
        title="Hello World"
        description="Hello world welcome"
        element={
          <Button fullWidth variant="contained">
            Hello World
          </Button>
        }
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <>
            {allCharacters?.length !== 0 ? (
              <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                {allCharacters!.map((character) => (
                  <Grid key={character.id} item xs={3}>
                    <CardComponent
                      image={character.image}
                      name={character.name}
                      species={character.species}
                      status={character.status}
                      id={character.id}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>No data found</Typography>
            )}
          </>
          <Stack alignItems="center" mb={2}>
            <Pagination variant="outlined" color="primary" count={count} page={page} onChange={handleChange} />
          </Stack>
        </>
      )}
    </Container>
  )
}
