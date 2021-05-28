import Head from 'next/head'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Popover from '@material-ui/core/Popover'
import SettingsIcon from '@material-ui/icons/Settings'
import CallToActions from './CallToAction'

const StyledBox = styled(Box)`
  position: relative;
  padding-top: calc((9 / 16) * 100%);
  width: 100%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`

const VideoPlayer = ({ data }) => {
  const { avatarImage, name, subheader, link, description } = data
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'settings' : undefined
  return (
    <Box margin="auto">
      <Container maxWidth="md">
        <Box boxShadow="0px 20px 34px 0px rgba(0,41,158,0.3)">
          <Card>
            <CardHeader
              avatar={<Avatar src={avatarImage} />}
              action={
                <IconButton aria-label="settings" onClick={handleClick}>
                  <SettingsIcon />
                </IconButton>
              }
              title={name}
              subheader={subheader}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box padding="3rem 2rem" height="50%">
                <CallToActions />
              </Box>
            </Popover>
            <StyledBox>
              <ReactPlayer
                className="react-player"
                url={link}
                controls
                playing
              />
            </StyledBox>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

export default VideoPlayer
