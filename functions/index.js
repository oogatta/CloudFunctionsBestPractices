// TypeScriptでもdynamic exportができるようになれば、このファイルもtsで書ける
const exportIfNeeded = require("./lib/util/exportIfNeeded").default;

// TODO: Realtime Database トリガーの関数とテスト
// TODO: Firestore トリガーのテスト
// TODO: Storage トリガーの関数とテスト

exportIfNeeded("helloWorld", exports);
exportIfNeeded("observeCreateUser", exports);
