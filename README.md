# fastEPDBlacklist

### Used to batch-add to https://github.com/metamask/eth-phishing-detect by automating the update process.

#### Incomplete:

* Create documentation to explain what project does.

* Adjust configuration and error handling.

* Verify that back-to-back uses works correctly.

#### Steps to use:

 - Fork https://github.com/metamask/eth-phishing-detect.

 - Clone this project `git clone https://github.com/hahnmichaelf/fastepdblacklist.git`.

 - Fill out the __configurations.json__ with your the clone url for your fork `https://github.com/yourgithubname/eth-phishing-detect.clone`

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

 - Run ```node start``` to begin

_Author: Michael Hahn - blurpesec_
