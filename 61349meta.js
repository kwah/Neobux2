// ==UserScript==
// @name           Neobux 2+ (kwah) - reWrite
// @namespace      http://userscripts.org/users/158890
// @homepage       http://kwah.org/

// @description    This script provides detailed statistics for your Neobux account and referrals (eg: ages of referrals, recent income/outcome averages, plus more!)

// @include        http://www.neobux.com/*
// @include        https://www.neobux.com/*
// @exclude        http://www.neobux.com/v/*
// @exclude        https://www.neobux.com/v/*
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba

// @resource       remoteMeta_USO http://userscripts.org/scripts/source/61349.meta.js

// // version = major.minor.date.time // date.time = yymmdd.hhmm (GMT)
// @version        4.1.100908.1254;
// @updateNoteMin  100908.1254 = Problems with myAccountDetails && ACCOUNT_FUNCTIONS  --  not functioning correctly when used with setterGetter_GM_Storage, so defining myAccountDetails.renewalFees outside of the main myAccountDetails declaration.;

// @versionStatus  Developmental (Dev)
// @updateNote     4.1 = Started over to reorganise & structure the script properly;

// // Changelog ::
// @history        4.0.100615.1500 = Start of second refactoring of code to modularise code; Re-licenced to GPL;
// @history        4.0.100626.2110 = Started to create a kind of structure for the script, will start on referral statistics page first;
// @history        4.0.100627.1900 = Started extraction of the data from the graph data into the graphData[graphNumber] variable -- will start using the extracted data next;
// @history        4.0.100702.0816 = Added yellow bar under graphs - averages deisplayed in this bar not yet working properly;
// @history        4.0.100703.2035 = Reduced the amount of redundant code though not yet done completely (duplicate code across stats page and account summary to analyse graph data and show bars under graphs); Calculation of averages and sums now working; Toying with styling of the bars - applies only to stats page currently;
// @history        4.0.100708.1315 = ;
// @history        4.0.100710.0830 = Heavily reduced the amount of code by modularising the code into more specific functions; Statistics sidebar now pretty much working though multi-lingual support (temporarily) removed and a few NaN errors to fix.. needs more thorough testing;
// @history        4.0.100711.1115 = Split up the actions in the ref stats page some more and made the graph data available to all functions in run on that page by defining the variables outside of where they are defined; Ref stats page now mostly finished - TODO: add export tabs, clean up sidebar data labels, clean up how the sidebar is generated;
// @history        4.0.100711.1230 = As standard member, rented referral listings page working pretty much perfectly (i think) though zero code simplifications have been made and I am pretty much certain that script does not yet work for ultimates (not yet sorted out the function to read the minigraph data);
// @history        4.0.100713.0845 = w00t all nighter... A lot of code changes / refactoring etc.. Rented referral listings page now extracts the data from mtx not the table and is somewhat testing okay for all member types though not sure if the ultimate clicks/day, a10, 17 and rsa columns are working properly though -- needs more testing; not sure if the script will read the minigraphs properly; Added sort asc/desc buttons for all columns (working okay when you select a sorting direction though doesn't indicate what sorting is being applied if you load the ref listing via the menu/top bar);
// @history        4.0.100813.0300 = Fixed a couple bugs in sidebar calculations; Massively improved code re-use in processGraphs(); Moved some functions around that were out of structure somewhat; Moved statically set 'recent' timeframe to a preference; TODO: cleanup the preferences, figure out why manipulatePrefs() doesn't seem to be cacheing the vars to about:config;
// @history        4.0.100819.1615 = In middle of *MAJOR* edits - HUGE number of changes big & small (using "JetBrains WebStorm" code editor -- awesome!); Settings editor (probably) working; Fixed a number of aesthetic issues (jaunted columns/'congratulations message overflowing to right etc); Fixed issue with manipulatePrefs() (was checking for existance of pref using the default value); Added donate button to stats sidebar; Fixed & improved aspects of detcecting # of refs (will now correctly identify zero refs); Fixed positioning of bigred arrow; Added placeholder for the local/server time (TODO: make it show actual times);
// @history        4.0.100820.0230 = Added profit graph to Stats page;
// @history        4.0.100822.2250 = The code is a bit of a hack-together after quick mashups of code; Added storage of the graph data from the personal clicks graph and ref stats page and added info to stats sidebar; Uploaded code to userscript.org;
// @history        4.0.100822.2330 = Added ads page to @includes; Uploaded code to userscript.org;
// @history        4.0.100823.0020 = Fixed a few 'first run' issues; Uploaded code to userscript.org;
// @history        4.0.100823.0100 = Attempt at fixing the account type detection code. Need samples of pages however to understand how it is displayed on other account types; Uploaded code to userscript.org;
// @history        4.0.100823.0155 = Fixed mismatch in code relating to variable names and showing columns etc - LARGE problem with settings editor not being able to handle many settings stored as a stringified object; Uploaded code to userscript.org;
// @history        4.0.100823.0215 = Fixed clicks/day column to show the clicks in the correct order now; Edited @include and @exclude rules to allow the local/server time to show in forums pages; Uploaded code to userscript.org;
// @history        4.0.100823.1400 = Fixed Error: today.projectedDirectIncome is undefined - Line: 2627;
// @history        4.0.100823.1500 = Fixed tooltip over profit column to 'working' but TODO: needs updating; Uploaded code to userscript.org;
// @history        4.0.100825.0300 = Started over to reorganise & structure the script properly;
// @history        4.0.100826.0235 = **AWESOME** progress - accSummary and refStats pages functioning pretty much perfectly, rentedRefListing is somewhat sorted out;
// @history        4.0.100826.1625 = accSummary, rentedRefListings and refStats pages working great; Not done yet: 'income' / 'net' values do not yet take the personal clicks into account, the export tabs won't show, local/server time and settings editor not added yet;
// @history        4.1.100827.0840 = whole bunch of stuff, don't remember.. ; Added instructions that load up on the first run / checks on following runs that inform the user that they need to run the script on a few pages to collect info before the script will function correctly;
// @history        4.1.100829.2330 = Fixed widenPage() to take into account the added items within existing columns - the rented referral listings page should now work correctly;
// @history        4.1.100829.2345 = Fixed error in grabbing cost to renew for 15 days instead of the recycle cost;
// @history        4.1.100830.2045 = Gotten the new settings editor to handle storing the values as objects - need to 'fill it out' now for it to edit other prefs too;
// @history        4.1.100830.2355 = Settings editor can now handle non-object variables too now; Setup the option for accordion-style menus to save space;
// @history        4.1.100831.1325 = Temporary fix for totalClickAverage counting new refs (<24hrs old) as having an average of 999 but earlier in the script it doesn't;
// @history        4.1.100901.1445 = Added the personal click income into the 'income' section of the stats sidebar; Fixed a few issues with the ordering of data causing the stats sidebar to show it in reverse; Fixed a few typos in variable names; Fixed a few issues with the raverage; Uploaded to userscripts.org;
// @history        4.1.100903.0245 = Redesigned definition of myAccountDetails and script.preferences; Made the column indexes not specific to the rented ref page (should now run okay on the direct refs page though likely to be NaN errors or similar); Changed the stats code to not calculate the sum based on the mean * time period (errors with lack of accuracy in the mean causing the sum to be wrong by (1 - 0.999...) ; Fixed the dates in the generated profit graph to not be hard-coded as July 2010 (now generated dynamically);
// @history        4.1.100903.0525 = Fixed many of the direct referral page issues - the direct refs page should now function well;
// @history        4.1.100903.1150 = Fixed the balance transfer to correctly identify and alert when a successful transfer occurs when the Portuguese language is being used;
// @history        4.1.100903.1900 = Major overhaul of the data structure to bring all the graph info into the _graphs object; Added the 'sum's to the graph databars; Redesigned code to allow easy switching of the order of the timeperiods;
// @history        4.1.100903.2100 = Added local/server time code (copy paste from previous versions);
// @history        4.1.100904.0145 = Many changes / fixes as outlined here < http://www.neobux.com/forum/?frmid=7&tpcid=141956&msgid=1583085#m1583085 >; Uploaded to userscripts.org;
// @history        4.1.100904.1650 = Updated the preference editing code to be more resilient against storing objects; Updated some of the server time code;
// @history        4.1.100905.0150 = Added auto-update code; Uploaded to userscripts.org;
// @history        4.1.100907.1915 = Added Object.prototype.append();
// @history        4.1.100908.0230 = Gotten setterGetter_GM_Storage() to a workable state, where the script will save the default prefs recursively okay, but setters/getters do not allow setting/getting non-top-level variables in the object: columnPrefix and shownColumn are set as String || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.columnPrefix && Boolean || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.showColumn;
// @history        4.1.100908.1254 = Problems with myAccountDetails && ACCOUNT_FUNCTIONS  --  not functioning correctly when used with setterGetter_GM_Storage, so defining myAccountDetails.renewalFees outside of the main myAccountDetails declaration.;


// @uso:script      61349
// @uso:version     249811
// @uso:timestamp   Wed, 08 Sep 2010 12:11:54 +0000
// @uso:installs    25856
// @uso:reviews     2
// @uso:rating      5.00
// @uso:discussions 4
// @uso:fans        25
// @uso:hash        a15340ceaf624ec1e2617174c820653284201a6d
// ==/UserScript==
