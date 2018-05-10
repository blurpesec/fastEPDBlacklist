# fastEPDBlacklist

### Used to batch-add to https://github.com/metamask/eth-phishing-detect by automating the update process.

#### Requires:
 - `Node.JS` (built with v8.9.4)
 - `npm` (built with v5.6.0)

#### Steps to use:

 - Fork: https://github.com/metamask/eth-phishing-detect.

 - Clone this project with: `git clone https://github.com/hahnmichaelf/fastepdblacklist.git`.

 - Fill out the __configurations.json__ with your the clone url for your fork _https://github.com/yourgithubname/eth-phishing-detect.git_

 - Add phishing domains to the __newBlacklistItems.txt__ file.

 Handles `https://`,`http://`,`www.`, and `[.]`.
 Example:
```
http://myeterwallct-p[.]com
https://www.myethcrwallct-a.com
myethcrwallet-c.com
http://myethcrwallet-d[.]com
www.myethervvallet.win
myetherwallat[.]date
myetherwallet[.]accountant
```
 - `cd` to `fastEPDBlacklist`

 - Run `npm install` to build and then `node start` to begin

 #### Incomplete:

 * Create documentation to explain what project does.

 * Adjust configuration and error handling.

 * Verify that back-to-back uses works correctly.

_Author: Michael Hahn - blurpesec_
