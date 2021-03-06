import { useMemo, useCallback, useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Card from 'components/Card'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { breakpoints } from 'utils/breakpoints'
import CardsContext from './CardsContext'
import DrawerContent from './Drawer'
import VideoPlayer from 'components/VideoPlayer'

// tips: https://css-tricks.com/look-ma-no-media-queries-responsive-layouts-using-css-grid/
const StyledRootCards = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
  grid-auto-rows: 1fr;
  gap: 24px 24px;
  width: 100%;
`
const Cards = ({ data }) => {
  const [isPlayVideo, setIsPlayVideo] = useState(false)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [videoDetails, setVideoDetails] = useState({
    id: null,
    name: '',
    link: '',
    description: '',
    date: new Date(),
  })

  const toggleDrawer = useCallback(() => {
    setShowItemDetails((prev) => !prev)
  }, [])

  const CardsAPI = useMemo(
    () => ({
      showItemDetails,
      setShowItemDetails,
      toggleDrawer,
      setVideoDetails,
      videoDetails,
      setIsPlayVideo,
    }),
    [showItemDetails, videoDetails],
  )

  return (
    <CardsContext.Provider value={CardsAPI}>
      <Container maxWidth="lg">
        {isPlayVideo ? (
          <Grow in={isPlayVideo}>
            <>
              <VideoPlayer data={videoDetails} />
              <Box display="flex">
                <Box margin="2rem auto">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setIsPlayVideo(false)
                    }}
                  >
                    Return to videos list
                  </Button>
                </Box>
              </Box>
            </>
          </Grow>
        ) : (
          <>
            <Box margin="1rem auto">
              <Typography variant="h4">
                {isEmpty(data) ? 'Empty list' : 'Recently added'}
              </Typography>
            </Box>
            <StyledRootCards>
              {data.map((item) => (
                <Card {...item} key={item.id} />
              ))}
            </StyledRootCards>
            {/* actual video item content  */}
            <DrawerContent />
          </>
        )}
      </Container>
    </CardsContext.Provider>
  )
}

export default Cards
