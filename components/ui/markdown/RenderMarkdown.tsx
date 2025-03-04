import React, { useMemo } from "react";
import { useTheme, VStack } from "native-base";
import Markdown, { MarkdownIt } from "@ronradtke/react-native-markdown-display";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { openLink } from "../../../helpers/LinkHelper";
import { findImages, replaceNoMarkdown } from "../../../helpers/MarkdownHelper";
import ImageButton from "../buttons/ImageButton";
import { useAppSelector } from "../../../store";
import { selectCurrentAccount } from "../../../slices/accounts/accountsSlice";

const FONT_SIZE = 14;
const HEADING_1_SIZE = 32;
const HEADING_2_SIZE = 26;
const HEADING_3_SIZE = 22;
const HEADING_4_SIZE = 18;

interface MarkdownProps {
  text: string;
  addImages?: boolean;
  truncate?: boolean;
}

const RenderMarkdown = ({
  text,
  addImages = false,
  truncate = false,
}: MarkdownProps) => {
  const currentAccount = useAppSelector(selectCurrentAccount);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onLinkPress = (url): boolean => {
    openLink(url, navigation);
    return false;
  };

  const theme = useTheme();

  const fontColor = truncate
    ? theme.colors.app.secondaryText
    : theme.colors.app.primaryText;

  const styles = {
    span: {
      fontSize: FONT_SIZE,
      color: fontColor,
    },
    inline: {
      fontSize: FONT_SIZE,
      color: fontColor,
    },
    paragraph: {
      fontSize: FONT_SIZE,
      color: fontColor,
    },
    heading1: {
      fontSize: HEADING_1_SIZE,
      fontWeight: "bold",
      color: fontColor,
    },
    heading2: {
      fontSize: HEADING_2_SIZE,
      fontWeight: "bold",
      color: fontColor,
    },
    heading3: {
      fontSize: HEADING_3_SIZE,
      fontWeight: "bold",
      color: fontColor,
    },
    heading4: {
      fontSize: HEADING_4_SIZE,
      fontWeight: "bold",
      color: fontColor,
    },
    blockquote: {
      backgroundColor: theme.colors.app.backgroundTricondary,
      borderRadius: 5,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.orange["500"],
      marginVertical: 10,
    },
    code_inline: {
      fontSize: FONT_SIZE,
      color: fontColor,
      backgroundColor: theme.colors.app.backgroundTricondary,
    },
    code_block: {
      fontSize: FONT_SIZE,
      color: fontColor,
      backgroundColor: theme.colors.app.backgroundTricondary,
      borderRadius: 5,
    },
    pre: {
      fontSize: FONT_SIZE,
      color: fontColor,
      backgroundColor: theme.colors.app.backgroundTricondary,
      borderRadius: 5,
    },
    image: {
      width: 200,
      height: 200,
    },
    link: {
      color: "rgba(0,176,255,0.63)",
      fontSize: FONT_SIZE,
    },
    table: {
      color: fontColor,
      fontSize: FONT_SIZE,
      borderColor: theme.colors.app.tableBorder,
      marginVertical: 10,
    },
    th: {
      borderColor: theme.colors.app.tableBorder,
      padding: 8,
      fontWeight: "bold",
    },
    td: {
      borderColor: theme.colors.app.tableBorder,
      padding: 8,
    },
    tr: {
      borderColor: theme.colors.app.tableBorder,
    },
    list_item: {
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    textgroup: {
      paddingVertical: 1,
    },
    fence: {
      backgroundColor: theme.colors.app.backgroundTricondary,
      borderColor: theme.colors.app.backgroundTricondary,
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    em: {
      fontStyle: "italic",
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    strong: {
      fontWeight: "bold",
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    s: {
      textDecorationLine: "line-through",
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    body: {
      color: fontColor,
      fontSize: FONT_SIZE,
    },
    hr: {
      color: theme.colors.app.backgroundTricondary,
    },
  };

  const markdown = useMemo(() => {
    const cleanedText = findImages(text);
    text = cleanedText.cleanedText.replace(
      /(^|[^[\]])\b(https?:\/\/[^\s]+)\b(?![\]]|\()/g,
      (match, prefix, url) => `${prefix}[${url}](${url})`
    );
    text = replaceNoMarkdown(text, currentAccount.instance);

    return (
      <VStack flex={1}>
        <Markdown
          style={styles}
          onLinkPress={onLinkPress}
          markdownit={MarkdownIt({ typographer: true }).disable(["image"])}
        >
          {text ?? ""}
        </Markdown>
        {addImages && cleanedText && cleanedText.imageLinks.length > 0 && (
          <ImageButton src={cleanedText.imageLinks[0]} />
        )}
      </VStack>
    );
  }, [text]);

  return markdown;
};

export default RenderMarkdown;
