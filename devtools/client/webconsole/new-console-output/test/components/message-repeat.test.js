/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */
"use strict";

const MessageRepeat = require("devtools/client/webconsole/new-console-output/components/message-repeat");

const expect = require("expect");

const {
  renderComponent
} = require("devtools/client/webconsole/new-console-output/test/helpers");

describe("MessageRepeat component:", () => {
  it("renders repeated value correctly", () => {
    const rendered = renderComponent(MessageRepeat, { repeat: 99 });
    expect(rendered.classList.contains("message-repeats")).toBe(true);
    expect(rendered.textContent).toBe("99");
  });

  it("does not render un-repeated value", () => {
    expect(MessageRepeat({ repeat: 1 })).toBe(null);
  });
});
