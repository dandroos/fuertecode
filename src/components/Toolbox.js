import React from "react"
import {
  Github,
  LanguageCsharp,
  LanguageGo,
  LanguageJava,
  LanguageJavascript,
  LanguagePhp,
  LanguagePython,
  Gatsby,
  React as ReactIcon,
  ElectronFramework,
  Nodejs,
  MaterialUi,
  LanguageHtml5,
  LanguageCss3,
} from "mdi-material-ui"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tooltip,
  useTheme,
  Box,
} from "@material-ui/core"
import { AvatarGroup } from "@material-ui/lab"
import { DjangoIcon, ReduxIcon, MongoIcon } from "../images/icons"

function Toolbox() {
  const ToolSet = ({ title, list, children, noDivider }) => (
    <ListItem divider={!noDivider}>
      <ListItemText
        primary={
          <Typography
            variant="overline"
            align="center"
            display="block"
            style={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
        }
        secondary={
          <>
            <AvatarGroup
              max={100}
              style={{
                marginLeft: 8,
                marginBottom: 10,
                justifyContent: "center",
              }}
            >
              {children}
            </AvatarGroup>
            <Typography variant="caption" display="block" align="center">
              {list}
            </Typography>
          </>
        }
        disableTypography
      />
    </ListItem>
  )

  const Tool = ({ name, Icon }) => (
    <Tooltip title={name}>
      <Avatar
        style={{
          marginLeft: -8,
          backgroundColor: useTheme().palette.secondary.main,
        }}
      >
        <Icon />
      </Avatar>
    </Tooltip>
  )
  return (
    <Box mt={2}>
      <Typography variant="h5" align="center">
        My toolbox
      </Typography>
      <List dense disablePadding>
        <ToolSet
          title="Programming/Web Languages"
          list="JavaScript, Go, Python, PHP, C#, Java, HTML5, CSS3"
        >
          <>
            <Tool name="JavaScript" Icon={LanguageJavascript} />
            <Tool name="Go" Icon={LanguageGo} />
            <Tool name="Python" Icon={LanguagePython} />
            <Tool name="PHP" Icon={LanguagePhp} />
            <Tool name="C#" Icon={LanguageCsharp} />
            <Tool name="Java" Icon={LanguageJava} />
            <Tool name="HTML5" Icon={LanguageHtml5} />
            <Tool name="CSS3" Icon={LanguageCss3} />
          </>
        </ToolSet>
        <ToolSet
          title="Other Tech"
          list="React, NodeJS, Gatsby, Electron, Django, Redux, Material-UI,
                  MongoDB, GitHub, Express, Laravel, Bitbucket, Bootstrap,
                  MySQL, Netlify, Heroku, WordPress, GraphQL"
          noDivider
        >
          <>
            <Tool name="React" Icon={ReactIcon} />
            <Tool name="NodeJS" Icon={Nodejs} />
            <Tool name="Gatsby" Icon={Gatsby} />
            <Tool name="Electron" Icon={ElectronFramework} />
            <Tool name="Django" Icon={DjangoIcon} />
            <Tool name="Redux" Icon={ReduxIcon} />
            <Tool name="Material-UI" Icon={MaterialUi} />
            <Tool name="MongoDB" Icon={MongoIcon} />
            <Tool name="GitHub" Icon={Github} />
          </>
        </ToolSet>
      </List>
    </Box>
  )
}

export default Toolbox
