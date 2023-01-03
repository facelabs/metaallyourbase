import React from "react";
import {
  renderWithProviders,
  screen,
  waitForElementToBeRemoved,
} from "__support__/ui";
import admin from "metabase/admin/admin";
import MetabaseSettings from "metabase/lib/settings";
import DatabaseEditApp from "./DatabaseEditApp";

const ENGINES_MOCK = {
  h2: {
    "details-fields": [
      { "display-name": "Connection String", name: "db", required: true },
      { name: "advanced-options", type: "section", default: true },
    ],
    "driver-name": "H2",
    "superseded-by": null,
  },
  sqlite: {
    "details-fields": [
      { "display-name": "Filename", name: "db", required: true },
      { name: "advanced-options", type: "section", default: true },
    ],
    "driver-name": "SQLite",
    "superseded-by": null,
  },
};

const ComponentMock = () => <div />;
jest.mock(
  "metabase/databases/containers/DatabaseHelpCard",
  () => ComponentMock,
);

function mockSettings({ cachingEnabled = false }) {
  const original = MetabaseSettings.get.bind(MetabaseSettings);
  const spy = jest.spyOn(MetabaseSettings, "get");
  spy.mockImplementation(key => {
    if (key === "engines") {
      return ENGINES_MOCK;
    }
    if (key === "enable-query-caching") {
      return cachingEnabled;
    }
    if (key === "site-url") {
      return "http://localhost:3333";
    }
    if (key === "application-name") {
      return "Metabase Test";
    }
    if (key === "is-hosted?") {
      return false;
    }
    if (key === "cloud-gateway-ips") {
      return [];
    }
    return original(key);
  });
}

async function setup({ cachingEnabled = false } = {}) {
  mockSettings({ cachingEnabled });

  const settingsReducer = () => ({
    values: {
      engines: ENGINES_MOCK,
      "enable-query-caching": cachingEnabled,
      "persisted-models-enabled": false,
    },
  });

  renderWithProviders(<DatabaseEditApp />, {
    withRouter: true,
    reducers: { admin, settings: settingsReducer },
  });

  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
}

describe("DatabaseEditApp", () => {
  describe("Cache TTL field", () => {
    describe("OSS", () => {
      it("is invisible", async () => {
        await setup({ cachingEnabled: true });

        expect(
          screen.queryByText("Default result cache duration"),
        ).not.toBeInTheDocument();
      });
    });


  });
});
