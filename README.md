# Chrome-Read-With-A-Pinch-Of-Salt
**Everything someone tells you online requires a pinch of salt and as we know too much salt is bad for your long term health.** This Chrome extension tries to give you a sense of just how much salt is required to swallow the content pumped out by a domain. It checks for dubious news/information sources using the [Unreliable News Sources list](https://docs.google.com/spreadsheets/d/1ck1_FZC-97uDLIlvRJDTrGqBk0FuDe9yHkluROgpGS8/) which combines the lists from FactCheck.org, Fake News Codex, MetaCert Protocol, OpenSources, PolitiFact, Snopes, Southern Poverty Law Center. Poynter published this resource but then pulled the article to do a little more verification of the results (basically some of the domains didn't like that they were on it). However as I'm not blocking anything based on it and leaving things up to the reader it's still a good source (for now).


## What is does
First off, it checks the webpage's top level domain to see if it's on the list. If it is, it displays a warning. The warning has 3 levels based on how many sources it appears on.

Flagged on 3 or more sources (steer clear of this), 2 sources (not very healthy), 1 source (be skeptical) and so not to be completely humourless there's a special for sites flagged as 'satire':

<img src="Screenshot_3sources.png" width="600">
<img src="Screenshot_2sources.png" width="600">
<img src="Screenshot_1source.png" width="600">

<img src="Screenshot_satire.png" width="600">



If the page domain is not on the list it will then check the links on the page. If any of those link to a domain on the list it will offer a warning and highlight the links so you can avoid them. Or at least be prepared for when you visit them.

<img src="Screenshot_linkwarning.png" width="600">
<img src="Screenshot%20links.png" width="600">

## Installation
If you want to grab it and try it out from here, you'll need to turn on 'developer mode' on the extensions tab in Chrome, then  'load unpackacked' and find the downloaded/unzipped folder 'readwithapinchofsalt'. It will add a little icon to the browser, but if enabled it will automatically run on all sites (I'll add options around this later). 
Eventually this will go up on Chrome-extensions for easy install. But for now:

**[Grab the zip](https://github.com/murraygm/Chrome-Read-With-A-Pinch-Of-Salt/raw/master/readwithapinchofsaltv05.zip)**

## about the data
The data was pulled from [Unreliable News Sources list](https://docs.google.com/spreadsheets/d/1ck1_FZC-97uDLIlvRJDTrGqBk0FuDe9yHkluROgpGS8/) on 2019/05/02 and turned into JSON - it's in the 'fcnlist.js' file.
Poynter pulled the article explaining the list and the methodology for what was tagged 'fake' etc, and said this https://www.poynter.org/letter-from-the-editor/2019/letter-from-the-editor/
However, the list seems pretty good, personally I'd have added foxnews.com to it but hey, that's just me.

I'm planning to add a 'whitelist' option and perhaps an 'add this site' option too.

