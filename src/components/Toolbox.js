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
import { graphql, useStaticQuery } from "gatsby"

function Toolbox() {
  const cms = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "about" }
        extension: { eq: "md" }
      ) {
        childMarkdownRemark {
          frontmatter {
            toolbox {
              toolbox_heading
              other_tech_heading
              programmingweb_languages_heading
              toolbox_languages {
                toolbox_language
              }
              toolbox_other {
                toolbox_technology
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  const ToolSet = ({ title, list, children, noDivider }) => (
    <ListItem divider={!noDivider} key={title}>
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

  const Tool = ({ name, Icon, key }) => (
    <Tooltip title={name} key={key}>
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
        {cms.toolbox.toolbox_heading}
      </Typography>
      <List dense disablePadding>
        <ToolSet
          title={cms.toolbox.programmingweb_languages_heading}
          list={cms.toolbox.toolbox_languages
            .map(i => i.toolbox_language)
            .join(", ")}
        >
          {[
            <Tool name="JavaScript" Icon={LanguageJavascript} key="0" />,
            <Tool name="Go" Icon={LanguageGo} key="1" />,
            <Tool name="Python" Icon={LanguagePython} key="2" />,
            <Tool name="PHP" Icon={LanguagePhp} key="3" />,
            <Tool name="C#" Icon={LanguageCsharp} key="4" />,
            <Tool name="Java" Icon={LanguageJava} key="5" />,
            <Tool name="HTML5" Icon={LanguageHtml5} key="6" />,
            <Tool name="CSS3" Icon={LanguageCss3} key="7" />,
          ].map(i => i)}
        </ToolSet>
        <ToolSet
          title={cms.toolbox.other_tech_heading}
          list={cms.toolbox.toolbox_other
            .map(i => i.toolbox_technology)
            .join(", ")}
          noDivider
        >
          {[
            <Tool name="React" Icon={ReactIcon} key="8" />,
            <Tool name="NodeJS" Icon={Nodejs} key="9" />,
            <Tool name="Gatsby" Icon={Gatsby} key="10" />,
            <Tool name="Electron" Icon={ElectronFramework} key="11" />,
            <Tool name="Django" Icon={DjangoIcon} key="12" />,
            <Tool name="Redux" Icon={ReduxIcon} key="13" />,
            <Tool name="Material-UI" Icon={MaterialUi} key="14" />,
            <Tool name="MongoDB" Icon={MongoIcon} key="15" />,
            <Tool name="GitHub" Icon={Github} key="16" />,
          ].map(i => i)}
        </ToolSet>
      </List>
    </Box>
  )
}

export default Toolbox
