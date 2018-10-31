// TypeScriptでもdynamic exportができるようになれば、このファイルもtsで書ける
const exportIfNeeded = require("./lib/util/exportIfNeeded").default;

// TODO: Storage トリガーの関数とテスト

exportIfNeeded("helloWorld", exports);
exportIfNeeded("observeCreateUser", exports);
exportIfNeeded("observeScoreUpdate", exports);
