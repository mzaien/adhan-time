import { List, ActionPanel, Action, Icon, openExtensionPreferences } from "@raycast/api";
import type { Prayers } from "./prayer-types";
import { fetchPrayerTimes } from "./utils/helpers";

export default function Command() {
  const { isLoading, data: prayerTimes } = fetchPrayerTimes();
  const prayers: Prayers | undefined = prayerTimes?.data.timings;

  return (
    <List isLoading={isLoading} navigationTitle="Prayer Name" searchBarPlaceholder="Convert decimal to...">
      {prayers &&
        Object.entries(prayers).map(([key, value]) => (
          <List.Item
            key={key}
            title={key}
            subtitle={value}
            icon={Icon.Sun}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard title="Copy to Clipboard" content={`${key} time, ${value}`} />
                <Action
                  shortcut={{ modifiers: ["opt"], key: "," }}
                  onAction={() => openExtensionPreferences()}
                  title="Change Preferences"
                />
              </ActionPanel>
            }
          />
        ))}
    </List>
  );
}
