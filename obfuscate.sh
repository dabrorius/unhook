rm -r obfuscate/
cp -r dev/ obfuscate/
node ./node_modules/.bin/javascript-obfuscator obfuscate/onPageLoad.js --output obfuscate/onPageLoad.js --selfDefending true --stringArrayEncoding true
node ./node_modules/.bin/javascript-obfuscator obfuscate/options.js --output obfuscate/options.js --selfDefending true --stringArrayEncoding true
