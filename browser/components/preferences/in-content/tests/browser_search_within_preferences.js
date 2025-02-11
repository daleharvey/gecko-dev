/*
* This file contains tests for the Preferences search bar.
*/

/**
 * Tests to see if search bar is being hidden when pref is turned off
 */
add_task(function*() {
  yield SpecialPowers.pushPrefEnv({"set": [["browser.preferences.search", false]]});
  yield openPreferencesViaOpenPreferencesAPI("paneGeneral", {leaveOpen: true});
  let searchInput = gBrowser.contentDocument.querySelectorAll("#searchInput");
  is(searchInput.length, 1, "There should only be one element name searchInput querySelectorAll");
  is_element_hidden(searchInput[0], "Search box should be hidden");
  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
  yield SpecialPowers.popPrefEnv();
});

// Enabling Searching functionatily. Will display search bar form this testcase forward.
add_task(function*() {
  yield SpecialPowers.pushPrefEnv({"set": [["browser.preferences.search", true]]});
});

/**
 * Tests to see if search bar is being shown when pref is turned on
 */
add_task(function*() {
  yield openPreferencesViaOpenPreferencesAPI("paneGeneral", {leaveOpen: true});
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  is_element_visible(searchInput, "Search box should be shown");
  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});

/**
 * Test for "Search Result" panel.
 * After it runs a search, it tests if the "Search Results" panel is the only selected category.
 * The search is then cleared, it then tests if the "General" panel is the only selected category.
 */
add_task(function*() {
  yield openPreferencesViaOpenPreferencesAPI("paneGeneral", {leaveOpen: true});

  // Performs search
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  searchInput.doCommand()
  searchInput.value = "password";
  searchInput.doCommand()

  let categoriesList = gBrowser.contentDocument.getElementById("categories");

  for (let i = 0; i < categoriesList.childElementCount; i++) {
    let child = categoriesList.children[i]
    if (child.id == "category-search-results") {
      is(child.selected, true, "Search results panel should be selected");
    } else if (child.id) {
      is(child.selected, false, "No other panel should be selected");
    }
  }
  // Takes search off
  searchInput.value = "";
  searchInput.doCommand()

  // Checks if back to generalPane
  for (let i = 0; i < categoriesList.childElementCount; i++) {
    let child = categoriesList.children[i]
    if (child.id == "category-general") {
      is(child.selected, true, "General panel should be selected");
    } else if (child.id) {
      is(child.selected, false, "No other panel should be selected");
    }
  }

  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});

/**
 * Test for "password" case. When we search "password", it should show the "passwordGroup"
 */
add_task(function*() {
  yield openPreferencesViaOpenPreferencesAPI("paneGeneral", {leaveOpen: true});

  // Performs search
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  searchInput.doCommand()
  searchInput.value = "password";
  searchInput.doCommand()

  let mainPrefTag = gBrowser.contentDocument.getElementById("mainPrefPane");

  for (let i = 0; i < mainPrefTag.childElementCount; i++) {
    let child = mainPrefTag.children[i]
    if (child.id == "passwordsGroup" || child.id == "weavePrefsDeck" || child.id == "header-searchResults") {
      is_element_visible(child, "Should be in search results");
    } else if (child.id) {
      is_element_hidden(child, "Should not be in search results");
    }
  }

  // Takes search off
  searchInput.value = "";
  searchInput.doCommand()

  // Checks if back to generalPane
  for (let i = 0; i < mainPrefTag.childElementCount; i++) {
    let child = mainPrefTag.children[i]
    if (child.id == "startupGroup"
    || child.id == "defaultEngineGroup"
    || child.id == "oneClickSearchProvidersGroup"
    || child.id == "paneGeneral"
    || child.id == "accessibilityGroup"
    || child.id == "languagesGroup"
    || child.id == "fontsGroup"
    || child.id == "browsingGroup"
    || child.id == "performanceGroup"
    || child.id == "header-general") {
      is_element_visible(child, "Should be in general tab");
    } else if (child.id) {
      is_element_hidden(child, "Should not be in general tab");
    }
  }

  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});

/**
 * Test for if nothing is found
 */
add_task(function*() {
  yield openPreferencesViaOpenPreferencesAPI("paneGeneral", {leaveOpen: true});

  let noResultsEl = gBrowser.contentDocument.querySelector(".no-results-message");

  is_element_hidden(noResultsEl, "Should not be in search results yet");

  // Performs search
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  searchInput.doCommand()
  searchInput.value = "coach";
  searchInput.doCommand()

  is_element_visible(noResultsEl, "Should be in search results");

  // Takes search off
  searchInput.value = "";
  searchInput.doCommand()

  is_element_hidden(noResultsEl, "Should not be in search results");

  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});

/**
 * Test for if we go back to general tab after search case
 */
add_task(function*() {
  yield openPreferencesViaOpenPreferencesAPI("privacy", {leaveOpen: true});
  let generalPane = gBrowser.contentDocument.getElementById("header-general");

  is_element_hidden(generalPane, "Should not be in general");

  // Performs search
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  searchInput.doCommand()
  searchInput.value = "password";
  searchInput.doCommand()

  // Takes search off
  searchInput.value = "";
  searchInput.doCommand()

  // Checks if back to normal
  is_element_visible(generalPane, "Should be in generalPane");

  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});

/**
 * Test for "Site Data" case, verifying elements with data-hidden-from-search = true
 * are hidden in search result.
 */
add_task(function*() {
  yield SpecialPowers.pushPrefEnv({"set": [["browser.storageManager.enabled", false]]});
  yield openPreferencesViaOpenPreferencesAPI("privacy", {leaveOpen: true});
  let generalPane = gBrowser.contentDocument.getElementById("header-general");

  is_element_hidden(generalPane, "Should not be in general");

  // Performs search
  let searchInput = gBrowser.contentDocument.getElementById("searchInput");
  searchInput.doCommand()
  searchInput.value = "site data";
  searchInput.doCommand()

  let mainPrefTag = gBrowser.contentDocument.getElementById("mainPrefPane");

  let child = mainPrefTag.querySelector("#siteDataGroup");
  is_element_hidden(child, "Should be hidden in search results");

  // Takes search off
  searchInput.value = "";
  searchInput.doCommand()

  // Checks if back to normal
  is_element_visible(generalPane, "Should be in generalPane");

  yield BrowserTestUtils.removeTab(gBrowser.selectedTab);
});
