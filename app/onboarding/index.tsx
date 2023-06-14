import React from "react";
import {StyleSheet} from "react-native";
import {Button, HStack, Text, useTheme, VStack} from "native-base";
import {useRouter} from "expo-router";
import FastImage from "react-native-fast-image";

const OnboardingScreen = () => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <VStack flex={1} backgroundColor={theme.colors.screen[800]} justifyContent={"center"} alignItems={"center"} space={"md"} px={5}>
            <Text fontSize={32}>
                Welcome to Lemmy!
            </Text>
            <FastImage
                source={require("../../assets/splash.png")}
                style={styles.image}
            />
            <Text fontSize={18} textAlign={"center"}>
                New to Lemmy? We&apos;ll help you find an instance and create an account.
            </Text>
            <HStack space={"md"}>
                <Button onPress={() => router.push("/onboarding/addAccount")}>
                    I Already Have an Account
                </Button>
                <Button onPress={() => router.push("/onboarding/createAccount")}>
                    Get Started
                </Button>
            </HStack>

        </VStack>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 200,
        aspectRatio: 1
    }
});

export default OnboardingScreen;