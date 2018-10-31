// TypeScriptでもdynamic exportができるようになれば、このファイルもtsで書ける
const exportIfNeeded = require("./lib/util/exportIfNeeded").default;

exportIfNeeded("helloWorld", exports);
exportIfNeeded("observeCreateUser", exports);
exportIfNeeded("observeScoreUpdate", exports);
exportIfNeeded("observeProfilePhotoUpdate", exports);
