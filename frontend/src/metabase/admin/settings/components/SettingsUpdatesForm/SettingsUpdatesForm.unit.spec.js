import React from "react";
import { render as renderRTL, screen } from "@testing-library/react";

import MetabaseSettings from "metabase/lib/settings";
import SettingsUpdatesForm from "./SettingsUpdatesForm";

const elements = [
  {
    key: "key",
    widget: "widget",
  },
];

const render = () => {
  renderRTL(<SettingsUpdatesForm elements={elements} />);
};

describe("SettingsUpdatesForm", () => {
  it("shows custom message for Cloud installations", () => {
    const isHostedSpy = jest.spyOn(MetabaseSettings, "isHosted");
    isHostedSpy.mockImplementation(() => true);

    render();
    screen.getByText(/Metabase Cloud keeps your instance up-to-date/);

    isHostedSpy.mockRestore();
  });

  it("shows correct message when latest version is installed", () => {
    const versionIsLatestSpy = jest.spyOn(MetabaseSettings, "versionIsLatest");
    versionIsLatestSpy.mockImplementation(() => true);

    render();
    screen.getByText(/which is the latest and greatest/);

    versionIsLatestSpy.mockRestore();
  });

  it("shows correct message when no version checks have been run", () => {
    render();
    screen.getByText("No successful checks yet.");
  });



});
