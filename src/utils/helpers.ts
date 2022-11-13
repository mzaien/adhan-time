import type { Preferences, PrayerType } from "../prayer-types";
import {
  getPreferenceValues,
  openExtensionPreferences,
  showToast,
  Toast,
} from "@raycast/api";
import { useFetch } from "@raycast/utils";

export const fetchPrayerTimes = () => {
  const { country, city, calculation_methods, isHanfi }: Preferences = getPreferenceValues();
  return useFetch<PrayerType>(
    `https://api.aladhan.com/v1/timingsByCity?city=${encodeURI(city)}&country=${encodeURI(country)}&method=${encodeURI(
      calculation_methods
    )}&school=${encodeURI(isHanfi ? "1" : "0")}`,
    {
      keepPreviousData: true,
      onError: (error: Error) => {
        showToast({
          style: Toast.Style.Failure,
          title: `${error} Check your preferences`,
          message: `Country ${country} City ${city}`,
          primaryAction: {
            title: "Change  Preferences",
            onAction: () => openExtensionPreferences(),
          },
        });
      },
    }
  );
};
