import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
  title: string;
  subTitle?: string;

  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={() => router.back()}
    />
  );

  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;

    return (
      <TopNavigationAction
        icon={<MyIcon name={rightActionIcon} />}
        onPress={rightAction}
      />
    );
  };

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment="center"
        accessoryLeft={renderBackAction}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{ height: "100%" }}>{children}</Layout>
    </Layout>
  );
};
