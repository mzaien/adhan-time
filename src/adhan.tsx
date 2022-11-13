import { MenuBarExtra, Icon, openExtensionPreferences } from "@raycast/api";
import type { Prayers } from "./prayer-types";
import { fetchPrayerTimes } from "./utils/helpers";

export default function Command() {
  const { isLoading, data: prayerTimes } = fetchPrayerTimes();
  const prayers: Prayers | undefined = prayerTimes?.data.timings;

  return (
    <MenuBarExtra icon={Icon.Clock} title="Prayer times" tooltip="Prayer times" isLoading={isLoading}>
      {prayers &&
        Object.entries(prayers).map(([key, value]) => <MenuBarExtra.Item key={key} title={`${key}: ${value}`} />)}
      <MenuBarExtra.Section>
        <MenuBarExtra.Item
          title="Change location Preferences"
          onAction={() => {
            openExtensionPreferences();
          }}
        />
      </MenuBarExtra.Section>
    </MenuBarExtra>
  );
}
