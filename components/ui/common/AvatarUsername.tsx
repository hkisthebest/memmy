import { HStack, Text, useTheme, VStack } from "native-base";
import React from "react";
import FastImage from "react-native-fast-image";
import { IconUser } from "tabler-icons-react-native";
import { getBaseUrl } from "../../../helpers/LinkHelper";
import UserLink from "../buttons/UserLink";

interface AvatarUsernameProps {
  avatar: string;
  username: string;
  fullUsername: string;
  instanceName?: string;
  showInstance?: boolean;
  children?: JSX.Element;
}

function AvatarUsername({
  avatar,
  username,
  fullUsername,
  instanceName,
  showInstance,
  children,
}: AvatarUsernameProps) {
  const { colors } = useTheme();

  return (
    <HStack space={2} alignItems="center">
      {avatar ? (
        <FastImage
          source={{
            uri: avatar,
          }}
          style={{ height: 20, width: 20, borderRadius: 100 }}
        />
      ) : (
        <IconUser color={colors.app.iconColor} />
      )}
      <VStack>
        <UserLink username={username} fullUsername={fullUsername} />
        {showInstance && <Text fontSize="xs">{getBaseUrl(instanceName)}</Text>}
      </VStack>
      {children}
    </HStack>
  );
}

export default AvatarUsername;
